"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";
import { useCurrency, formatCurrencyFor } from "@/app/lib/currency";

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

  const [currency] = useCurrency();
  const formatCurrencyBy = (value: number) => formatCurrencyFor(currency, value);

  return (
    <CalculatorShell title="RD Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-3 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Monthly Deposit (₹)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(+e.target.value)}
                className="w-full calc-input"
                placeholder="₹ Monthly Deposit"
              />
              <span className="text-sm text-slate-600">{formatCurrencyFor(currency, 0).replace(/0|\s|,/g, "")}</span>
            </div>
          </label>
          <label className="flex flex-col gap-3 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm uppercase tracking-[0.24em] text-slate-400">Annual Rate</span>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 7.5)"
            />
          </label>
          <label className="flex flex-col gap-3 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm uppercase tracking-[0.24em] text-slate-400">Duration (Years)</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="w-full calc-input"
              placeholder="Duration (Years)"
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Invested</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatCurrencyBy(totalInvested)}</p>
          </div>
          <div className="calc-stat-card">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Interest Earned</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatCurrencyBy(interestEarned)}</p>
          </div>
          <div className="calc-accent-card">
            <p className="text-sm uppercase tracking-[0.24em] text-teal-700">Maturity Value</p>
            <p className="mt-4 text-3xl font-semibold text-teal-700">{formatCurrencyBy(maturityValue)}</p>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
