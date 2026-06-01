"use client";

import { useEffect, useState } from "react";

export function useCurrency() {
  const [currency, setCurrency] = useState<string>("INR");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("currency", currency);
  }, [currency]);

  return [currency, setCurrency] as const;
}

export function formatCurrencyFor(currency: string, value: number) {
  const opts: Intl.NumberFormatOptions = {
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  };


  let locale = "en-US";
  let currencyCode = currency;

  // If a short name was passed like "INR", use a locale mapping for nicer formatting
  if (currency === "INR") locale = "en-IN";
  else if (currency === "USD") locale = "en-US";
  else if (currency === "EUR") locale = "de-DE";
  else if (currency === "JPY") locale = "ja-JP";
  else if (currency === "GBP") locale = "en-GB";

  // If the input is not a 3-letter currency code, fallback to INR handling
  if (!currency || currency.length !== 3) {
    currencyCode = currency === "INR" ? "INR" : "INR";
  }

  try {
    return new Intl.NumberFormat(locale, { ...opts, currency: currencyCode }).format(value);
  } catch (e) {
    // fallback
    const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹";
    return `${symbol} ${Math.round(value).toLocaleString()}`;
  }
}
