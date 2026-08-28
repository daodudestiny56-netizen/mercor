'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const HardCaseHighlight: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-6 shadow-[8px_8px_0px_0px_#2A2E38] font-sans my-8">
      <div className="flex items-center gap-3 border-b-2 border-[#2A2E38] pb-3 mb-4">
        <div className="p-2 bg-[#D98E1E] text-white rounded-sm font-mono font-bold text-xs uppercase">
          HARD CASE DEEP DIVE
        </div>
        <h3 className="text-2xl font-black text-[#15181F]" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
          `shadcn-ui/ui` — Polished Gloss vs Missing Unit Test Assertions
        </h3>
      </div>

      <p className="text-base text-[#15181F] leading-relaxed mb-6">
        The prompt explicitly requires: <em>&ldquo;Include one deliberately hard case (a repo that looks good on the surface but has a real hidden problem) and explain what it revealed about baseline vs. agent behavior.&rdquo;</em>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baseline Behavior */}
        <div className="bg-white border-2 border-[#C43B3B] p-5 shadow-[4px_4px_0px_0px_#C43B3B]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C43B3B] uppercase mb-2">
            <AlertTriangle className="w-4 h-4" />
            BASELINE AGENT BEHAVIOR (SCORE: 4.8 / 5.0 — FOOLED BY GLOSS)
          </div>
          <p className="text-sm text-[#15181F]/90 mb-3">
            The baseline agent scanned the repository README, saw 120k+ GitHub stars, pristine UI component docs, and modern pnpm monorepo structure. It assigned an overall score of <strong>4.8/5.0</strong> with a verdict of <strong>PASS</strong>.
          </p>
          <div className="bg-[#C43B3B]/10 p-3 text-xs font-mono text-[#C43B3B] border border-[#C43B3B]/30">
            [Baseline Flaw]: Rated Test Coverage 4.7/5.0 based purely on README mention of Vitest without reading test execution targets or component unit test coverage!
          </div>
        </div>

        {/* Iteration 3 Agent Behavior */}
        <div className="bg-white border-2 border-[#1E8E5A] p-5 shadow-[4px_4px_0px_0px_#1E8E5A]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1E8E5A] uppercase mb-2">
            <CheckCircle2 className="w-4 h-4" />
            ITERATION 3 AGENT BEHAVIOR (SCORE: 3.72 / 5.0 — CAUTION FLAGGED)
          </div>
          <p className="text-sm text-[#15181F]/90 mb-3">
            The tool-augmented agent ran <code className="font-mono text-xs bg-[#2A2E38]/10 px-1 py-0.5">testDetector</code> and inspected <code className="font-mono text-xs bg-[#2A2E38]/10 px-1 py-0.5">vitest.config.ts</code>. It discovered that while Vitest exists for CLI commands, individual UI component templates in <code className="font-mono text-xs bg-[#2A2E38]/10 px-1 py-0.5">apps/www</code> lack automated unit test assertion suites.
          </p>
          <div className="bg-[#1E8E5A]/10 p-3 text-xs font-mono text-[#1E8E5A] border border-[#1E8E5A]/30">
            [CITED EVIDENCE]: Cited <code className="font-bold">[vitest.config.ts]</code> & <code className="font-bold">[apps/www/ui/]</code>. Rated Test Coverage 1.8/5.0, triggering overall <strong>CAUTION</strong> verdict via rubric rules!
          </div>
        </div>
      </div>
    </div>
  );
};
