"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

export default function RDCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

  const { maturityValue, totalInvested, interestEarned } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    if (monthlyRate === 0) {
      const invested = monthly * months;
      return {
        totalInvested: invested,
        maturityValue: invested,
        interestEarned: 0,
      };
    }

    const futureValue =
      monthly *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const invested = monthly * months;

    return {
      totalInvested: invested,
      maturityValue: futureValue,
      interestEarned: futureValue - invested,
    };
  }, [monthly, rate, years]);

  const formatCurrency = (value: number) =>
    `₹ ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <CalculatorShell title="RD Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Monthly Deposit</span>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Monthly Deposit"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Annual Rate</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Annual Interest Rate %"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Duration</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Duration (Years)"
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Invested</p>
            <p className="mt-3 text-3xl font-semibold text-white dark:text-white">{formatCurrency(totalInvested)}</p>
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
    </CalculatorShell>
  );
}
