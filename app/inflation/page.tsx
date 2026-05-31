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

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(1000000);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);

  const { futureValue, presentValue, chartData } = useMemo(() => {
    const rate = inflationRate / 100;
    const future = currentAmount * Math.pow(1 + rate, years);
    const present = currentAmount / Math.pow(1 + rate, years);
    const data = Array.from({ length: years + 1 }, (_, index) => {
      const amount = currentAmount / Math.pow(1 + rate, index);
      return {
        year: index,
        amount: Number(amount.toFixed(0)),
      };
    });
    return {
      futureValue: Number(future.toFixed(0)),
      presentValue: Number(present.toFixed(0)),
      chartData: data,
    };
  }, [currentAmount, inflationRate, years]);

  return (
    <CalculatorShell title="Inflation Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Current Value</span>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Current Value"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Inflation Rate</span>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Inflation Rate %"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Years</span>
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
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Future Value</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{formatCurrency(futureValue)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Inflation-adjusted Value</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(presentValue)}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-500/10 p-5 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">Purchasing Power</p>
            <p className="mt-3 text-2xl font-semibold text-amber-700 dark:text-amber-200">{((presentValue / currentAmount) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Value erosion over time</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="amount" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
