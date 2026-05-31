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

export default function NPVCalculator() {
  const [investment, setInvestment] = useState(1000000);
  const [discountRate, setDiscountRate] = useState(10);
  const [cashFlows, setCashFlows] = useState([250000, 300000, 350000, 400000, 450000]);

  const { npv, chartData } = useMemo(() => {
    const rate = discountRate / 100;
    let total = -investment;
    const data = cashFlows.map((cashFlow, index) => {
      const year = index + 1;
      const presentValue = cashFlow / Math.pow(1 + rate, year);
      total += presentValue;
      return {
        year,
        cashFlow,
        presentValue: Number(presentValue.toFixed(0)),
      };
    });

    return {
      npv: Number(total.toFixed(0)),
      chartData: data,
    };
  }, [investment, discountRate, cashFlows]);

  const updateCashFlow = (index: number, value: number) => {
    const updated = [...cashFlows];
    updated[index] = value;
    setCashFlows(updated);
  };

  return (
    <CalculatorShell title="NPV Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Initial Investment</span>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Investment"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-sm text-zinc-500">Discount Rate</span>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(+e.target.value)}
              className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder="Discount Rate %"
            />
          </label>
        </div>

        <div className="space-y-4 rounded-3xl border border-rose-200 bg-rose-500/10 p-5 shadow-sm dark:border-rose-500/20 dark:bg-rose-500/10">
          <p className="text-sm uppercase tracking-[0.2em] text-rose-700">NPV Result</p>
          <p className="mt-3 text-3xl font-semibold text-rose-700 dark:text-rose-200">{formatCurrency(npv)}</p>
          <p className="text-sm text-rose-600 dark:text-rose-300">
            {npv >= 0 ? "Project adds value at this discount rate." : "Project destroys value at this discount rate."}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-4 text-sm text-zinc-500">Cash flows</p>
          <div className="grid gap-3">
            {cashFlows.map((value, index) => (
              <label key={index} className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <span className="text-sm text-zinc-500">Year {index + 1}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => updateCashFlow(index, +e.target.value)}
                  className="w-full rounded-3xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm text-zinc-500">Discounted cash flow profile</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height={300} minHeight={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
                <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
                <Line type="monotone" dataKey="presentValue" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
