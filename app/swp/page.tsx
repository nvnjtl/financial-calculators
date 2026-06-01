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

export default function SWPCalculator() {
  const [corpus, setCorpus] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(50000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const { finalBalance, totalWithdrawn, chartData } = useMemo(() => {
    const r = rate / 100;
    let balance = corpus;
    let withdrawn = 0;
    const data = [{ year: 0, balance, withdrawn }];

    for (let year = 1; year <= years; year += 1) {
      balance = balance * (1 + r) - withdrawal;
      if (balance < 0) {
        withdrawn += withdrawal + balance;
        balance = 0;
        data.push({ year, balance, withdrawn: Number(withdrawn.toFixed(2)) });
        break;
      }
      withdrawn += withdrawal;
      data.push({ year, balance: Number(balance.toFixed(2)), withdrawn: Number(withdrawn.toFixed(2)) });
    }

    return {
      finalBalance: Number(balance.toFixed(2)),
      totalWithdrawn: Number(withdrawn.toFixed(2)),
      chartData: data,
    };
  }, [corpus, withdrawal, rate, years]);

  const formatCurrency = (value: number) =>
    `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <CalculatorShell title="SWP Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Starting Corpus (₹)</span>
            <input
              type="number"
              value={corpus}
              onChange={(e) => setCorpus(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Corpus"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Annual Withdrawal (₹)</span>
            <input
              type="number"
              value={withdrawal}
              onChange={(e) => setWithdrawal(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Withdrawal"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Annual Return (%)</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 8)"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Withdrawal Years</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full calc-input"
              placeholder="Years"
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Withdrawn</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{formatCurrency(totalWithdrawn)}</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Remaining Corpus</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(finalBalance)}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-500/10 p-5 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">Withdrawal Plan</p>
            <p className="mt-3 text-2xl font-semibold text-amber-700 dark:text-amber-100">{years} years</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Corpus balance through withdrawal years</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(Number(value) / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="balance" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
