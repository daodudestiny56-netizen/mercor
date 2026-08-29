export type ScoreBand = 'PASS' | 'CAUTION' | 'HIGH_RISK';

export type DimensionKey =
  | 'architecture_clarity'
  | 'test_coverage_quality'
  | 'dependency_health'
  | 'commit_pr_hygiene'
  | 'documentation_accuracy'
  | 'technical_debt_signals';

export interface EvidenceCitation {
  id: string;
  type: 'file_line' | 'test_result' | 'commit_hash' | 'pr_number' | 'dep_manifest';
  citation: string; // e.g. "[src/index.ts#L42-L58]" or "[tests/test_cli.py::test_seek (PASS)]"
  description: string;
  verified: boolean;
}

export interface DimensionEvaluation {
  key: DimensionKey;
  label: string;
  score: number; // 1.0 to 5.0
  band: ScoreBand;
  evidence: EvidenceCitation[];
  reasoning: string;
  strengths?: string[];
  concerns?: string[];
  highRiskFlag: boolean;
}

export interface AuditReport {
  id: string;
  repoUrl: string;
  repoName: string;
  owner: string;
  evaluatedAt: string;
  agentIteration: 'baseline' | 'iteration_1' | 'iteration_2' | 'iteration_3' | 'iteration_4';
  overallScore: number;
  verdict: ScoreBand;
  dimensions: DimensionEvaluation[];
  summary: string;
  keyFindings: string[];
  notableFiles?: Array<{ path: string; note: string }>;
  citationCount: number;
  totalCheckableEvidence: number;
  executionTimeMs: number;
  isLiveAudit?: boolean;
}

export interface BenchmarkRepoComparison {
  repoName: string;
  repoUrl: string;
  ecosystem: string;
  tierDescription: string;
  isHardCase?: boolean;
  expertTruth: AuditReport;
  baseline: AuditReport;
  iteration1: AuditReport;
  iteration2: AuditReport;
  iteration3: AuditReport;
  iteration4?: AuditReport;
}

export interface BenchmarkMetrics {
  spearmanRankCorrelation: {
    baseline: number;
    iteration1: number;
    iteration2: number;
    iteration3: number;
    iteration4?: number;
  };
  pairwiseAgreementPercentage: {
    baseline: number;
    iteration1: number;
    iteration2: number;
    iteration3: number;
    iteration4?: number;
  };
  reposWithCitedEvidence: {
    baseline: number;
    iteration1: number;
    iteration2: number;
    iteration3: number;
    iteration4?: number;
  };
  highRiskFlagAccuracy: {
    baseline: number;
    iteration1: number;
    iteration2: number;
    iteration3: number;
    iteration4?: number;
  };
}

export interface TrajectoryStep {
  stepIndex: number;
  timestamp: string;
  agentRole: string;
  actionType: 'prompt' | 'tool_call' | 'tool_response' | 'verification_check' | 'retry' | 'verdict_synthesis';
  title: string;
  inputContent?: string;
  toolName?: string;
  toolArgs?: Record<string, unknown>;
  toolResult?: string;
  status: 'SUCCESS' | 'WARNING' | 'RETRY' | 'FAILED';
  evidenceExtracted?: string[];
}

export interface AgentTrajectoryTrace {
  id: string;
  repoName: string;
  iteration: string;
  timestamp: string;
  totalSteps: number;
  retriesEnforced: number;
  steps: TrajectoryStep[];
}
