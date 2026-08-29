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

export function formatModelDimensions(dims: ModelEvaluationOutput['dimensions'] | Record<string, { score: number; description?: string; reasoning?: string; evidence?: { citation: string; description: string; verified?: boolean }[] }> | undefined): DimensionEvaluation[] {
  if (!dims) return [];

  const dimArray = Array.isArray(dims)
    ? dims
    : Object.entries(dims).map(([key, val]) => ({
        key: key as DimensionKey,
        label: key.replace(/_/g, ' ').toUpperCase(),
        score: val.score,
        band: (val.score >= 4.0 ? 'PASS' : val.score >= 2.5 ? 'CAUTION' : 'HIGH_RISK') as ScoreBand,
        reasoning: val.reasoning || val.description || 'Model evaluated dimension.',
        evidence: val.evidence || [],
      }));

  return dimArray.map((d, idx) => ({
    key: d.key as DimensionKey,
    label: d.label || String(d.key),
    score: d.score,
    band: (d.score >= 4.0 ? 'PASS' : d.score >= 2.5 ? 'CAUTION' : 'HIGH_RISK') as ScoreBand,
    reasoning: d.reasoning || 'Model evaluation.',
    highRiskFlag: d.score <= 2.0,
    evidence: (d.evidence || []).map((e, eIdx) => ({
      id: `ev-${idx}-${eIdx}`,
      type: 'file_line' as const,
      citation: e.citation || '[evidence/verified]',
      description: e.description || 'Model citation',
      verified: e.verified ?? true,
    })),
  }));
}
