'use client';

import React, { useState } from 'react';
import { TrajectoryViewer } from '@/components/TrajectoryViewer';
import { TrajectoryStep } from '@/lib/types';
import { Layers } from 'lucide-react';

const SAMPLE_TRAJECTORIES: Record<string, TrajectoryStep[]> = {
  'shadcn-ui/ui (Hard Case)': [
    {
      stepIndex: 1,
      timestamp: '2026-08-28T22:01:00Z',
      agentRole: 'Inspector Pipeline Orchestrator',
      actionType: 'prompt',
      title: 'Initialize 6-Dimension Rubric Audit',
      inputContent: 'Inspect repository https://github.com/shadcn-ui/ui against 6 rubric dimensions: Architecture Clarity, Test Coverage & Quality, Dependency Health, Commit/PR Hygiene, Documentation Accuracy, and Technical Debt Signals.',
      status: 'SUCCESS',
    },
    {
      stepIndex: 2,
      timestamp: '2026-08-28T22:01:05Z',
      agentRole: 'Repo Structure & Package Inspector',
      actionType: 'tool_call',
      title: 'Tool Call: fetchRepoMetadata & packageInspector',
      toolName: 'repoFetcher',
      toolArgs: { repoUrl: 'https://github.com/shadcn-ui/ui' },
      toolResult: 'Found package.json, pnpm-workspace.yaml, apps/www, packages/cli, vitest.config.ts. Stars: 122,418.',
      status: 'SUCCESS',
      evidenceExtracted: ['[pnpm-workspace.yaml]', '[packages/cli/src/index.ts#L1-L120]'],
    },
    {
      stepIndex: 3,
      timestamp: '2026-08-28T22:01:12Z',
      agentRole: 'Test Suite & Coverage Inspector',
      actionType: 'tool_call',
      title: 'Tool Call: testDetector & vitest.config Scanner',
      toolName: 'testDetector',
      toolArgs: { path: 'apps/www/ui' },
      toolResult: 'WARNING: Found vitest.config.ts in root, but apps/www UI component templates contain 0 unit test files (.test.tsx or .spec.tsx).',
      status: 'WARNING',
      evidenceExtracted: ['[vitest.config.ts]', '[apps/www/ui/]'],
    },
    {
      stepIndex: 4,
      timestamp: '2026-08-28T22:01:20Z',
      agentRole: 'Evidence Citation Auditor (Iteration 3 Verification Pass)',
      actionType: 'verification_check',
      title: 'Audit Pass: Verify Score & Citation Consistency',
      inputContent: 'Checking if Test Coverage score (1.8/5.0) includes verified checkable citation [vitest.config.ts].',
      toolResult: 'Verification PASSED. Evidence citation [vitest.config.ts] verified. Score 1.8 <= 2.0 triggers CAUTION verdict override per rubric rules.',
      status: 'SUCCESS',
      evidenceExtracted: ['[vitest.config.ts]'],
    },
    {
      stepIndex: 5,
      timestamp: '2026-08-28T22:01:25Z',
      agentRole: 'Synthesis Engine',
      actionType: 'verdict_synthesis',
      title: 'Final Certificate Seal Generation',
      inputContent: 'Generate overall verdict stamp for shadcn-ui/ui.',
      toolResult: 'Overall Score: 3.72 / 5.0. Final Verdict: CAUTION (Triggered by Test Coverage <= 2.0). Stamped seal generated.',
      status: 'SUCCESS',
    },
  ],

  'pallets/flask (Pass Example)': [
    {
      stepIndex: 1,
      timestamp: '2026-08-28T22:05:00Z',
      agentRole: 'Inspector Pipeline Orchestrator',
      actionType: 'prompt',
      title: 'Initialize 6-Dimension Rubric Audit',
      inputContent: 'Inspect repository https://github.com/pallets/flask against 6 rubric dimensions.',
      status: 'SUCCESS',
    },
    {
      stepIndex: 2,
      timestamp: '2026-08-28T22:05:04Z',
      agentRole: 'Test Suite & Coverage Inspector',
      actionType: 'tool_call',
      title: 'Tool Call: testDetector (Pytest Scanner)',
      toolName: 'testDetector',
      toolArgs: { path: 'tests/' },
      toolResult: 'Found 100% pytest test suite in tests/ exercising CLI, routes, and WSGI context.',
      status: 'SUCCESS',
      evidenceExtracted: ['[tests/test_basic.py::test_options (PASS)]'],
    },
    {
      stepIndex: 3,
      timestamp: '2026-08-28T22:05:10Z',
      agentRole: 'Dependency Health Inspector',
      actionType: 'tool_call',
      title: 'Tool Call: dependencyInspector (uv.lock Scanner)',
      toolName: 'dependencyInspector',
      toolArgs: { path: 'uv.lock' },
      toolResult: 'Strict version locking via uv.lock; minimal core dependency footprint (Werkzeug, Jinja2, Click).',
      status: 'SUCCESS',
      evidenceExtracted: ['[uv.lock#L1-L150]'],
    },
    {
      stepIndex: 4,
      timestamp: '2026-08-28T22:05:15Z',
      agentRole: 'Evidence Citation Auditor (Iteration 3 Verification Pass)',
      actionType: 'verification_check',
      title: 'Audit Pass: Verify Citation Enforcement',
      toolResult: 'All 6 dimensions have checkable citations [src/flask/app.py#L45-L120], [tests/test_basic.py], [uv.lock#L1-L150], [commit: d318b68], [README.md#L1-L50].',
      status: 'SUCCESS',
    },
    {
      stepIndex: 5,
      timestamp: '2026-08-28T22:05:18Z',
      agentRole: 'Synthesis Engine',
      actionType: 'verdict_synthesis',
      title: 'Final Certificate Seal Generation',
      toolResult: 'Overall Score: 4.73 / 5.0. Final Verdict: VERIFIED PASS.',
      status: 'SUCCESS',
    },
  ],
};

export default function TrajectoriesPage() {
  const [selectedTrajectory, setSelectedTrajectory] = useState<string>('shadcn-ui/ui (Hard Case)');

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="bg-[#2A2E38] text-[#F7F5EE] border-4 border-[#15181F] p-6 md:p-8 shadow-[8px_8px_0px_0px_#15181F]">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E8E5A] bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 px-2.5 py-1 mb-2">
          <Layers className="w-4 h-4" />
          AGENT TRAJECTORY INSPECTOR
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
          Step-by-Step Agent Execution Traces
        </h1>
        <p className="text-sm md:text-base text-[#F7F5EE]/80 mt-2 max-w-3xl">
          Complete, transparent step logs demonstrating instructions → tool invocations → evidence extraction → verification retry passes → final certificate synthesis for full audit transparency.
        </p>
      </div>

      {/* Select Trajectory */}
      <div className="flex gap-3 font-mono text-xs font-bold">
        {Object.keys(SAMPLE_TRAJECTORIES).map(key => (
          <button
            key={key}
            onClick={() => setSelectedTrajectory(key)}
            className={`px-4 py-2 border-2 transition-all shadow-[2px_2px_0px_0px_#2A2E38] ${
              selectedTrajectory === key
                ? 'bg-[#2A2E38] text-[#F7F5EE] border-[#15181F]'
                : 'bg-white text-[#15181F] border-[#2A2E38] hover:bg-[#2A2E38]/10'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Trajectory Viewer */}
      <TrajectoryViewer
        repoName={selectedTrajectory}
        steps={SAMPLE_TRAJECTORIES[selectedTrajectory]}
      />
    </div>
  );
}
