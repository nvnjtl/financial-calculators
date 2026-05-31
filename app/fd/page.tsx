"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

const frequencies = [
  { label: "Annually", value: "annually", periods: 1 },
  { label: "Half-yearly", value: "half-yearly", periods: 2 },
  { label: "Quarterly", value: "quarterly", periods: 4 },
  { label: "Monthly", value: "monthly", periods: 12 },
];

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState("annually");

  const selectedFrequency = frequencies.find((item) => item.value === frequency) ?? frequencies[0];

  const { maturityValue, interestEarned } = useMemo(() => {
    const periods = selectedFrequency.periods;
    const monthlyRate = rate / 100 / periods;
    const totalPeriods = periods * years;
    const compoundAmount = principal * Math.pow(1 + monthlyRate, totalPeriods);

    return {
      maturityValue: compoundAmount,
      interestEarned: compoundAmount - principal,
    };
  }, [principal, rate, years, selectedFrequency]);

  const formatCurrency = (value: number) =>
    `₹ ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <CalculatorShell title="FD Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Deposit Amount</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Deposit Amount"
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
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Compounding</span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
            >
              {frequencies.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Deposit</p>
            <p className="mt-3 text-3xl font-semibold text-white dark:text-white">{formatCurrency(principal)}</p>
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
