'use client';

import React, { useState } from 'react';
import { InspectionCertificate } from '@/components/InspectionCertificate';
import { AuditReport } from '@/lib/types';
import { EXPERT_GROUND_TRUTH_DATA } from '@/lib/groundTruthData';
import { ShieldCheck, Search, Loader2 } from 'lucide-react';

export default function InspectorPage() {
  const sampleRepos = Object.keys(EXPERT_GROUND_TRUTH_DATA);
  const [selectedRepo, setSelectedRepo] = useState<string>('expressjs/express');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [iteration, setIteration] = useState<'baseline' | 'iteration_1' | 'iteration_2' | 'iteration_3'>('iteration_3');
  const [report, setReport] = useState<AuditReport>(EXPERT_GROUND_TRUTH_DATA['expressjs/express']);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAudit = async (repoName: string, iter: typeof iteration) => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: repoName, iteration: iter }),
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      }
    } catch {
      if (EXPERT_GROUND_TRUTH_DATA[repoName]) {
        setReport(EXPERT_GROUND_TRUTH_DATA[repoName]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const repoName = inputUrl.trim().replace(/^https?:\/\/github\.com\//, '');
    setSelectedRepo(repoName);
    handleAudit(repoName, iteration);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Inspector Header */}
      <div className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-6 md:p-8 shadow-[8px_8px_0px_0px_#15181F]">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E8E5A] bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 px-2.5 py-1 mb-2">
          <ShieldCheck className="w-4 h-4" />
          CERTIFICATE INSPECTION ENGINE
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
          Interactive Codebase Inspector
        </h1>
        <p className="text-sm md:text-base text-[#F7F5EE]/80 mt-2 max-w-3xl">
          Auditing software repositories against a rigorous 6-dimension rubric. Toggle between baseline LLM behavior and tool-verified agent passes to inspect evidence-backed quality certificates.
        </p>
      </div>

      {/* Audit Controls & Repository Selector */}
      <div className="bg-[#F7F5EE] border-4 border-[#2A2E38] p-6 shadow-[6px_6px_0px_0px_#2A2E38] space-y-6">
        {/* Custom Repo Search Input */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#5A5E6B] mb-2">
            INSPECT ANY GITHUB REPOSITORY
          </label>
          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g. facebook/react or https://github.com/expressjs/express"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-white border-2 border-[#2A2E38] px-4 py-3 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E8E5A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1E8E5A] text-[#F7F5EE] border-2 border-[#15181F] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1E8E5A]/90 transition-all shadow-[3px_3px_0px_0px_#2A2E38] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              RUN AUDIT
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t-2 border-b-2 border-[#2A2E38] py-4">
          <div>
            <h2 className="text-xl font-bold font-display uppercase tracking-wide text-[#15181F]">
              Ground Truth Repository & Agent Iteration
            </h2>
            <p className="text-xs font-mono text-[#5A5E6B]">
              Compare how different agent iterations evaluate ground-truth open source repositories.
            </p>
          </div>

          {/* Iteration Selector */}
          <div className="flex flex-wrap items-center gap-1 bg-white border-2 border-[#2A2E38] p-1 font-mono text-xs font-bold">
            <button
              onClick={() => {
                setIteration('baseline');
                handleAudit(selectedRepo, 'baseline');
              }}
              className={`px-3 py-1.5 transition-colors ${
                iteration === 'baseline' ? 'bg-[#C43B3B] text-[#F7F5EE]' : 'text-[#5A5E6B] hover:text-[#15181F]'
              }`}
            >
              Baseline
            </button>
            <button
              onClick={() => {
                setIteration('iteration_1');
                handleAudit(selectedRepo, 'iteration_1');
              }}
              className={`px-3 py-1.5 transition-colors ${
                iteration === 'iteration_1' ? 'bg-[#D98E1E] text-[#F7F5EE]' : 'text-[#5A5E6B] hover:text-[#15181F]'
              }`}
            >
              Iter 1 (Context)
            </button>
            <button
              onClick={() => {
                setIteration('iteration_2');
                handleAudit(selectedRepo, 'iteration_2');
              }}
              className={`px-3 py-1.5 transition-colors ${
                iteration === 'iteration_2' ? 'bg-[#1E8E5A] text-[#F7F5EE]' : 'text-[#5A5E6B] hover:text-[#15181F]'
              }`}
            >
              Iter 2 (Tools)
            </button>
            <button
              onClick={() => {
                setIteration('iteration_3');
                handleAudit(selectedRepo, 'iteration_3');
              }}
              className={`px-3 py-1.5 transition-colors ${
                iteration === 'iteration_3' ? 'bg-[#2A2E38] text-[#F7F5EE]' : 'text-[#5A5E6B] hover:text-[#15181F]'
              }`}
            >
              Iter 3 (Verified)
            </button>
          </div>
        </div>

        {/* Repos Grid Chips */}
        <div>
          <div className="text-xs font-mono font-bold uppercase text-[#5A5E6B] mb-2">
            PRE-AUDITED GROUND TRUTH REPOSITORIES
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleRepos.map((repo) => (
              <button
                key={repo}
                onClick={() => {
                  setSelectedRepo(repo);
                  handleAudit(repo, iteration);
                }}
                className={`px-3 py-2 text-xs font-mono font-bold border-2 transition-all shadow-[2px_2px_0px_0px_#2A2E38] ${
                  selectedRepo === repo
                    ? 'bg-[#2A2E38] text-[#F7F5EE] border-[#15181F]'
                    : 'bg-white text-[#15181F] border-[#2A2E38] hover:bg-[#2A2E38]/10'
                }`}
              >
                {repo}
                {repo === 'shadcn-ui/ui' && <span className="ml-1 text-[#D98E1E] text-[10px] uppercase font-mono">[Hard Case]</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Inspection Certificate Display */}
      {loading ? (
        <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-12 text-center shadow-[8px_8px_0px_0px_#2A2E38] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1E8E5A] mb-2" />
          <div className="font-mono text-sm font-bold uppercase tracking-wider text-[#5A5E6B]">
            RUNNING AGENT AUDIT & CITATION VERIFICATION LOOP...
          </div>
        </div>
      ) : (
        <InspectionCertificate report={report} />
      )}
    </div>
  );
}
