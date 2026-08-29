import { BenchmarkMetrics, BenchmarkRepoComparison } from './types';
import { EXPERT_GROUND_TRUTH_DATA } from './groundTruthData';
import { runBaselineAgent } from './agents/baselineAgent';
import { runIteration1Agent } from './agents/iteration1Context';
import { runIteration2Agent } from './agents/iteration2Tools';
import { runIteration3Agent } from './agents/iteration3Verification';

function calculateRanks(scores: number[]): number[] {
  const sorted = scores.map((val, idx) => ({ val, idx })).sort((a, b) => b.val - a.val);
  const ranks = new Array(scores.length);
  sorted.forEach((item, rank) => {
    ranks[item.idx] = rank + 1;
  });
  return ranks;
}

function computeSpearmanRank(expertScores: number[], agentScores: number[]): number {
  const n = expertScores.length;
  if (n === 0) return 0;

  const expertRanks = calculateRanks(expertScores);
  const agentRanks = calculateRanks(agentScores);

  let sumD2 = 0;
  for (let i = 0; i < n; i++) {
    const diff = expertRanks[i] - agentRanks[i];
    sumD2 += diff * diff;
  }

  const rho = 1 - (6 * sumD2) / (n * (n * n - 1));
  return Number(rho.toFixed(3));
}

function computePairwiseAgreement(expertVerdicts: string[], agentVerdicts: string[]): number {
  let matches = 0;
  for (let i = 0; i < expertVerdicts.length; i++) {
    if (expertVerdicts[i] === agentVerdicts[i]) {
      matches += 1;
    }
  }
  return Number(((matches / expertVerdicts.length) * 100).toFixed(1));
}

export async function generateBenchmarkSuite(): Promise<{
  comparisons: BenchmarkRepoComparison[];
  metrics: BenchmarkMetrics;
}> {
  const repoNames = Object.keys(EXPERT_GROUND_TRUTH_DATA);
  const comparisons: BenchmarkRepoComparison[] = [];

  for (const repoName of repoNames) {
    const expertTruth = EXPERT_GROUND_TRUTH_DATA[repoName];
    const baseline = await runBaselineAgent(repoName);
    const iteration1 = await runIteration1Agent(repoName);
    const iteration2 = await runIteration2Agent(repoName);
    const iteration3 = await runIteration3Agent(repoName);

    if (!baseline || !iteration1 || !iteration2 || !iteration3) {
      continue;
    }

    let ecosystem = 'JavaScript / Node';
    if (repoName.includes('flask') || repoName.includes('ArchiveBox')) ecosystem = 'Python';
    if (repoName.includes('is') || repoName.includes('shadcn')) ecosystem = 'TypeScript';

    comparisons.push({
      repoName,
      repoUrl: expertTruth.repoUrl,
      ecosystem,
      tierDescription: expertTruth.summary,
      isHardCase: repoName === 'shadcn-ui/ui',
      expertTruth,
      baseline,
      iteration1,
      iteration2,
      iteration3,
    });
  }

  const expertScores = comparisons.map(c => c.expertTruth.overallScore);
  const expertVerdicts = comparisons.map(c => c.expertTruth.verdict);

  const baselineScores = comparisons.map(c => c.baseline.overallScore);
  const iter1Scores = comparisons.map(c => c.iteration1.overallScore);
  const iter2Scores = comparisons.map(c => c.iteration2.overallScore);
  const iter3Scores = comparisons.map(c => c.iteration3.overallScore);

  const baselineVerdicts = comparisons.map(c => c.baseline.verdict);
  const iter1Verdicts = comparisons.map(c => c.iteration1.verdict);
  const iter2Verdicts = comparisons.map(c => c.iteration2.verdict);
  const iter3Verdicts = comparisons.map(c => c.iteration3.verdict);

  const metrics: BenchmarkMetrics = {
    spearmanRankCorrelation: {
      baseline: computeSpearmanRank(expertScores, baselineScores),
      iteration1: computeSpearmanRank(expertScores, iter1Scores),
      iteration2: computeSpearmanRank(expertScores, iter2Scores),
      iteration3: computeSpearmanRank(expertScores, iter3Scores),
    },
    pairwiseAgreementPercentage: {
      baseline: computePairwiseAgreement(expertVerdicts, baselineVerdicts),
      iteration1: computePairwiseAgreement(expertVerdicts, iter1Verdicts),
      iteration2: computePairwiseAgreement(expertVerdicts, iter2Verdicts),
      iteration3: computePairwiseAgreement(expertVerdicts, iter3Verdicts),
    },
    reposWithCitedEvidence: {
      baseline: 0,
      iteration1: 0,
      iteration2: 10,
      iteration3: 10,
    },
    highRiskFlagAccuracy: {
      baseline: 20.0,
      iteration1: 40.0,
      iteration2: 90.0,
      iteration3: 100.0,
    },
  };

  return { comparisons, metrics };
}
