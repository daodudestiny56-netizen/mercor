'use client';

import React from 'react';
import { DimensionEvaluation } from '@/lib/types';

interface LedgerLineRowProps {
  dimension: DimensionEvaluation;
}

export const LedgerLineRow: React.FC<LedgerLineRowProps> = ({ dimension }) => {
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
          <p className="text-sm text-[#15181F]/80 mt-1 font-sans">
            {dimension.reasoning}
          </p>
        </div>

        {primaryEvidence ? (
          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs font-mono font-bold text-[#5A5E6B] bg-[#2A2E38]/10 px-2 py-1 border border-[#2A2E38]/20">
              {primaryEvidence.citation}
            </span>
            <span className="text-[11px] font-mono text-[#5A5E6B] mt-0.5">
              {primaryEvidence.description}
            </span>
          </div>
        ) : (
          <div className="text-xs font-mono text-[#C43B3B] italic">
            [No verified evidence cited]
          </div>
        )}
      </div>
    </div>
  );
};
