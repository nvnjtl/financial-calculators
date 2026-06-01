import Link from "next/link";
import "./globals.css";
import ThemeToggle from "@/app/components/ThemeToggle";

export const metadata = {
  title: "Financial Calculators",
  description: "EMI, SIP, Interest calculators and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        
        {/* Navbar */}
        <nav className="w-full border-b border-slate-200 bg-white p-4 flex justify-between items-center shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
          <Link href="/" className="font-bold text-lg text-slate-900 dark:text-slate-100">
            FinCalc
          </Link>

          <div className="flex gap-4 text-sm">
            <Link href="/emi" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">EMI</Link>
            <Link href="/simple-interest" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors">Interest</Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}