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


function calculateIRR(cashFlows: number[]) {
  const npv = (rate: number) =>
    cashFlows.reduce((sum, cash, index) => sum + cash / Math.pow(1 + rate, index), 0);
  let low = -0.9999;
  let high = 1;
  let mid = 0;

  for (let i = 0; i < 60; i += 1) {
    mid = (low + high) / 2;
    const value = npv(mid);
    if (value > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return mid;
}

export default function IRRCalculator() {
  const [investment, setInvestment] = useState(1000000);
  const [discountRate, setDiscountRate] = useState(10);
  const [cashFlows, setCashFlows] = useState([300000, 320000, 350000, 380000, 420000]);

  const { irr, discountedCashflows, totalNPV } = useMemo(() => {
    const flows = [-investment, ...cashFlows];
    const irrResult = calculateIRR(flows);
    const rate = discountRate / 100;
    const discounted = flows.map((cash, index) => {
      const presentValue = cash / Math.pow(1 + rate, index);
      return {
        year: index,
        presentValue: Number(presentValue.toFixed(0)),
      };
    });
    const npv = discounted.reduce((sum, item) => sum + item.presentValue, 0);
    return {
      irr: Number((irrResult * 100).toFixed(2)),
      discountedCashflows: discounted,
      totalNPV: Number(npv.toFixed(0)),
    };
  }, [investment, discountRate, cashFlows]);

  const [currency] = useCurrency();
  const formatCurrency = (value: number) => formatCurrencyFor(currency, value);

  const updateFlow = (index: number, value: number) => {
    const next = [...cashFlows];
    next[index] = value;
    setCashFlows(next);
  };

  return (
    <CalculatorShell title="IRR Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Initial Investment (₹)</span>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Investment"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Discount Rate (%)</span>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 10)"
            />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Internal Rate of Return</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{irr}%</p>
          </div>
          <div className="rounded-3xl border border-violet-200 bg-violet-500/10 p-5 shadow-sm dark:border-violet-500/20 dark:bg-violet-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-700">Total NPV</p>
            <p className="mt-3 text-2xl font-semibold text-violet-700 dark:text-violet-200">{formatCurrency(totalNPV)}</p>
          </div>
        </div>
      </div>

      <div className="calc-form-card dark:border-slate-700 dark:bg-slate-950">
        <p className="mb-4 text-sm text-slate-500">Projected discounted cashflow</p>
        <div className="grid gap-3">
          {discountedCashflows.map((item) => (
            <div key={item.year} className="flex items-center justify-between rounded-3xl bg-white/90 px-4 py-3 text-sm dark:bg-white/5">
              <span>Year {item.year}</span>
              <span>{formatCurrency(item.presentValue)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Discounted value trend</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={discountedCashflows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => formatCurrencyFor(currency, value / 1000) + "k"} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="presentValue" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
