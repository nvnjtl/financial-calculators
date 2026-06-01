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

export default function PPFCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const { maturityValue, totalDeposit, interestEarned, chartData } = useMemo(() => {
    const r = rate / 100;
    let balance = 0;
    const data = Array.from({ length: years + 1 }, (_, index) => {
      if (index === 0) {
        return { year: 0, balance: 0 };
      }
      balance = (balance + annualDeposit) * (1 + r);
      return { year: index, balance: Number(balance.toFixed(0)) };
    });

    return {
      maturityValue: Number(data[data.length - 1].balance.toFixed(0)),
      totalDeposit: annualDeposit * years,
      interestEarned: Number((balance - annualDeposit * years).toFixed(0)),
      chartData: data,
    };
  }, [annualDeposit, rate, years]);

  return (
    <CalculatorShell title="PPF Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Annual Deposit (₹)</span>
            <input
              type="number"
              value={annualDeposit}
              onChange={(e) => setAnnualDeposit(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Annual Deposit"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Interest Rate (%)</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 8.5)"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Duration (Years)</span>
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
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Deposit</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{formatCurrency(totalDeposit)}</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Interest Earned</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(interestEarned)}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Maturity Value</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-700 dark:text-emerald-200">{formatCurrency(maturityValue)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">PPF balance over time</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="balance" stroke="#0ea5e9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
