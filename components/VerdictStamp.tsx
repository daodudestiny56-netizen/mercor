'use client';

import React from 'react';
import { ScoreBand } from '@/lib/types';

interface VerdictStampProps {
  verdict: ScoreBand;
  score: number;
}

export const VerdictStamp: React.FC<VerdictStampProps> = ({ verdict, score }) => {
  let badgeColor = 'bg-[#1E8E5A]/10 text-[#1E8E5A] border-[#1E8E5A]';
  let label = 'VERIFIED PASS';

  if (verdict === 'CAUTION') {
    badgeColor = 'bg-[#D98E1E]/10 text-[#D98E1E] border-[#D98E1E]';
    label = 'CAUTION — TECHNICAL DEBT';
  } else if (verdict === 'HIGH_RISK') {
    badgeColor = 'bg-[#C43B3B]/10 text-[#C43B3B] border-[#C43B3B]';
    label = 'HIGH RISK — AUDIT FAIL';
  }

  return (
    <div
      className={`inline-block transform -rotate-5 transition-transform duration-200 hover:rotate-0 select-none border-4 px-6 py-3 shadow-[4px_4px_0px_0px_#2A2E38] ${badgeColor}`}
      style={{
        fontFamily: 'var(--font-bricolage), sans-serif',
      }}
    >
      <div className="text-xs uppercase tracking-widest font-bold opacity-80">INSPECTION SEAL</div>
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase leading-none my-1">
        {label}
      </div>
      <div className="text-sm font-semibold tracking-wide font-mono">
        SCORE: {score.toFixed(2)} / 5.00
      </div>
    </div>
  );
};
