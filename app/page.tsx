'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InspectionCertificate } from '@/components/InspectionCertificate';
import { EXPERT_GROUND_TRUTH_DATA } from '@/lib/groundTruthData';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  FileCheck2,
  BarChart3,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [repoInput, setRepoInput] = useState('');
  const expressReport = EXPERT_GROUND_TRUTH_DATA['expressjs/express'];

  const handleStartInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoInput.trim()) {
      const cleanName = repoInput.trim().replace(/^https?:\/\/github\.com\//, '');
      router.push(`/inspector?repo=${encodeURIComponent(cleanName)}`);
    } else {
      router.push('/inspector');
    }
  };

  return (
    <div className="space-y-16 font-sans pb-12">
      {/* Hero Section */}
      <section className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-5 sm:p-8 md:p-14 shadow-[6px_6px_0px_0px_#15181F] sm:shadow-[12px_12px_0px_0px_#15181F] relative overflow-hidden">
        <div className="max-w-4xl space-y-4 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#1E8E5A] bg-[#1E8E5A]/15 border border-[#1E8E5A]/30 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xs">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>AUTOMATED SENIOR ENGINEER CODE AUDITING</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#F7F5EE] leading-[1.15]"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
          >
            Codebase Quality Inspection Backed by Evidence, Not Vibes
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-[#F7F5EE]/85 max-w-3xl leading-relaxed font-sans">
            See exactly what a senior engineer would catch—architecture, tests, dependencies, hygiene—before you trust a codebase you didn&apos;t write.
          </p>

          {/* Interactive URL Form & Quick Chips */}
          <div className="pt-2 sm:pt-4 space-y-3 sm:space-y-4 max-w-2xl">
            <form onSubmit={handleStartInspection} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <input
                type="text"
                placeholder="Paste GitHub repository (e.g. expressjs/express)"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                className="w-full flex-1 bg-[#F7F5EE] text-[#15181F] border-2 border-[#15181F] px-3.5 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E8E5A]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-[#1E8E5A] text-[#F7F5EE] border-2 border-[#F7F5EE] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1E8E5A]/90 transition-all shadow-[3px_3px_0px_0px_#15181F] sm:shadow-[4px_4px_0px_0px_#15181F] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>START INSPECTION</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
              <span className="text-[#F7F5EE]/60 font-bold uppercase w-full sm:w-auto block sm:inline">Or try a sample:</span>
              <Link
                href="/inspector?repo=expressjs/express"
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-[#F7F5EE] transition-colors"
              >
                expressjs/express
              </Link>
              <Link
                href="/inspector?repo=pallets/flask"
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-[#F7F5EE] transition-colors"
              >
                pallets/flask
              </Link>
              <Link
                href="/inspector?repo=shadcn-ui/ui"
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-[#F7F5EE] transition-colors"
              >
                shadcn-ui/ui (Hard Case)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-6">
        <div className="border-b-4 border-[#2A2E38] pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5A5E6B]">
            HOW IT WORKS
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#15181F] mt-1"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
          >
            Three Simple Steps to Audit Any Codebase
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Step 1 */}
          <div className="bg-white border-4 border-[#2A2E38] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#2A2E38] sm:shadow-[6px_6px_0px_0px_#2A2E38] space-y-3 relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2A2E38] text-[#F7F5EE] font-mono font-black flex items-center justify-center text-base sm:text-lg border-2 border-[#15181F]">
              01
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-[#15181F]"
              style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
              1. Choose a Repository
            </h3>
            <p className="text-xs sm:text-sm text-[#15181F]/80 leading-relaxed font-sans">
              Paste any GitHub repository link or select one of our pre-audited open source projects.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-4 border-[#2A2E38] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#2A2E38] sm:shadow-[6px_6px_0px_0px_#2A2E38] space-y-3 relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#1E8E5A] text-[#F7F5EE] font-mono font-black flex items-center justify-center text-base sm:text-lg border-2 border-[#15181F]">
              02
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-[#15181F]"
              style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
              2. Automatic Code Inspection
            </h3>
            <p className="text-xs sm:text-sm text-[#15181F]/80 leading-relaxed font-sans">
              Automated tools check code structure, test suites, package safety, commit history, and code health.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-4 border-[#2A2E38] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#2A2E38] sm:shadow-[6px_6px_0px_0px_#2A2E38] space-y-3 relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D98E1E] text-[#F7F5EE] font-mono font-black flex items-center justify-center text-base sm:text-lg border-2 border-[#15181F]">
              03
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-[#15181F]"
              style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
              3. Get Your Quality Certificate
            </h3>
            <p className="text-xs sm:text-sm text-[#15181F]/80 leading-relaxed font-sans">
              Receive a clear audit report with a verdict (<code className="font-mono text-xs text-[#1E8E5A]">PASS</code>, <code className="font-mono text-xs text-[#D98E1E]">CAUTION</code>, or <code className="font-mono text-xs text-[#C43B3B]">HIGH RISK</code>) and verified code citations.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Certificate Preview Section */}
      <section className="space-y-6">
        <div className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-4 sm:p-6 shadow-[6px_6px_0px_0px_#15181F] sm:shadow-[8px_8px_0px_0px_#15181F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E8E5A]">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> SAMPLE INSPECTION REPORT
            </div>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-black mt-1"
              style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
              Example Report: expressjs/express
            </h2>
            <p className="text-xs font-mono text-[#F7F5EE]/70 mt-1">
              Sample inspection output for the popular Node.js web framework.
            </p>
          </div>

          <Link
            href="/inspector?repo=expressjs/express"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#1E8E5A] text-[#F7F5EE] border-2 border-[#F7F5EE] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1E8E5A]/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>INSPECT LIVE</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Embedded Certificate Component */}
        <div className="border-4 border-[#2A2E38] bg-white p-1 sm:p-2 md:p-4 shadow-[4px_4px_0px_0px_#2A2E38] sm:shadow-[8px_8px_0px_0px_#2A2E38] overflow-x-auto max-w-full">
          <InspectionCertificate report={expressReport} />
        </div>
      </section>

      {/* Product Feature Pathways Section */}
      <section className="space-y-6">
        <div className="border-b-4 border-[#2A2E38] pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5A5E6B]">
            EXPLORE THE PLATFORM
          </span>
          <h2
            className="text-3xl font-black text-[#15181F] mt-1"
            style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
          >
            Deep-Dive Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pathway 1: Inspector */}
          <Link
            href="/inspector"
            className="group bg-white border-4 border-[#2A2E38] p-6 shadow-[6px_6px_0px_0px_#2A2E38] hover:shadow-[10px_10px_0px_0px_#2A2E38] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-12 h-12 bg-[#1E8E5A]/15 border-2 border-[#2A2E38] flex items-center justify-center text-[#1E8E5A] mb-4 group-hover:bg-[#1E8E5A] group-hover:text-white transition-colors">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl font-extrabold text-[#15181F] group-hover:text-[#1E8E5A] transition-colors"
                style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
              >
                Certificate Inspector
              </h3>
              <p className="text-sm text-[#15181F]/80 mt-2 font-sans">
                Run live audits on any repository and compare different AI inspection modes.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1E8E5A] uppercase pt-2 border-t-2 border-[#2A2E38]/10">
              Open Inspector <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pathway 2: Benchmark */}
          <Link
            href="/benchmark"
            className="group bg-white border-4 border-[#2A2E38] p-6 shadow-[6px_6px_0px_0px_#2A2E38] hover:shadow-[10px_10px_0px_0px_#2A2E38] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-12 h-12 bg-[#D98E1E]/15 border-2 border-[#2A2E38] flex items-center justify-center text-[#D98E1E] mb-4 group-hover:bg-[#D98E1E] group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl font-extrabold text-[#15181F] group-hover:text-[#D98E1E] transition-colors"
                style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
              >
                10-Repo Benchmark
              </h3>
              <p className="text-sm text-[#15181F]/80 mt-2 font-sans">
                See how our audit scores compare directly against expert senior engineer reviews.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#D98E1E] uppercase pt-2 border-t-2 border-[#2A2E38]/10">
              View Benchmark <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pathway 3: Trajectories */}
          <Link
            href="/trajectories"
            className="group bg-white border-4 border-[#2A2E38] p-6 shadow-[6px_6px_0px_0px_#2A2E38] hover:shadow-[10px_10px_0px_0px_#2A2E38] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="w-12 h-12 bg-[#2A2E38]/15 border-2 border-[#2A2E38] flex items-center justify-center text-[#2A2E38] mb-4 group-hover:bg-[#2A2E38] group-hover:text-white transition-colors">
                <Terminal className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl font-extrabold text-[#15181F] group-hover:text-[#2A2E38] transition-colors"
                style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
              >
                Agent Trajectories
              </h3>
              <p className="text-sm text-[#15181F]/80 mt-2 font-sans">
                Watch step-by-step how the AI inspects code, runs tools, and verifies evidence.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2A2E38] uppercase pt-2 border-t-2 border-[#2A2E38]/10">
              View Trajectories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
