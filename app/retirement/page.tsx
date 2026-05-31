"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CalculatorShell from "@/app/components/calculatorshell";

const formatCurrency = (value: number) =>
  `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default function RetirementCalculator() {
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(15000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(15);

  const { corpus, contributions, chartData } = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const periods = years * 12;

    const savingsFuture = currentSavings * Math.pow(1 + monthlyRate, periods);
    const contributionFuture =
      monthlyRate === 0
        ? monthlyContribution * periods
        : monthlyContribution * (Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate;

    const data = Array.from({ length: years + 1 }, (_, index) => {
      const months = index * 12;
      const savingsValue = currentSavings * Math.pow(1 + monthlyRate, months);
      const contributionValue =
        monthlyRate === 0
          ? monthlyContribution * months
          : monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      return {
        year: index,
        amount: Number((savingsValue + contributionValue).toFixed(0)),
      };
    });

    return {
      corpus: Number((savingsFuture + contributionFuture).toFixed(0)),
      contributions: Number((monthlyContribution * periods).toFixed(0)),
      chartData: data,
    };
  }, [currentSavings, monthlyContribution, rate, years]);

  return (
    <CalculatorShell title="Retirement Corpus Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Current Savings</span>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Current Savings"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Monthly Contribution</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Monthly Contribution"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Expected Return</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Annual Return %"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Years to Retirement</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Years"
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Estimated Corpus</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(corpus)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Contributions</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(contributions)}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Years to Target</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-700 dark:text-emerald-200">{years} years</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Corpus growth projection</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
