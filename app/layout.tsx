import Link from "next/link";
import "./globals.css";

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
      <body className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white">
        
        {/* Navbar */}
        <nav className="w-full border-b p-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            FinCalc
          </Link>

          <div className="flex gap-4 text-sm">
            <Link href="/emi" className="hover:underline">EMI</Link>
            <Link href="/simple-interest" className="hover:underline">Interest</Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}