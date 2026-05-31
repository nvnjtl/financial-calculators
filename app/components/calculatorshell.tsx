import Link from "next/link";

export default function CalculatorShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-sm text-cyan-200 transition hover:bg-zinc-900"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:mt-0">{title}</h1>
          </div>
          <p className="max-w-sm text-sm text-zinc-400">
            Powered by reusable calculator tools. Adjust values and see instant financial outputs in a clean layout.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-white/95 p-6 shadow-2xl shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
}