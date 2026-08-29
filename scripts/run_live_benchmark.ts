import { generateBenchmarkSuite } from '../lib/evaluationEngine';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('--- STARTING LIVE AGENT BENCHMARK EVALUATION VIA AGENTROUTER (https://agentrouter.org/v1) ---');
  console.log('Evaluating 10 Ground-Truth Repositories across Baseline, Iter 1, Iter 2, and Iter 3...\n');

  const startTime = Date.now();
  const { comparisons, metrics } = await generateBenchmarkSuite();
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n======================================================`);
  console.log(`EMPIRICAL BENCHMARK EVALUATION COMPLETE (${duration}s)`);
  console.log(`======================================================`);
  console.log('Spearman Rank Correlation vs Expert Ground Truth:');
  console.log('  - Baseline Agent:           ', metrics.spearmanRankCorrelation.baseline);
  console.log('  - Iteration 1 (Context):    ', metrics.spearmanRankCorrelation.iteration1);
  console.log('  - Iteration 2 (Tools):      ', metrics.spearmanRankCorrelation.iteration2);
  console.log('  - Iteration 3 (Verified):   ', metrics.spearmanRankCorrelation.iteration3);

  console.log('\nPairwise Verdict Match %:');
  console.log('  - Baseline Agent:           ', metrics.pairwiseAgreementPercentage.baseline, '%');
  console.log('  - Iteration 1 (Context):    ', metrics.pairwiseAgreementPercentage.iteration1, '%');
  console.log('  - Iteration 2 (Tools):      ', metrics.pairwiseAgreementPercentage.iteration2, '%');
  console.log('  - Iteration 3 (Verified):   ', metrics.pairwiseAgreementPercentage.iteration3, '%');

  // Save traces to trajectories directory
  const trajectoriesDir = path.join(__dirname, '../trajectories');

  const agentTraces = comparisons.map(c => ({
    id: `trace-agent-${c.repoName.replace('/', '-')}`,
    repoName: c.repoName,
    iteration: 'iteration_3',
    timestamp: new Date().toISOString(),
    overallScore: c.iteration3.overallScore,
    verdict: c.iteration3.verdict,
    citationCount: c.iteration3.citationCount,
    dimensions: c.iteration3.dimensions,
  }));

  const baselineTraces = comparisons.map(c => ({
    id: `trace-baseline-${c.repoName.replace('/', '-')}`,
    repoName: c.repoName,
    iteration: 'baseline',
    timestamp: new Date().toISOString(),
    overallScore: c.baseline.overallScore,
    verdict: c.baseline.verdict,
    citationCount: 0,
    dimensions: c.baseline.dimensions,
  }));

  fs.writeFileSync(path.join(trajectoriesDir, 'agent_traces.json'), JSON.stringify(agentTraces, null, 2));
  fs.writeFileSync(path.join(trajectoriesDir, 'baseline_traces.json'), JSON.stringify(baselineTraces, null, 2));

  console.log('\n[OK] Live execution traces saved to trajectories/agent_traces.json & trajectories/baseline_traces.json');
}

main().catch(console.error);
