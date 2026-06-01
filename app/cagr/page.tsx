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
import { useCurrency, formatCurrencyFor } from "@/app/lib/currency";

export default function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState(10000);
  const [finalValue, setFinalValue] = useState(25000);
  const [years, setYears] = useState(5);

  const [currency] = useCurrency();
  const formatCurrency = (value: number) => formatCurrencyFor(currency, value);

  const { cagr, totalReturn, chartData } = useMemo(() => {
    const growth = initialValue > 0 && years > 0 ? finalValue / initialValue : 0;
    const cagrValue = years > 0 && growth > 0 ? Math.pow(growth, 1 / years) - 1 : 0;
    const totalReturnValue = initialValue > 0 ? growth - 1 : 0;

    const data = Array.from({ length: years + 1 }, (_, index) => {
      const year = index;
      const value = year === 0 ? initialValue : initialValue * Math.pow(1 + cagrValue, year);
      return { year, value: Number(value.toFixed(0)) };
    });

    return {
      cagr: Number((cagrValue * 100).toFixed(2)),
      totalReturn: Number((totalReturnValue * 100).toFixed(2)),
      chartData: data,
    };
  }, [initialValue, finalValue, years]);

  return (
    <CalculatorShell title="CAGR Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Initial Value</span>
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(+e.target.value)}
              className="w-full calc-input"
              placeholder="Initial Value"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Final Value (₹)</span>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Final Value"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Time Period</span>
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
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">CAGR</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{cagr}%</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Return</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{totalReturn}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Growth projection</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => formatCurrencyFor(currency, value / 1000) + "k"} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
