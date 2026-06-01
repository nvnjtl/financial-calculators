"use client";

import { useState } from "react";
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

export default function EMIPage() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);

  const r = rate / 12 / 100;
  const n = time * 12;

  const emi =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      emi,
      principal: principalPaid,
      interest,
      balance: balance > 0 ? balance : 0,
    });
  }

  const totalInterest = schedule.reduce(
    (acc, curr) => acc + curr.interest,
    0
  );

  const chartData = schedule.map((row) => ({
    month: row.month,
    balance: Math.max(Math.round(row.balance), 0),
  }));

  const displaySchedule = schedule.slice(0, 24);

  const formatCurrency = (value: number) =>
    `₹ ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <CalculatorShell title="EMI Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 calc-form-card dark:border-slate-700 dark:bg-slate-950">
              <span className="text-sm text-slate-500">Loan Amount (₹)</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(+e.target.value)}
                className="w-full calc-input"
                placeholder="Loan Amount"
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
              <span className="text-sm text-slate-500">Loan Tenure (Years)</span>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(+e.target.value)}
                className="w-full calc-input"
                placeholder="Years"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Monthly EMI</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{formatCurrency(emi)}</p>
          </div>
          <div className="calc-stat-card dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total Interest</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="calc-accent-card dark:border-teal-100">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-700">Total Payment</p>
            <p className="mt-3 text-2xl font-semibold text-teal-700 dark:text-teal-200">{formatCurrency(emi * n)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="calc-form-card dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm text-slate-500">Balance over time</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height={300} minHeight={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => typeof value === "number" ? formatCurrency(value) : ""} />
                <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="overflow-hidden calc-form-card dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm text-slate-500">Sample amortization schedule</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-3 py-2 text-slate-500">Month</th>
                  <th className="px-3 py-2 text-slate-500">Principal (₹)</th>
                  <th className="px-3 py-2 text-slate-500">Interest</th>
                  <th className="px-3 py-2 text-slate-500">Balance</th>
                </tr>
              </thead>
              <tbody>
                {displaySchedule.map((row) => (
                  <tr key={row.month} className="border-b border-slate-200 dark:border-slate-700 even:bg-white/60 dark:even:bg-slate-900">
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{formatCurrency(row.principal)}</td>
                    <td className="px-3 py-2">{formatCurrency(row.interest)}</td>
                    <td className="px-3 py-2">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {schedule.length > displaySchedule.length && (
            <p className="mt-3 text-xs text-slate-500">Showing first {displaySchedule.length} months of {schedule.length}.</p>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
}