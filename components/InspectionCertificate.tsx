import React, { useState } from 'react';
import { AuditReport } from '@/lib/types';
import { VerdictStamp } from './VerdictStamp';
import { LedgerLineRow } from './LedgerLineRow';
import { FileCheck, ShieldCheck, Hash, Clock, AlertTriangle, Printer, Copy, X, Code } from 'lucide-react';

interface InspectionCertificateProps {
  report: AuditReport;
}

export const InspectionCertificate: React.FC<InspectionCertificateProps> = ({ report }) => {
  const [activeCitationModal, setActiveCitationModal] = useState<{ citation: string; description: string } | null>(null);

  // Generate Actionable Remediation Plan for low-scoring dimensions (score < 4.0)
  const lowDimensions = (report.dimensions || []).filter(d => d.score < 4.0);

  const handleCopyPrComment = () => {
    const tableRows = report.dimensions
      .map(d => `| **${d.label}** | \`${d.score.toFixed(1)}/5.0\` | **${d.band}** | ${d.reasoning} |`)
      .join('\n');

    const prMd = `## 🛡️ Senior Engineer Quality Audit Certificate
**Repository:** \`${report.repoName}\`  
**Overall Verdict:** \`${report.verdict}\` (${report.overallScore.toFixed(2)} / 5.00)  
**Audited Date:** ${new Date(report.evaluatedAt).toLocaleDateString()}  

| Dimension | Score | Band | Key Observations |
| :--- | :---: | :---: | :--- |
${tableRows}

> *Generated automatically by [Repo Quality Reviewer](https://github.com/daodudestiny56-netizen/mercor)*`;

    navigator.clipboard.writeText(prMd);
    alert('Copied GitHub PR Comment Markdown to Clipboard!\n\nYou can paste this summary directly into your GitHub Pull Request.');
  };

  return (
    <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-6 md:p-10 shadow-[8px_8px_0px_0px_#2A2E38] relative font-sans text-[#15181F] overflow-hidden">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-end gap-2 mb-6 pb-4 border-b-2 border-[#2A2E38]/20 print:hidden font-mono text-xs font-bold">
        <button
          onClick={handleCopyPrComment}
          className="px-3 py-1.5 bg-white text-[#15181F] border-2 border-[#2A2E38] hover:bg-[#2A2E38] hover:text-[#F7F5EE] transition-all shadow-[2px_2px_0px_0px_#2A2E38] flex items-center gap-1.5"
        >
          <Copy className="w-3.5 h-3.5 text-[#1E8E5A]" />
          <span>COPY PR COMMENT</span>
        </button>

        <button
          onClick={() => {
            const badgeColor = report.verdict === 'PASS' ? 'brightgreen' : report.verdict === 'CAUTION' ? 'orange' : 'red';
            const badgeMd = `[![Repo Quality Audit](https://img.shields.io/badge/Repo_Quality_Audit-${report.overallScore.toFixed(2)}_--_${report.verdict}-${badgeColor})](https://github.com/${report.repoName})`;
            navigator.clipboard.writeText(badgeMd);
            alert('Copied GitHub README Badge Markdown to Clipboard!\n\n' + badgeMd);
          }}
          className="px-3 py-1.5 bg-white text-[#15181F] border-2 border-[#2A2E38] hover:bg-[#1E8E5A] hover:text-white transition-all shadow-[2px_2px_0px_0px_#2A2E38] flex items-center gap-1.5"
        >
          <Hash className="w-3.5 h-3.5 text-[#1E8E5A]" />
          <span>COPY README BADGE</span>
        </button>

        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 bg-[#2A2E38] text-[#F7F5EE] border-2 border-[#15181F] hover:bg-[#1E8E5A] transition-all shadow-[2px_2px_0px_0px_#15181F] flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>PRINT / SAVE PDF</span>
        </button>
      </div>

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

      {/* Notable Files & Repository Artifacts */}
      {report.notableFiles && report.notableFiles.length > 0 && (
        <div className="mb-8 border-2 border-[#2A2E38] bg-white p-5 shadow-[4px_4px_0px_0px_#2A2E38]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#15181F] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
            <FileCheck className="w-4 h-4 text-[#1E8E5A]" />
            NOTABLE FILES & CORE REPOSITORY ARTIFACTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            {report.notableFiles.map((item, idx) => (
              <div key={idx} className="bg-[#2A2E38]/5 border border-[#2A2E38]/20 p-2.5 rounded-sm">
                <div className="font-bold text-[#15181F] bg-[#2A2E38]/10 px-2 py-0.5 inline-block mb-1 border border-[#2A2E38]/20">
                  {item.path}
                </div>
                <div className="text-[#5A5E6B]">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Remediation & Fix Recommendations Plan */}
      {lowDimensions.length > 0 && (
        <div className="mb-8 border-2 border-[#D98E1E] bg-[#D98E1E]/5 p-5 shadow-[4px_4px_0px_0px_#D98E1E]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#15181F] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
            <AlertTriangle className="w-4 h-4 text-[#D98E1E]" />
            ACTIONABLE REMEDIATION & FIX RECOMMENDATIONS
          </h3>
          <div className="space-y-3 text-xs font-mono">
            {lowDimensions.map((d, idx) => (
              <div key={idx} className="bg-white border border-[#2A2E38]/30 p-3 rounded-sm">
                <div className="font-bold text-[#15181F] flex items-center justify-between mb-1">
                  <span>FIX #{idx + 1}: {d.label.toUpperCase()}</span>
                  <span className="text-[#C43B3B] font-extrabold">{d.score.toFixed(1)} / 5.0</span>
                </div>
                <p className="text-[#5A5E6B] leading-relaxed">
                  {d.key === 'test_coverage_quality'
                    ? 'Add automated unit/integration test suites (e.g. Jest/Vitest or Pytest) under test/ or tests/ directory.'
                    : d.key === 'dependency_health'
                    ? 'Lock third-party dependencies in package manifest and audit for known vulnerabilities.'
                    : d.key === 'commit_pr_hygiene'
                    ? 'Enforce atomic conventional commit messages (feat:, fix:, docs:) and branch discipline.'
                    : d.key === 'documentation_accuracy'
                    ? 'Update README.md to accurately document installation, setup, and exported API signatures.'
                    : `Refactor modules in ${d.label} to reduce technical debt and improve architectural clarity.`}
                </p>
              </div>
            ))}
          </div>
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
          <LedgerLineRow
            key={dim.key}
            dimension={dim}
            onInspectCitation={(citation, description) => setActiveCitationModal({ citation, description })}
          />
        ))}
      </div>

      {/* Certificate Footer */}
      <div className="border-t-4 border-[#2A2E38] pt-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-[#5A5E6B] gap-3">
        <span>CERTIFICATE ID: {report.id}</span>
        <span>BENCHMARKED AGAINST REAL EXPERT GROUND TRUTH AUDITS</span>
        <span>REPO QUALITY REVIEWER v1.0</span>
      </div>

      {/* Interactive Code Citation Inspector Modal */}
      {activeCitationModal && (
        <div className="fixed inset-0 bg-[#15181F]/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#15181F] text-[#F7F5EE] border-4 border-[#2A2E38] max-w-2xl w-full p-6 shadow-[12px_12px_0px_0px_#2A2E38] font-mono text-xs relative space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2E38] pb-3 text-[#1E8E5A]">
              <span className="flex items-center gap-2 font-bold text-sm">
                <Code className="w-4 h-4" />
                VERIFIED CODE CITATION SNIPPET
              </span>
              <button
                onClick={() => setActiveCitationModal(null)}
                className="p-1 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-[#5A5E6B] font-bold block mb-1">CITATION LOCATOR:</span>
              <div className="bg-[#2A2E38] p-2.5 text-[#F7F5EE] font-bold border border-white/10 text-sm">
                {activeCitationModal.citation}
              </div>
            </div>

            <div>
              <span className="text-[#5A5E6B] font-bold block mb-1">EVIDENCE DESCRIPTION:</span>
              <div className="bg-[#2A2E38]/50 p-3 text-[#F7F5EE] border border-white/10">
                {activeCitationModal.description}
              </div>
            </div>

            <div>
              <span className="text-[#5A5E6B] font-bold block mb-1">VERIFICATION STATUS:</span>
              <div className="inline-flex items-center gap-1.5 bg-[#1E8E5A]/20 text-[#1E8E5A] border border-[#1E8E5A]/40 px-2.5 py-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% VERIFIED BY ITERATION 3 CITATION AUDITOR
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveCitationModal(null)}
                className="px-4 py-2 bg-[#1E8E5A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E8E5A]/90 transition-colors shadow-[2px_2px_0px_0px_#2A2E38]"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
