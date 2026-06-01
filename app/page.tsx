"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculators } from "@/app/lib/calculators";

const categoryStyles: Record<string, string> = {
  Loan: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Investment: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Savings: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Tax: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Cashflow: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Retirement: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  Planning: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300",
  Analysis: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Comparison: "bg-cyan-100 text-teal-700 dark:bg-cyan-900/30 dark:text-teal-300",
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(calculators.map((calc) => calc.category)))],
    []
  );

  const filteredCalculators = useMemo(
    () =>
      calculators.filter((calc) => {
        const matchesCategory = category === "All" || calc.category === category;
        const searchText = `${calc.title} ${calc.description}`.toLowerCase();
        const matchesQuery = searchText.includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [category, query]
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="text-center">
          <p className="text-sm uppercase tracking-widest text-teal-600 dark:text-teal-400">FinCalc</p>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Smart, simple financial tools</h1>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Quick calculators for loans, savings, investments and taxes — clear, accurate and easy to use.</p>
        </header>

        <div className="mt-10 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-teal-200 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-teal-500/50"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-teal-600 text-white shadow dark:bg-teal-500"
                  : "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <main className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCalculators.length > 0 ? (
            filteredCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={calc.path}
                className="group block rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-lg dark:hover:shadow-slate-900/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 font-semibold dark:bg-teal-950/50 dark:text-teal-300">
                    {calc.title
                      .split(" ")
                      .map((w) => w[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${categoryStyles[calc.category] ?? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                      {calc.category}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{calc.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{calc.description}</p>
                    <div className="mt-4 text-sm font-medium text-teal-600 dark:text-teal-400">Open tool →</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No calculators match your search.</p>
              <p className="mt-2 text-sm">Try a different keyword or reset the category filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
