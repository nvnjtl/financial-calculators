"use client";

import { useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  let balance = 0;
  const data = [];

  for (let i = 1; i <= months; i++) {
    balance = (balance + monthly) * (1 + monthlyRate);

    if (i % 12 === 0) {
      data.push({
        year: i / 12,
        value: Math.round(balance),
      });
    }
  }

  const totalInvested = monthly * months;
  const futureValue = balance;
  const wealthGained = futureValue - totalInvested;

  return (
    <CalculatorShell title="SIP Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mb-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-sm text-zinc-500">Monthly SIP</span>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(+e.target.value)}
                className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                placeholder="Monthly Investment"
              />
            </label>
            <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-sm text-zinc-500">Expected Return</span>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                placeholder="Expected Return %"
              />
            </label>
            <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-sm text-zinc-500">Investment Duration</span>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(+e.target.value)}
                className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                placeholder="Years"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Invested</p>
            <p className="mt-3 text-3xl font-semibold text-white dark:text-white">₹ {totalInvested.toFixed(0)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Wealth Gained</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">₹ {wealthGained.toFixed(0)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Maturity Value</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-700 dark:text-emerald-200">₹ {futureValue.toFixed(0)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">SIP growth over time</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹ ${Number(value).toLocaleString()}`} />
              <Tooltip formatter={(value) => `₹ ${Number(value).toLocaleString()}`} />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}