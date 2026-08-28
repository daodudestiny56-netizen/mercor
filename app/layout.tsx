import type { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Repo Quality Reviewer — Senior Engineer Inspection Engine',
  description: 'Evidence-backed repository quality audit benchmarked against real senior engineer ground truth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="bg-[#F7F5EE] text-[#15181F] min-h-screen font-sans antialiased selection:bg-[#2A2E38] selection:text-[#F7F5EE]">
        <header className="bg-[#2A2E38] text-[#F7F5EE] border-b-4 border-[#15181F] py-4 px-6 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[#1E8E5A] border-2 border-[#F7F5EE] font-mono font-black flex items-center justify-center text-sm shadow-[2px_2px_0px_0px_#F7F5EE]">
                RQ
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight block leading-none font-display">
                  REPO QUALITY REVIEWER
                </span>
                <span className="text-[11px] font-mono text-[#F7F5EE]/70">
                  THE INSPECTION CERTIFICATE ENGINE
                </span>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Link
                href="/"
                className="px-3 py-1.5 border border-[#F7F5EE]/30 hover:bg-[#F7F5EE] hover:text-[#15181F] transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/inspector"
                className="px-3 py-1.5 border border-[#F7F5EE]/30 hover:bg-[#F7F5EE] hover:text-[#15181F] transition-colors"
              >
                Certificate Inspector
              </Link>
              <Link
                href="/benchmark"
                className="px-3 py-1.5 border border-[#F7F5EE]/30 hover:bg-[#F7F5EE] hover:text-[#15181F] transition-colors"
              >
                10-Repo Benchmark
              </Link>
              <Link
                href="/trajectories"
                className="px-3 py-1.5 border border-[#F7F5EE]/30 hover:bg-[#F7F5EE] hover:text-[#15181F] transition-colors"
              >
                Trajectories
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
