import { DimensionEvaluation, DimensionKey, ScoreBand } from './types';

export const RUBRIC_DIMENSIONS: { key: DimensionKey; label: string; description: string; isCritical: boolean }[] = [
  {
    key: 'architecture_clarity',
    label: 'Architecture Clarity',
    description: 'Separation of concerns, module boundaries, responsibility localization',
    isCritical: true,
  },
  {
    key: 'test_coverage_quality',
    label: 'Test Coverage & Quality',
    description: 'Test suite existence, assertion depth, real logic exercise',
    isCritical: true,
  },
  {
    key: 'dependency_health',
    label: 'Dependency Health',
    description: 'Outdated/vulnerable packages, dependency bloat, version pinning discipline',
    isCritical: false,
  },
  {
    key: 'commit_pr_hygiene',
    label: 'Commit / PR Hygiene',
    description: 'Commit message quality, PR size & focus, pre-merge code review discipline',
    isCritical: false,
  },
  {
    key: 'documentation_accuracy',
    label: 'Documentation Accuracy',
    description: 'README and docs alignment with actual codebase behavior',
    isCritical: false,
  },
  {
    key: 'technical_debt_signals',
    label: 'Technical Debt Signals',
    description: 'TODO/FIXME density, dead code, duplicated logic, complexity hotspots',
    isCritical: false,
  },
];

export function getDimensionBand(score: number): ScoreBand {
  if (score >= 4.0) return 'PASS';
  if (score >= 2.5) return 'CAUTION';
  return 'HIGH_RISK';
}

export function calculateOverallVerdict(dimensions: DimensionEvaluation[]): { overallScore: number; verdict: ScoreBand } {
  if (!dimensions || dimensions.length === 0) {
    return { overallScore: 1.0, verdict: 'HIGH_RISK' };
  }

  const sum = dimensions.reduce((acc, d) => acc + d.score, 0);
  const average = Number((sum / dimensions.length).toFixed(2));

  const archDim = dimensions.find(d => d.key === 'architecture_clarity');
  const testDim = dimensions.find(d => d.key === 'test_coverage_quality');

  const archScore = archDim ? archDim.score : 0;
  const testScore = testDim ? testDim.score : 0;

  const anyDimBelowOrEqualTwo = dimensions.some(d => d.score <= 2.0);
  const anyDimBelowThree = dimensions.some(d => d.score < 3.0);
  const criticalDimAtOrBelowOne = archScore <= 1.0 || testScore <= 1.0;

  let verdict: ScoreBand = 'PASS';

  if (average < 2.5 || criticalDimAtOrBelowOne) {
    verdict = 'HIGH_RISK';
  } else if (average >= 4.0 && !anyDimBelowThree) {
    verdict = 'PASS';
  } else if (average >= 2.5 || anyDimBelowOrEqualTwo) {
    verdict = 'CAUTION';
  } else {
    verdict = 'CAUTION';
  }

  return { overallScore: average, verdict };
}

export function validateDimensionEvidence(dimension: DimensionEvaluation): boolean {
  const hasEvidence = Boolean(dimension.evidence && dimension.evidence.length > 0 && dimension.evidence.every(e => Boolean(e.citation && e.citation.trim().length > 0)));
  
  if (!hasEvidence) {
    dimension.score = Math.min(dimension.score, 2.0);
    dimension.band = 'CAUTION';
    dimension.highRiskFlag = true;
    dimension.reasoning = `[UNVERIFIED - NO EVIDENCE CITED] ${dimension.reasoning}`;
    return false;
  }
  
  return true;
}
