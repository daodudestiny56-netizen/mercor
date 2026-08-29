'use client';

import React, { useState } from 'react';
import { AuditReport } from '@/lib/types';
import { VerdictStamp } from '@/components/VerdictStamp';
import { Swords, Search, Trophy, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function VersusPage() {
  const [repoAInput, setRepoAInput] = useState('expressjs/express');
  const [repoBInput, setRepoBInput] = useState('fastify/fastify');
  const [loading, setLoading] = useState(false);

  const [reportA, setReportA] = useState<AuditReport | null>(null);
  const [reportB, setReportB] = useState<AuditReport | null>(null);

  const handleRunVersus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    const cleanA = repoAInput.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/+$/, '');
    const cleanB = repoBInput.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/+$/, '');

    try {
      const [resA, resB] = await Promise.all([
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ repoUrl: cleanA, iteration: 'iteration_3' }),
        }),
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ repoUrl: cleanB, iteration: 'iteration_3' }),
        }),
      ]);

      const dataA = await resA.json();
      const dataB = await resB.json();

      setReportA(dataA.report || null);
      setReportB(dataB.report || null);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const winner = reportA && reportB
    ? reportA.overallScore >= reportB.overallScore
      ? reportA
      : reportB
    : null;

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Header Banner */}
      <div className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-6 md:p-8 shadow-[8px_8px_0px_0px_#15181F]">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E8E5A] bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 px-2.5 py-1 mb-2">
          <Swords className="w-4 h-4 text-[#D98E1E]" />
          SIDE-BY-SIDE CODEBASE COMPARISON
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
          Repository Quality Battle Arena
        </h1>
        <p className="text-sm md:text-base text-[#F7F5EE]/80 mt-2 max-w-3xl leading-relaxed">
          Compare two software repositories side-by-side across all 6 rubric dimensions. Our tool-augmented verification engine deep-scans both codebases to declare an official quality winner.
        </p>
      </div>

      {/* Input Arena Bar */}
      <div className="bg-[#F7F5EE] border-4 border-[#2A2E38] p-6 shadow-[6px_6px_0px_0px_#2A2E38] space-y-4">
        <form onSubmit={handleRunVersus} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5">
            <label className="block text-xs font-mono font-bold uppercase text-[#15181F] mb-1">
              REPOSITORIES A (CONTENDER 1)
            </label>
            <input
              type="text"
              value={repoAInput}
              onChange={e => setRepoAInput(e.target.value)}
              placeholder="e.g. expressjs/express"
              className="w-full bg-white border-2 border-[#2A2E38] px-3.5 py-2.5 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E8E5A]"
            />
          </div>

          <div className="md:col-span-2 text-center font-black font-mono text-xl text-[#D98E1E] py-1">
            VS
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-mono font-bold uppercase text-[#15181F] mb-1">
              REPOSITORY B (CONTENDER 2)
            </label>
            <input
              type="text"
              value={repoBInput}
              onChange={e => setRepoBInput(e.target.value)}
              placeholder="e.g. fastify/fastify"
              className="w-full bg-white border-2 border-[#2A2E38] px-3.5 py-2.5 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E8E5A]"
            />
          </div>

          <div className="md:col-span-12 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1E8E5A] text-[#F7F5EE] border-2 border-[#15181F] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1E8E5A]/90 transition-all shadow-[4px_4px_0px_0px_#2A2E38] flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
              <span>RUN SIDE-BY-SIDE BATTLE AUDIT</span>
            </button>
          </div>
        </form>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-2 border-t-2 border-[#2A2E38]/10">
          <span className="text-[#5A5E6B] font-bold uppercase">Popular Rivalries:</span>
          <button
            onClick={() => { setRepoAInput('expressjs/express'); setRepoBInput('fastify/fastify'); }}
            className="px-2.5 py-1 bg-white border border-[#2A2E38] hover:bg-[#2A2E38] hover:text-[#F7F5EE] transition-colors"
          >
            Express vs Fastify
          </button>
          <button
            onClick={() => { setRepoAInput('pallets/flask'); setRepoBInput('tiangolo/fastapi'); }}
            className="px-2.5 py-1 bg-white border border-[#2A2E38] hover:bg-[#2A2E38] hover:text-[#F7F5EE] transition-colors"
          >
            Flask vs FastAPI
          </button>
          <button
            onClick={() => { setRepoAInput('facebook/react'); setRepoBInput('vuejs/core'); }}
            className="px-2.5 py-1 bg-white border border-[#2A2E38] hover:bg-[#2A2E38] hover:text-[#F7F5EE] transition-colors"
          >
            React vs Vue
          </button>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="bg-[#1E8E5A] text-[#F7F5EE] border-4 border-[#15181F] p-6 shadow-[8px_8px_0px_0px_#15181F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F7F5EE] text-[#1E8E5A] border-2 border-[#15181F] shadow-[2px_2px_0px_0px_#15181F]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#F7F5EE]/80">
                OFFICIAL QUALITY WINNER DECLARED
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display">
                {winner.repoName} ({winner.overallScore.toFixed(2)} / 5.0)
              </h2>
            </div>
          </div>
          <span className="px-4 py-2 bg-[#2A2E38] text-[#F7F5EE] font-mono font-bold text-xs uppercase border-2 border-[#F7F5EE]">
            VERDICT: {winner.verdict}
          </span>
        </div>
      )}

      {/* Side-by-Side Comparison Grid */}
      {reportA && reportB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contender A Card */}
          <div className="bg-white border-4 border-[#2A2E38] p-6 shadow-[8px_8px_0px_0px_#2A2E38] space-y-4">
            <div className="flex items-center justify-between border-b-4 border-[#2A2E38] pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#5A5E6B]">CONTENDER A</span>
                <h3 className="text-2xl font-black font-display text-[#15181F]">{reportA.repoName}</h3>
              </div>
              <VerdictStamp verdict={reportA.verdict} score={reportA.overallScore} />
            </div>

            <div className="text-xs font-mono text-[#15181F]/80 bg-[#2A2E38]/5 p-3 border border-[#2A2E38]/20">
              {reportA.summary}
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="font-bold uppercase text-[#5A5E6B] block">DIMENSION VERDICTS:</span>
              {reportA.dimensions.map(d => (
                <div key={d.key} className="flex items-center justify-between p-2 bg-[#F7F5EE] border border-[#2A2E38]/20">
                  <span className="font-bold">{d.label}</span>
                  <span className={`font-bold ${d.band === 'PASS' ? 'text-[#1E8E5A]' : d.band === 'CAUTION' ? 'text-[#D98E1E]' : 'text-[#C43B3B]'}`}>
                    {d.score.toFixed(1)} / 5.0 ({d.band})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contender B Card */}
          <div className="bg-white border-4 border-[#2A2E38] p-6 shadow-[8px_8px_0px_0px_#2A2E38] space-y-4">
            <div className="flex items-center justify-between border-b-4 border-[#2A2E38] pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#5A5E6B]">CONTENDER B</span>
                <h3 className="text-2xl font-black font-display text-[#15181F]">{reportB.repoName}</h3>
              </div>
              <VerdictStamp verdict={reportB.verdict} score={reportB.overallScore} />
            </div>

            <div className="text-xs font-mono text-[#15181F]/80 bg-[#2A2E38]/5 p-3 border border-[#2A2E38]/20">
              {reportB.summary}
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="font-bold uppercase text-[#5A5E6B] block">DIMENSION VERDICTS:</span>
              {reportB.dimensions.map(d => (
                <div key={d.key} className="flex items-center justify-between p-2 bg-[#F7F5EE] border border-[#2A2E38]/20">
                  <span className="font-bold">{d.label}</span>
                  <span className={`font-bold ${d.band === 'PASS' ? 'text-[#1E8E5A]' : d.band === 'CAUTION' ? 'text-[#D98E1E]' : 'text-[#C43B3B]'}`}>
                    {d.score.toFixed(1)} / 5.0 ({d.band})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
