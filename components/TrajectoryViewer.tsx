'use client';

import React, { useState } from 'react';
import { TrajectoryStep } from '@/lib/types';
import { Terminal, CheckCircle2, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

interface TrajectoryViewerProps {
  repoName: string;
  steps: TrajectoryStep[];
}

export const TrajectoryViewer: React.FC<TrajectoryViewerProps> = ({ repoName, steps }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const currentStep = steps[selectedStepIndex] || steps[0];

  return (
  return (
    <div className="w-full bg-[#F7F5EE] border-4 border-[#2A2E38] p-4 sm:p-6 shadow-[4px_4px_0px_0px_#2A2E38] sm:shadow-[8px_8px_0px_0px_#2A2E38] font-sans my-4 sm:my-8 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-[#2A2E38] pb-4 mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold text-[#5A5E6B] uppercase">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E8E5A] shrink-0" />
            <span>AGENT TRAJECTORY & TOOL EXECUTION TRACE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#15181F] mt-0.5" style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}>
            Trajectory Log: {repoName}
          </h3>
        </div>
        <div className="text-[11px] sm:text-xs font-mono bg-[#2A2E38] text-[#F7F5EE] px-2.5 py-1 sm:px-3 sm:py-1.5 font-bold shrink-0">
          TOTAL STEPS: {steps.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Step Selector List */}
        <div className="space-y-2 max-h-[300px] sm:max-h-[420px] overflow-y-auto border-2 border-[#2A2E38] p-1.5 sm:p-2 bg-white">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStepIndex(idx)}
              className={`w-full text-left p-2.5 sm:p-3 border-2 transition-all duration-150 flex items-center justify-between gap-2 ${
                selectedStepIndex === idx
                  ? 'border-[#2A2E38] bg-[#2A2E38] text-[#F7F5EE] shadow-[2px_2px_0px_0px_#15181F]'
                  : 'border-[#2A2E38]/30 bg-[#F7F5EE] text-[#15181F] hover:border-[#2A2E38]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase opacity-80">
                  STEP {s.stepIndex} — {s.actionType.toUpperCase()}
                </div>
                <div className="text-xs font-bold truncate max-w-full">
                  {s.title}
                </div>
              </div>
              <div className="shrink-0">
                {s.status === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />}
                {s.status === 'RETRY' && <RefreshCw className="w-4 h-4 text-[#D98E1E]" />}
                {s.status === 'FAILED' && <AlertCircle className="w-4 h-4 text-[#C43B3B]" />}
              </div>
            </button>
          ))}
        </div>

        {/* Step Detail View */}
        <div className="md:col-span-2 border-2 border-[#2A2E38] bg-[#15181F] text-[#F7F5EE] p-3.5 sm:p-5 shadow-[4px_4px_0px_0px_#2A2E38] font-mono text-[11px] sm:text-xs overflow-x-auto max-w-full">
          <div className="flex items-center justify-between border-b border-[#2A2E38] pb-3 mb-4 text-[#5A5E6B]">
            <span className="flex items-center gap-2 font-bold text-[#F7F5EE]">
              <Terminal className="w-4 h-4 text-[#1E8E5A]" />
              STEP {currentStep.stepIndex}: {currentStep.title}
            </span>
            <span className="text-[11px]">{currentStep.timestamp}</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[#5A5E6B] font-bold block mb-1">AGENT ROLE:</span>
              <span className="text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 border border-[#1E8E5A]/30">
                {currentStep.agentRole}
              </span>
            </div>

            {currentStep.inputContent && (
              <div>
                <span className="text-[#5A5E6B] font-bold block mb-1">PROMPT INSTRUCTIONS / CONTEXT:</span>
                <div className="bg-[#2A2E38]/50 p-3 text-[#F7F5EE] border border-[#2A2E38]">
                  {currentStep.inputContent}
                </div>
              </div>
            )}

            {currentStep.toolName && (
              <div>
                <span className="text-[#5A5E6B] font-bold block mb-1">TOOL INVOCATION:</span>
                <div className="bg-[#2A2E38]/80 p-3 text-[#D98E1E] border border-[#2A2E38]">
                  {currentStep.toolName}({JSON.stringify(currentStep.toolArgs || {})})
                </div>
              </div>
            )}

            {currentStep.toolResult && (
              <div>
                <span className="text-[#5A5E6B] font-bold block mb-1">TOOL RESPONSE / EVIDENCE EXTRACTED:</span>
                <div className="bg-[#2A2E38]/50 p-3 text-[#1E8E5A] border border-[#2A2E38] max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {currentStep.toolResult}
                </div>
              </div>
            )}

            {currentStep.evidenceExtracted && currentStep.evidenceExtracted.length > 0 && (
              <div>
                <span className="text-[#5A5E6B] font-bold block mb-1">EXTRACTED EVIDENCE CITATIONS:</span>
                <div className="flex flex-wrap gap-2">
                  {currentStep.evidenceExtracted.map((ev, idx) => (
                    <span key={idx} className="bg-[#D98E1E]/20 text-[#D98E1E] border border-[#D98E1E]/40 px-2 py-0.5 font-bold">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
