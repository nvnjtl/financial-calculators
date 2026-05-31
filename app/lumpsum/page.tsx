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

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1);

  const frequencyOptions = [
    { label: "Annual", value: 1 },
    { label: "Semi-Annual", value: 2 },
    { label: "Quarterly", value: 4 },
    { label: "Monthly", value: 12 },
  ];

  const { maturityValue, interestEarned, chartData } = useMemo(() => {
    const r = rate / 100;
    const n = frequency;
    const totalPeriods = years * n;
    const compoundRate = 1 + r / n;
    const futureValue = principal * Math.pow(compoundRate, totalPeriods);
    const interest = futureValue - principal;

    const data = Array.from({ length: years + 1 }, (_, index) => {
      const year = index;
      const amount = year === 0 ? principal : principal * Math.pow(compoundRate, year * n);
      return { year, amount: Number(amount.toFixed(2)) };
    });

    return {
      maturityValue: Number(futureValue.toFixed(2)),
      interestEarned: Number(interest.toFixed(2)),
      chartData: data,
    };
  }, [principal, rate, years, frequency]);

  const formatCurrency = (value: number) =>
    `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <CalculatorShell title="Lumpsum Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Investment Amount</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Amount"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Annual Return</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Rate %"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Duration</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Years"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Compounding</span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Invested</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(principal)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Interest Earned</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(interestEarned)}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Maturity Value</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-700 dark:text-emerald-200">{formatCurrency(maturityValue)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Value growth over time</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(Number(value) / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
