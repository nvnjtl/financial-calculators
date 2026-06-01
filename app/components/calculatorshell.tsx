import Link from "next/link";

interface CalculatorShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function CalculatorShell({
  title,
  description = "Use the panel below to adjust inputs and view results in a clean, readable layout.",
  children,
}: CalculatorShellProps) {
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-md transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/50">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-teal-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300 dark:hover:bg-slate-700"
            >
              ← Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:mt-0 dark:text-slate-100">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/60 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/50">
          {children}
        </div>
      </div>
    </div>
  );
}
