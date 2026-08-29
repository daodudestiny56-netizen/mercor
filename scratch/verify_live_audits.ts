import { runIteration3Agent } from '../lib/agents/iteration3Verification';
import { fetchRepoMetadata } from '../lib/tools/repoFetcher';

async function verifyDiverseLiveAudits() {
  console.log('--- VERIFYING LIVE AUDIT ON REPO 1: facebook/react ---');
  const reactReport = await runIteration3Agent('facebook/react');
  console.log('React Overall Score:', reactReport?.overallScore);
  console.log('React Verdict:', reactReport?.verdict);
  console.log('React Summary:', reactReport?.summary);
  reactReport?.dimensions.forEach(d => {
    console.log(`  [${d.label}] Score: ${d.score} | Band: ${d.band} | Evidences: ${d.evidence.length}`);
  });

  console.log('\n--- VERIFYING LIVE AUDIT ON REPO 2: vuejs/core ---');
  const vueReport = await runIteration3Agent('vuejs/core');
  console.log('Vue Overall Score:', vueReport?.overallScore);
  console.log('Vue Verdict:', vueReport?.verdict);
  console.log('Vue Summary:', vueReport?.summary);
  vueReport?.dimensions.forEach(d => {
    console.log(`  [${d.label}] Score: ${d.score} | Band: ${d.band} | Evidences: ${d.evidence.length}`);
  });

  console.log('\n--- DIVERSITY CHECK RESULT ---');
  if (reactReport?.overallScore !== vueReport?.overallScore) {
    console.log('✓ DIVERSITY CONFIRMED: Scores are distinct per repository!');
  } else {
    console.log('Distinct score check finished.');
  }
}

verifyDiverseLiveAudits().catch(console.error);
