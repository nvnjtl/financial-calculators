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

export default function SIPvsLumpsumCalculator() {
  const [currency] = useCurrency();
  const formatCurrency = (value: number) => formatCurrencyFor(currency, value);
  const [monthly, setMonthly] = useState(10000);
  const [sipRate, setSipRate] = useState(10);
  const [lumpsum, setLumpsum] = useState(500000);
  const [lumpsumRate, setLumpsumRate] = useState(8);
  const [years, setYears] = useState(10);

  const { sipValue, lumpsumValue, chartData, totalSipInvested } = useMemo(() => {
    const months = years * 12;
    const monthlyRate = sipRate / 100 / 12;
    const sipFuture =
      monthlyRate === 0
        ? monthly * months
        : monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const lumpsumFuture = lumpsum * Math.pow(1 + lumpsumRate / 100, years);

    const data = Array.from({ length: years + 1 }, (_, index) => {
      const year = index;
      const sipValueYear =
        year === 0
          ? 0
          : monthlyRate === 0
          ? monthly * year * 12
          : monthly * (Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate;
      const lumpsumValueYear = lumpsum * Math.pow(1 + lumpsumRate / 100, year);
      return {
        year,
        sip: Number(sipValueYear.toFixed(0)),
        lumpsum: Number(lumpsumValueYear.toFixed(0)),
      };
    });

    return {
      sipValue: Number(sipFuture.toFixed(0)),
      lumpsumValue: Number(lumpsumFuture.toFixed(0)),
      totalSipInvested: monthly * months,
      chartData: data,
    };
  }, [monthly, sipRate, lumpsum, lumpsumRate, years]);

  return (
    <CalculatorShell title="SIP vs Lumpsum">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="grid gap-4 md:grid-cols-3">
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
            <span className="text-sm text-slate-500">SIP Return (%)</span>
            <input
              type="number"
              value={sipRate}
              onChange={(e) => setSipRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 12)"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Lumpsum Amount (₹)</span>
            <input
              type="number"
              value={lumpsum}
              onChange={(e) => setLumpsum(+e.target.value)}
              className="w-full calc-input"
              placeholder="₹ Lumpsum"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Lumpsum Return (%)</span>
            <input
              type="number"
              value={lumpsumRate}
              onChange={(e) => setLumpsumRate(+e.target.value)}
              className="w-full calc-input"
              placeholder="% (e.g., 10)"
            />
          </label>
          <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
            <span className="text-sm text-slate-500">Investment Duration</span>
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
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">SIP Value</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-700 dark:text-emerald-200">{formatCurrency(sipValue)}</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Lumpsum Value</p>
            <p className="mt-3 text-3xl font-semibold text-sky-700 dark:text-sky-200">{formatCurrency(lumpsumValue)}</p>
          </div>
          <div className="calc-accent-card dark:border-teal-100">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-700">Total SIP Invested</p>
            <p className="mt-3 text-2xl font-semibold text-teal-700 dark:text-teal-100">{formatCurrency(totalSipInvested)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-sm text-slate-500">Growth comparison</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => formatCurrencyFor(currency, value / 1000) + "k"} />
              <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
              <Line type="monotone" dataKey="sip" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="lumpsum" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorShell>
  );
}
