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

  const modelsToTry = ['gpt-4o', 'claude-3-5-sonnet', 'gpt-4o-mini'];

  for (const model of modelsToTry) {
    try {
      const res = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'HTTP-Referer': 'https://github.com/daodudestiny56-netizen/mercor',
          'X-Title': 'Repo Quality Reviewer',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt || defaultSystem },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`CallModel error (${res.status}):`, errText);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content) as ModelEvaluationOutput;
        return parsed;
      }
    } catch (err) {
      console.error('CallModel fetch exception:', err);
    }
  }

  return null;
}

export function formatModelDimensions(dims: ModelEvaluationOutput['dimensions']): DimensionEvaluation[] {
  return dims.map((d, idx) => ({
    key: d.key as DimensionKey,
    label: d.label,
    score: d.score,
    band: d.band as ScoreBand,
    reasoning: d.reasoning,
    highRiskFlag: d.score <= 2.0,
    evidence: (d.evidence || []).map((e, eIdx) => ({
      id: `ev-${idx}-${eIdx}`,
      type: 'file_line' as const,
      citation: e.citation,
      description: e.description,
      verified: e.verified ?? false,
    })),
  }));
}
