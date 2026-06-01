"use client";

import { useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

export default function SimpleInterestPage() {
  const [p, setP] = useState(10000);
  const [r, setR] = useState(5);
  const [t, setT] = useState(1);

  const si = (p * r * t) / 100;
  const total = p + si;

  return (
    <CalculatorShell title="Simple Interest Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Principal (₹)</span>
            <input
              type="number"
              value={p}
              onChange={(e) => setP(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Principal"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Rate (%)</span>
            <input
              type="number"
              value={r}
              onChange={(e) => setR(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 8)"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Time (Years)</span>
            <input
              type="number"
              value={t}
              onChange={(e) => setT(+e.target.value)}
              className="w-full calc-input"
              placeholder="Time (years)"
            />
          </label>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Summary</p>
          <div className="mt-4 space-y-3 text-sm text-slate-900 dark:text-white">
            <div className="flex items-center justify-between rounded-3xl bg-white/90 p-4 dark:bg-white/5">
              <span>Interest</span>
              <span className="font-semibold">₹ {si.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-white/90 p-4 dark:bg-white/5">
              <span>Total Amount (₹)</span>
              <span className="font-semibold">₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}