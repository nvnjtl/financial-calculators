"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

const rates = [3, 5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { gstAmount, total, baseAmount } = useMemo(() => {
    const gstAmount = mode === "add"
      ? amount * rate / 100
      : amount * rate / (100 + rate);

    const baseAmount = mode === "add"
      ? amount
      : amount - gstAmount;

    const total = mode === "add"
      ? amount + gstAmount
      : amount;

    return {
      gstAmount,
      total,
      baseAmount,
    };
  }, [amount, rate, mode]);

  const formatCurrency = (value: number) =>
    `₹ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <CalculatorShell title="GST Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "add"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Add GST
            </button>
            <button
              type="button"
              onClick={() => setMode("remove")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "remove"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Remove GST
            </button>
          </div>

          <div className="calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              {mode === "add" ? "Base Amount" : "Total Amount"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              placeholder={mode === "add" ? "Base Amount" : "Total Amount"}
            />
          </div>

          <div className="calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              GST Rate
            </label>
            <select
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {rates.map((value) => (
                <option key={value} value={value}>
                  {value}%
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4 calc-accent-card">
          <p className="text-sm uppercase tracking-[0.25em] text-teal-300">Summary</p>
          <div className="space-y-3 text-sm font-medium">
            <div className="flex items-center justify-between rounded-2xl bg-white/80 p-4 dark:bg-white/5">
              <span>GST Amount</span>
              <span className="font-semibold">{formatCurrency(gstAmount)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/80 p-4 dark:bg-white/5">
              <span>Base Amount (₹)</span>
              <span className="font-semibold">{formatCurrency(baseAmount)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-teal-600 p-4 text-white shadow-lg shadow-teal-500/20">
              <span>Total Amount (₹)</span>
              <span className="font-semibold">{formatCurrency(total)}</span>
            </div>
          </div>
          <p className="text-sm text-teal-100/80">
            Use this tool to quickly add or remove GST from any invoice amount.
          </p>
        </div>
      </div>
    </CalculatorShell>
  );
}
