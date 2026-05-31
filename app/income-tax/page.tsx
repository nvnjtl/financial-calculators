"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

const taxSlabs = {
  new: [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
  old: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
};

const formatCurrency = (value: number) =>
  `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(900000);
  const [regime, setRegime] = useState<"new" | "old">("new");

  const { taxableIncome, taxPayable, effectiveRate } = useMemo(() => {
    const deduction = regime === "old" ? 50000 : 0;
    const taxable = Math.max(0, income - deduction);
    const slabs = taxSlabs[regime];
    let remaining = taxable;
    let tax = 0;
    let previousLimit = 0;

    for (const slab of slabs) {
      const slabAmount = Math.min(remaining, slab.limit - previousLimit);
      if (slabAmount <= 0) break;
      tax += slabAmount * slab.rate;
      remaining -= slabAmount;
      previousLimit = slab.limit;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    return {
      taxableIncome: taxable,
      taxPayable: Number(totalTax.toFixed(0)),
      effectiveRate: Number(((totalTax / income) * 100).toFixed(2)),
    };
  }, [income, regime]);

  return (
    <CalculatorShell title="Income Tax Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Annual Income</span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Income"
            />
          </label>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-3 text-sm text-zinc-500">Tax Regime</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRegime("new")}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  regime === "new"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                New Regime
              </button>
              <button
                type="button"
                onClick={() => setRegime("old")}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  regime === "old"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Old Regime
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Taxable Income</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(taxableIncome)}</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Total Tax Payable</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">{formatCurrency(taxPayable)}</p>
          </div>
          <div className="rounded-3xl border border-rose-200 bg-rose-500/10 p-5 shadow-sm dark:border-rose-500/20 dark:bg-rose-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-700">Effective Rate</p>
            <p className="mt-3 text-2xl font-semibold text-rose-700 dark:text-rose-200">{effectiveRate}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        <p className="font-medium text-zinc-900 dark:text-white">How this works</p>
        <p className="mt-3 leading-7">
          {regime === "new"
            ? "The new tax regime uses simplified slab rates without most exemptions. No standard deduction is applied."
            : "The old tax regime applies a ₹50,000 standard deduction and uses wider slabs with tax benefits for lower incomes."}
        </p>
      </div>
    </CalculatorShell>
  );
}
