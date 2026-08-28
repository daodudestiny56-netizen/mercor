'use client';

import React, { useEffect, useState } from 'react';
import { BenchmarkTable } from '@/components/BenchmarkTable';
import { HardCaseHighlight } from '@/components/HardCaseHighlight';
import { BenchmarkMetrics, BenchmarkRepoComparison } from '@/lib/types';
import { generateBenchmarkSuite } from '@/lib/evaluationEngine';
import { BarChart2, Loader2 } from 'lucide-react';

export default function BenchmarkPage() {
  const [data, setData] = useState<{
    comparisons: BenchmarkRepoComparison[];
    metrics: BenchmarkMetrics;
  } | null>(null);

  useEffect(() => {
    generateBenchmarkSuite().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-12 text-center shadow-[8px_8px_0px_0px_#2A2E38] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1E8E5A] mb-2" />
        <div className="font-mono text-sm font-bold uppercase tracking-wider text-[#5A5E6B]">
          COMPUTING 10-REPOSITORY GROUND TRUTH BENCHMARK MATRIX & SPEARMAN RANK CORRELATION...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Benchmark Banner */}
      <div className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-6 md:p-8 shadow-[8px_8px_0px_0px_#15181F]">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E8E5A] bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 px-2.5 py-1 mb-2">
          <BarChart2 className="w-4 h-4" />
          BENCHMARK EVALUATION SUITE
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
          10-Repo Expert Ground Truth Benchmark Matrix
        </h1>
        <p className="text-sm md:text-base text-[#F7F5EE]/80 mt-2 max-w-3xl">
          Measuring score alignment (Spearman Rank Correlation), verdict agreement, evidence citation count, and high-risk detection accuracy across Baseline vs Iterations 1–3 against manual Senior Engineer ground truth audits.
        </p>
      </div>

      {/* 10-Repo Benchmark Comparison Grid & Spearman Metrics */}
      <BenchmarkTable comparisons={data.comparisons} metrics={data.metrics} />

      {/* Hard Case Deep Dive (shadcn-ui/ui) */}
      <HardCaseHighlight />
    </div>
  );
}
