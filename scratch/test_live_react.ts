import { runIteration3Agent } from '../lib/agents/iteration3Verification';
import { fetchRepoMetadata } from '../lib/tools/repoFetcher';

async function testReactAudit() {
  console.log('Fetching live metadata for facebook/react from GitHub API...');
  const repoMeta = await fetchRepoMetadata('facebook/react');
  console.log('GitHub API metadata returned:');
  console.log('- Repo Name:', repoMeta.repoName);
  console.log('- Stars:', repoMeta.stars);
  console.log('- Top Files:', repoMeta.fileTree.slice(0, 10));
  console.log('- Recent Commits:', repoMeta.recentCommits);

  console.log('\nRunning Iteration 3 Live Agent Audit on facebook/react...');
  const report = await runIteration3Agent('facebook/react');
  console.log('\n=== LIVE AUDIT REPORT FOR facebook/react ===');
  console.log('Overall Score:', report?.overallScore);
  console.log('Verdict:', report?.verdict);
  console.log('Summary:', report?.summary);
  console.log('Citations Count:', report?.citationCount);
  console.log('\nExtracted Evidence Citations:');
  report?.dimensions.forEach(d => {
    console.log(`\n[${d.label}] Score: ${d.score} | Band: ${d.band}`);
    d.evidence.forEach(e => {
      console.log(`  - Citation: ${e.citation}`);
      console.log(`    Description: ${e.description}`);
      console.log(`    Verified: ${e.verified}`);
    });
  });
}

testReactAudit().catch(console.error);
