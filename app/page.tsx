"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculators } from "@/app/lib/calculators";

const categoryStyles: Record<string, string> = {
  Loan: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  Investment: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Savings: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Tax: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Cashflow: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Retirement: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
  Planning: "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
  Analysis: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Comparison: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(calculators.map((calc) => calc.category))),
    ],
    []
  );

  const filteredCalculators = useMemo(
    () =>
      calculators.filter((calc) => {
        const matchesCategory =
          category === "All" || calc.category === category;
        const searchText = `${calc.title} ${calc.description}`.toLowerCase();
        const matchesQuery = searchText.includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [category, query]
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">FinCalc Platform</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                A smarter financial calculator experience.
              </h1>
              <p className="mt-4 max-w-2xl text-zinc-300">
                Compare loan, savings, investment, and tax outcomes in one place. Quick tools for EMI, SIP, FD, RD, GST and more.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-center">
                <p className="text-sm text-zinc-400">Calculators</p>
                <p className="mt-2 text-2xl font-semibold text-white">{calculators.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-center">
                <p className="text-sm text-zinc-400">Categories</p>
                <p className="mt-2 text-2xl font-semibold text-white">{categories.length - 1}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-center">
                <p className="text-sm text-zinc-400">Searchable</p>
                <p className="mt-2 text-2xl font-semibold text-white">Yes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-zinc-900/90 p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Find the right calculator</h2>
              <p className="text-zinc-400">Quickly search by name or description, then filter by category.</p>
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/90 px-5 py-3 text-sm text-white shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 sm:max-w-md"
              placeholder="Search calculators..."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === cat
                    ? "border-cyan-400 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {filteredCalculators.length > 0 ? (
            filteredCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={calc.path}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-zinc-900"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-sky-500/10 text-xl font-semibold text-cyan-300">
                    {calc.title.split(" ").map((word) => word[0]).join("")}
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[calc.category] ?? "bg-zinc-800 text-zinc-100"}`}>
                    {calc.category}
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white transition group-hover:text-cyan-300">{calc.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{calc.description}</p>

                <div className="mt-6 flex items-center justify-between text-sm text-cyan-300">
                  <span>Open tool</span>
                  <span className="text-lg">→</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-dashed border-zinc-700 bg-zinc-950/80 p-10 text-center text-zinc-300">
              <p className="text-lg font-semibold text-white">No calculators match your search.</p>
              <p className="mt-2 text-sm text-zinc-500">Try another keyword or reset the category.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}