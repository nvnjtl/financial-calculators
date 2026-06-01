"use client";

import { useEffect, useState } from "react";

export function useCurrency() {
  const [currency, setCurrency] = useState<string>("INR");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("currency") : null;
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("currency", currency);
  }, [currency]);

  return [currency, setCurrency] as const;
}

export default function CurrencySelect() {
  const [currency, setCurrency] = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800"
    >
      <option value="INR">INR (₹)</option>
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
    </select>
  );
}
