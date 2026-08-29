'use client';

import React from 'react';
import { DimensionEvaluation } from '@/lib/types';

interface LedgerLineRowProps {
  dimension: DimensionEvaluation;
  onInspectCitation?: (citation: string, description: string) => void;
}

export const LedgerLineRow: React.FC<LedgerLineRowProps> = ({ dimension, onInspectCitation }) => {
  let stripeColor = 'bg-[#1E8E5A]';
  let badgeColor = 'bg-[#1E8E5A]/15 text-[#1E8E5A]';

  if (dimension.band === 'CAUTION') {
    stripeColor = 'bg-[#D98E1E]';
    badgeColor = 'bg-[#D98E1E]/15 text-[#D98E1E]';
  } else if (dimension.band === 'HIGH_RISK') {
    stripeColor = 'bg-[#C43B3B]';
    badgeColor = 'bg-[#C43B3B]/15 text-[#C43B3B]';
  }

  const primaryEvidence = dimension.evidence[0];

  return (
    <div className="relative border-t-2 border-[#2A2E38] py-4 px-4 bg-white/50 hover:bg-white transition-colors duration-150 my-1">
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${stripeColor}`} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pl-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-bold text-[#15181F]" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
              {dimension.label}
            </h4>
            <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase tracking-wider font-mono ${badgeColor}`}>
              {dimension.score.toFixed(1)} / 5.0 — {dimension.band.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-[#15181F]/80 mt-1 font-sans break-words leading-relaxed">
            {dimension.reasoning}
          </p>

          {/* Strengths & Concerns Breakdown */}
          {((dimension.strengths && dimension.strengths.length > 0) || (dimension.concerns && dimension.concerns.length > 0)) && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {dimension.strengths && dimension.strengths.length > 0 && (
                <div className="bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 p-2 rounded-sm overflow-hidden">
                  <span className="font-bold text-[#1E8E5A] block mb-1">STRENGTHS</span>
                  <ul className="space-y-1 text-[#15181F]/90">
                    {dimension.strengths.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5 break-words">
                        <span className="text-[#1E8E5A] font-bold shrink-0">+</span>
                        <span className="break-words">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dimension.concerns && dimension.concerns.length > 0 && (
                <div className="bg-[#C43B3B]/10 border border-[#C43B3B]/30 p-2 rounded-sm overflow-hidden">
                  <span className="font-bold text-[#C43B3B] block mb-1">CONCERNS</span>
                  <ul className="space-y-1 text-[#15181F]/90">
                    {dimension.concerns.map((c, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5 break-words">
                        <span className="text-[#C43B3B] font-bold shrink-0">-</span>
                        <span className="break-words">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {primaryEvidence ? (
          <div className="flex flex-col items-start md:items-end self-start md:self-auto max-w-full md:max-w-[280px] shrink-0">
            <button
              onClick={() => onInspectCitation && onInspectCitation(primaryEvidence.citation, primaryEvidence.description)}
              className="text-xs font-mono font-bold text-[#15181F] bg-[#2A2E38]/10 hover:bg-[#1E8E5A] hover:text-white px-2 py-1 border border-[#2A2E38]/30 transition-colors truncate max-w-full block text-left cursor-pointer"
              title="Click to view code citation snippet modal"
            >
              {primaryEvidence.citation}
            </button>
            <span
              className="text-[11px] font-mono text-[#5A5E6B] mt-0.5 truncate max-w-full block"
              title={primaryEvidence.description}
            >
              {primaryEvidence.description}
            </span>
          </div>
        ) : (
          <div className="text-xs font-mono text-[#C43B3B] italic shrink-0">
            [No verified evidence cited]
          </div>
        )}
      </div>
    </div>
  );
};
