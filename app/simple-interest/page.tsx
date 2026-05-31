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
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Principal</span>
            <input
              type="number"
              value={p}
              onChange={(e) => setP(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Principal"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Rate</span>
            <input
              type="number"
              value={r}
              onChange={(e) => setR(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Rate %"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Time</span>
            <input
              type="number"
              value={t}
              onChange={(e) => setT(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Time (years)"
            />
          </label>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Summary</p>
          <div className="mt-4 space-y-3 text-sm text-zinc-900 dark:text-white">
            <div className="flex items-center justify-between rounded-3xl bg-white/90 p-4 dark:bg-white/5">
              <span>Interest</span>
              <span className="font-semibold">₹ {si.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-white/90 p-4 dark:bg-white/5">
              <span>Total Amount</span>
              <span className="font-semibold">₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}