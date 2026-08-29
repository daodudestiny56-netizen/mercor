'use client';

import React from 'react';
import { AuditReport } from '@/lib/types';
import { VerdictStamp } from './VerdictStamp';
import { LedgerLineRow } from './LedgerLineRow';
import { FileCheck, ShieldCheck, Hash, Clock, AlertTriangle } from 'lucide-react';

interface InspectionCertificateProps {
  report: AuditReport;
}

export const InspectionCertificate: React.FC<InspectionCertificateProps> = ({ report }) => {
  return (
    <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-6 md:p-10 shadow-[8px_8px_0px_0px_#2A2E38] relative font-sans text-[#15181F]">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-[#2A2E38] pb-6 mb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#5A5E6B] uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-[#1E8E5A]" />
            {report.isLiveAudit ? 'LIVE ON-DEMAND REPOSITORY AUDIT (NO GROUND-TRUTH COMPARISON)' : 'OFFICIAL BENCHMARKED REPOSITORY QUALITY CERTIFICATE'}
          </div>
          <div className="flex items-center gap-3">
            <h1
              className="text-3xl md:text-5xl font-black tracking-tight text-[#15181F]"
              style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
              {report.repoName}
            </h1>
            {report.isLiveAudit ? (
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase bg-[#D97706] text-white border-2 border-[#2A2E38] shadow-[2px_2px_0px_0px_#2A2E38]">
                LIVE AUDIT
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase bg-[#1E8E5A] text-white border-2 border-[#2A2E38] shadow-[2px_2px_0px_0px_#2A2E38]">
                BENCHMARKED
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5A5E6B] mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> AUDITED: {new Date(report.evaluatedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" /> AGENT ENGINE: {report.agentIteration.toUpperCase()}
            </span>
            <span className="flex items-center gap-1">
              <Hash className="w-3.5 h-3.5" /> EVIDENCE CITATIONS: {report.citationCount}
            </span>
          </div>
        </div>

        {/* Signature Rotated Stamp Badge */}
        <div className="self-end md:self-auto pt-2">
          <VerdictStamp verdict={report.verdict} score={report.overallScore} />
        </div>
      </div>

      {/* Deadpan Inspector Summary Box */}
      <div className="bg-[#2A2E38]/5 border-2 border-[#2A2E38] p-4 mb-8">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5E6B] mb-1">
          EXECUTIVE INSPECTOR SUMMARY
        </h3>
        <p className="text-base font-semibold text-[#15181F] leading-relaxed">
          {report.summary}
        </p>
      </div>

      {/* Key Findings Trace */}
      {report.keyFindings && report.keyFindings.length > 0 && (
        <div className="mb-8 border-2 border-[#2A2E38] bg-white p-5 shadow-[4px_4px_0px_0px_#2A2E38]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#15181F] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
            <AlertTriangle className="w-4 h-4 text-[#D98E1E]" />
            KEY DISCOVERED EVIDENCE & CRITICAL FINDINGS
          </h3>
          <ul className="space-y-2 text-sm text-[#15181F]">
            {report.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#5A5E6B]">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ledger Lines Header */}
      <div className="flex items-center justify-between border-b-2 border-[#2A2E38] pb-2 mb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5E6B]">
          RUBRIC AUDIT DIMENSIONS (LINE-ITEM EVIDENCE VERDICT)
        </span>
        <span className="text-xs font-mono text-[#5A5E6B]">
          EVERY CLAIM TRACEABLE TO FILE / TEST / COMMIT
        </span>
      </div>

      {/* 6 Rubric Dimension Ledger Line Rows */}
      <div className="space-y-1 mb-8">
        {report.dimensions.map(dim => (
          <LedgerLineRow key={dim.key} dimension={dim} />
        ))}
      </div>

      {/* Certificate Footer */}
      <div className="border-t-4 border-[#2A2E38] pt-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-[#5A5E6B] gap-2">
        <span>CERTIFICATE ID: {report.id}</span>
        <span>BENCHMARKED AGAINST REAL EXPERT GROUND TRUTH AUDITS</span>
        <span>REPO QUALITY REVIEWER v1.0</span>
      </div>
    </div>
  );
};
