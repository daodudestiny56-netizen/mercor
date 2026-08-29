import { NextRequest, NextResponse } from 'next/server';
import { runBaselineAgent } from '@/lib/agents/baselineAgent';
import { runIteration1Agent } from '@/lib/agents/iteration1Context';
import { runIteration2Agent } from '@/lib/agents/iteration2Tools';
import { runIteration3Agent } from '@/lib/agents/iteration3Verification';
import { EXPERT_GROUND_TRUTH_DATA } from '@/lib/groundTruthData';
import { checkRepoExists } from '@/lib/tools/repoFetcher';
import { getCachedLiveAudit, setCachedLiveAudit } from '@/lib/liveAuditCache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoUrl, iteration = 'iteration_3' } = body;

    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required.' }, { status: 400 });
    }

    const cleanUrl = repoUrl.trim().replace(/\/$/, '');
    const parts = cleanUrl.split('github.com/');
    const repoSlug = parts.length > 1 ? parts[1] : cleanUrl;
    const supportedRepos = Object.keys(EXPERT_GROUND_TRUTH_DATA);

    // Tier 1: Benchmarked Repository (One of the 10)
    if (EXPERT_GROUND_TRUTH_DATA[repoSlug]) {
      let report;
      if (iteration === 'baseline') {
        report = await runBaselineAgent(repoSlug);
      } else if (iteration === 'iteration_1') {
        report = await runIteration1Agent(repoSlug);
      } else if (iteration === 'iteration_2') {
        report = await runIteration2Agent(repoSlug);
      } else {
        report = await runIteration3Agent(repoSlug);
      }
      return NextResponse.json({ report: { ...report, isLiveAudit: false }, isLiveAudit: false });
    }

    // Tier 2: Arbitrary Public Repository — Validate Existence First via GitHub API
    const repoExists = await checkRepoExists(repoSlug);
    if (!repoExists) {
      return NextResponse.json({
        notAudited: true,
        notFound: true,
        error: 'REPO_NOT_FOUND',
        message: `Repository "${repoSlug}" was not found on GitHub. Please check the repository name or select one of our 10 benchmarked repositories.`,
        requestedRepo: repoSlug,
        supportedRepos,
      }, { status: 404 });
    }

    // Check In-Memory / Persistent Cache
    const cachedReport = getCachedLiveAudit(repoSlug, iteration);
    if (cachedReport) {
      return NextResponse.json({ report: { ...cachedReport, isLiveAudit: true }, isLiveAudit: true });
    }

    // Run Full Live Agent Pipeline for requested iteration (default: iteration 3 verified)
    let liveReport;
    if (iteration === 'baseline') {
      liveReport = await runBaselineAgent(repoSlug);
    } else if (iteration === 'iteration_1') {
      liveReport = await runIteration1Agent(repoSlug);
    } else if (iteration === 'iteration_2') {
      liveReport = await runIteration2Agent(repoSlug);
    } else {
      liveReport = await runIteration3Agent(repoSlug);
    }

    if (!liveReport) {
      return NextResponse.json({
        notAudited: true,
        error: 'AUDIT_FAILED',
        message: `Live audit for "${repoSlug}" could not be completed.`,
        requestedRepo: repoSlug,
        supportedRepos,
      }, { status: 500 });
    }

    const finalReport = {
      ...liveReport,
      isLiveAudit: true,
      summary: `LIVE AUDIT: ${liveReport.summary}`,
    };

    setCachedLiveAudit(repoSlug, iteration, finalReport);

    return NextResponse.json({ report: finalReport, isLiveAudit: true });
  } catch {
    return NextResponse.json({ error: 'Audit execution failed.' }, { status: 500 });
  }
}

export async function GET() {
  const sampleRepos = Object.keys(EXPERT_GROUND_TRUTH_DATA);
  return NextResponse.json({ sampleRepos });
}
