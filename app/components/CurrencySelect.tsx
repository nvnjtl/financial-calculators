"use client";

import { useCurrency } from "@/app/lib/currency";

export default function CurrencySelect() {
  const [currency, setCurrency] = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800"
      aria-label="Select currency"
    >
      <option value="INR">INR (₹)</option>
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
    </select>
  );
}
