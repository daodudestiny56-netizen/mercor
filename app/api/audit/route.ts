import { NextRequest, NextResponse } from 'next/server';
import { runBaselineAgent } from '@/lib/agents/baselineAgent';
import { runIteration1Agent } from '@/lib/agents/iteration1Context';
import { runIteration2Agent } from '@/lib/agents/iteration2Tools';
import { runIteration3Agent } from '@/lib/agents/iteration3Verification';
import { EXPERT_GROUND_TRUTH_DATA } from '@/lib/groundTruthData';

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

    // PRIORITY 1 FIX: If requested repository is not in the 10 benchmark set, return honest NOT_AUDITED state
    if (!EXPERT_GROUND_TRUTH_DATA[repoSlug]) {
      return NextResponse.json({
        notAudited: true,
        error: 'NOT_AUDITED',
        message: `Repository "${repoSlug}" has not been audited. Currently supporting the 10 benchmarked open-source repositories only.`,
        requestedRepo: repoSlug,
        supportedRepos,
      }, { status: 404 });
    }

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

    if (!report) {
      return NextResponse.json({
        notAudited: true,
        error: 'NOT_AUDITED',
        message: `Repository "${repoSlug}" has not been audited. Currently supporting the 10 benchmarked open-source repositories only.`,
        requestedRepo: repoSlug,
        supportedRepos,
      }, { status: 404 });
    }

    return NextResponse.json({ report });
  } catch {
    return NextResponse.json({ error: 'Audit execution failed.' }, { status: 500 });
  }
}

export async function GET() {
  const sampleRepos = Object.keys(EXPERT_GROUND_TRUTH_DATA);
  return NextResponse.json({ sampleRepos });
}
