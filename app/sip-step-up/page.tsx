"use client";

import { useMemo, useState } from "react";
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

export default function SIPStepUpCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(5);

  const monthlyRate = rate / 12 / 100;

  const { totalInvested, futureValue, chartData } = useMemo(() => {
    let currentAmount = monthly;
    let balance = 0;
    let invested = 0;
    const data = [];

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = (balance + currentAmount) * (1 + monthlyRate);
        invested += currentAmount;
      }

      data.push({
        year,
        balance: Math.round(balance),
        invested: Math.round(invested),
      });

      currentAmount *= 1 + stepUp / 100;
    }

    return {
      totalInvested: invested,
      futureValue: balance,
      chartData: data,
    };
  }, [monthly, rate, years, stepUp, monthlyRate]);

  const wealthGained = futureValue - totalInvested;

  const formatCurrency = (value: number) =>
    `₹ ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <CalculatorShell title="Step-Up SIP Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mb-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
              <span className="text-sm text-slate-500">Monthly SIP (₹)</span>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(+e.target.value)}
                className="w-full calc-input"
                placeholder="₹ Monthly SIP"
              />
            </label>
            <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
              <span className="text-sm text-slate-500">Annual Return (%)</span>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="w-full calc-input"
                placeholder="% (e.g., 12)"
              />
            </label>
            <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
              <span className="text-sm text-slate-500">Annual Step-Up (%)</span>
              <input
                type="number"
                value={stepUp}
                onChange={(e) => setStepUp(+e.target.value)}
                className="w-full calc-input"
                placeholder="% (e.g., 10)"
              />
            </label>
            <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
              <span className="text-sm text-slate-500">Duration (Years)</span>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(+e.target.value)}
                className="w-full calc-input"
                placeholder="Investment Duration (Years)"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Invested</p>
            <p className="mt-3 text-3xl font-semibold text-white dark:text-white">{formatCurrency(totalInvested)}</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Wealth Gained</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(wealthGained)}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-500/10 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Maturity Value</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-700 dark:text-emerald-200">{formatCurrency(futureValue)}</p>
          </div>
        </div>
      </div>

      <div className="calc-form-card dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Step-up SIP growth</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `₹${Math.round(Number(value) / 1000)}k`} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="balance" stroke="#16a34a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {chartData.map((item) => (
          <div key={item.year} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm text-slate-500">Year {item.year}</p>
            <p className="mt-2 text-lg font-semibold">{formatCurrency(item.balance)}</p>
            <p className="text-xs text-slate-500">Invested {formatCurrency(item.invested)}</p>
          </div>
        ))}
      </div>
    </CalculatorShell>
  );
}
