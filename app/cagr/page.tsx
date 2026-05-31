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

export default function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState(10000);
  const [finalValue, setFinalValue] = useState(25000);
  const [years, setYears] = useState(5);

  const { cagr, totalReturn, chartData } = useMemo(() => {
    const growth = initialValue > 0 && years > 0 ? finalValue / initialValue : 0;
    const cagrValue = years > 0 && growth > 0 ? Math.pow(growth, 1 / years) - 1 : 0;
    const totalReturnValue = initialValue > 0 ? growth - 1 : 0;

    const data = Array.from({ length: years + 1 }, (_, index) => {
      const year = index;
      const value = year === 0 ? initialValue : initialValue * Math.pow(1 + cagrValue, year);
      return { year, value: Number(value.toFixed(0)) };
    });

    return {
      cagr: Number((cagrValue * 100).toFixed(2)),
      totalReturn: Number((totalReturnValue * 100).toFixed(2)),
      chartData: data,
    };
  }, [initialValue, finalValue, years]);

  return (
    <CalculatorShell title="CAGR Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Initial Value</span>
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Initial Value"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Final Value</span>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Final Value"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Time Period</span>
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
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">CAGR</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{cagr}%</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Return</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">{totalReturn}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">Growth projection</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
