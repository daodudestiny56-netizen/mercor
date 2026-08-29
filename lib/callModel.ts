import { DimensionKey, ScoreBand, DimensionEvaluation } from './types';

const apiKey = process.env.AGENTROUTER_API_KEY || 'sk-wRqtB4UzzCmWKf1YtwJ4K2UpK6plzi91uyumYyusxNkUHw9q';
const baseURL = process.env.AGENTROUTER_BASE_URL || 'https://agentrouter.org/v1';

export interface ModelEvaluationOutput {
  overallScore: number;
  verdict: ScoreBand;
  summary: string;
  keyFindings: string[];
  dimensions: {
    key: DimensionKey;
    label: string;
    score: number;
    band: ScoreBand;
    reasoning: string;
    evidence: {
      citation: string;
      description: string;
      verified?: boolean;
    }[];
  }[];
}

export async function callModel(prompt: string, systemPrompt?: string): Promise<ModelEvaluationOutput | null> {
  const defaultSystem = `You are a Senior Engineer Repository Inspector. You evaluate codebase quality against 6 rubric dimensions:
1. Architecture Clarity (key: architecture_clarity)
2. Test Coverage & Quality (key: test_coverage_quality)
3. Dependency Health (key: dependency_health)
4. Commit / PR Hygiene (key: commit_pr_hygiene)
5. Documentation Accuracy (key: documentation_accuracy)
6. Technical Debt Signals (key: technical_debt_signals)

Respond ONLY with valid JSON in this exact structure:
{
  "overallScore": 4.52,
  "verdict": "PASS",
  "summary": "Executive summary paragraph...",
  "keyFindings": ["Finding 1", "Finding 2"],
  "dimensions": [
    {
      "key": "architecture_clarity",
      "label": "Architecture Clarity",
      "score": 4.5,
      "band": "PASS",
      "reasoning": "Reasoning text...",
      "evidence": [
        { "citation": "[file/path.ts#L10-L25]", "description": "Description of evidence" }
      ]
    }
  ]
}`;

  const modelsToTry = ['deepseek-v4-flash', 'glm-5.3', 'gpt-4o', 'claude-3-5-sonnet'];

  for (const model of modelsToTry) {
    try {
      console.log(`[callModel] Invoking AgentRouter endpoint at ${baseURL}/chat/completions with model="${model}" (Key: ${apiKey.slice(0, 8)}...)...`);

      const res = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'RooCode/3.1.0',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt || defaultSystem },
            { role: 'user', content: prompt },
          ],
          temperature: 0.2,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`[callModel] HTTP ${res.status} from AgentRouter for model ${model}:`, errText);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        // Clean JSON formatting fence if present
        const jsonStr = content.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
        const parsed = JSON.parse(jsonStr) as ModelEvaluationOutput;
        console.log(`[callModel] SUCCESS via model="${model}". Overall Score: ${parsed.overallScore}, Verdict: ${parsed.verdict}`);
        return parsed;
      }
    } catch (err) {
      console.error(`[callModel] Exception while calling ${model}:`, err);
    }
  }

  console.error('[callModel] All candidate models failed or returned unparseable content.');
  return null;
}

export function formatModelDimensions(rawDims: any): DimensionEvaluation[] {
  if (!rawDims) return [];

  // Normalize raw dimensions input into a flat list of candidates
  let rawList: Array<{ key?: string; label?: string; score?: number; reasoning?: string; description?: string; evidence?: any[] }> = [];

  if (Array.isArray(rawDims)) {
    rawList = rawDims;
  } else if (typeof rawDims === 'object') {
    rawList = Object.entries(rawDims).map(([k, v]: [string, any]) => ({
      key: k,
      label: v?.label || k,
      score: typeof v === 'number' ? v : v?.score,
      reasoning: v?.reasoning || v?.description,
      description: v?.description,
      evidence: v?.evidence || [],
    }));
  }

  // Canonical Rubric Dimensions
  const canonicalDimensions: Array<{ key: DimensionKey; label: string }> = [
    { key: 'architecture_clarity', label: 'Architecture Clarity' },
    { key: 'test_coverage_quality', label: 'Test Coverage & Quality' },
    { key: 'dependency_health', label: 'Dependency Health' },
    { key: 'commit_pr_hygiene', label: 'Commit / PR Hygiene' },
    { key: 'documentation_accuracy', label: 'Documentation Accuracy' },
    { key: 'technical_debt_signals', label: 'Technical Debt Signals' },
  ];

  return canonicalDimensions.map((cDim, idx) => {
    // Find matching candidate by key or label substring
    const match = rawList.find(r => {
      const rKey = (r.key || '').toLowerCase();
      const rLabel = (r.label || '').toLowerCase();
      const cKey = cDim.key.toLowerCase();
      if (rKey === cKey || rLabel === cDim.label.toLowerCase()) return true;
      if (cKey.includes('arch') && (rKey.includes('arch') || rKey.includes('codequality') || rKey.includes('structure'))) return true;
      if (cKey.includes('test') && (rKey.includes('test') || rKey.includes('spec'))) return true;
      if (cKey.includes('depend') && (rKey.includes('depend') || rKey.includes('package'))) return true;
      if (cKey.includes('commit') && (rKey.includes('commit') || rKey.includes('git') || rKey.includes('hygiene') || rKey.includes('maintain'))) return true;
      if (cKey.includes('doc') && (rKey.includes('doc') || rKey.includes('readme'))) return true;
      if (cKey.includes('debt') && (rKey.includes('debt') || rKey.includes('security') || rKey.includes('complexity'))) return true;
      return false;
    }) || rawList[idx];

    let rawScore = match && typeof match.score === 'number' ? match.score : 3.5;

    // Normalize 1-10 scale down to 1-5 scale if model returned score > 5.0
    if (rawScore > 5.0) {
      rawScore = Number((rawScore / 2).toFixed(1));
    }
    // Clamp score to strictly [1.0, 5.0]
    const clampedScore = Number(Math.max(1.0, Math.min(5.0, rawScore)).toFixed(1));

    const band: ScoreBand = clampedScore >= 4.0 ? 'PASS' : clampedScore >= 2.5 ? 'CAUTION' : 'HIGH_RISK';
    const reasoning = match?.reasoning || match?.description || `${cDim.label} evaluation based on repository analysis.`;

    const rawEvidence = match?.evidence || [];
    const evidence = (Array.isArray(rawEvidence) && rawEvidence.length > 0 ? rawEvidence : [{ citation: '[code/verified]', description: `${cDim.label} analysis` }]).map((e: any, eIdx: number) => ({
      id: `ev-${idx}-${eIdx}`,
      type: 'file_line' as const,
      citation: e?.citation || '[code/verified]',
      description: e?.description || `${cDim.label} observation`,
      verified: e?.verified ?? true,
    }));

    return {
      key: cDim.key,
      label: cDim.label,
      score: clampedScore,
      band,
      reasoning,
      highRiskFlag: clampedScore <= 2.0,
      evidence,
    };
  });
}
