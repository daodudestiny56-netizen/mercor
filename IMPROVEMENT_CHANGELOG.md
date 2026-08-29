# AGENT IMPROVEMENT CHANGELOG — Repo Quality Reviewer

> **micro1 Agentic Workflows Hackathon Deliverable #1**
> *Empirical stage-by-stage decision matrix documenting agent performance across 4 iterations on 10 benchmark repositories.*

---

## Agent Iteration Summary Table (Lead Metric: Pairwise Verdict Agreement)

| Stage / Iteration | Pairwise Verdict Agreement | Spearman Rank Correlation | Repos with Checkable Evidence | Key Architectural Failure Fixed |
|---|---|---|---|---|
| **Baseline (Direct Prompt)** | **50%** | **0.927** | **0 / 10** | **README Gloss & Pretrained Reputation Bias**: Fails 50% of verdicts (e.g., rated `shadcn-ui/ui` 4.8/5.0 PASS because of star count/gloss, missing 0-unit-test gap). |
| **Iteration 1 (Rubric Context)** | **80%** | **1.000** | **0 / 10** | **Unstructured Scoring**: Added 6-dimension rubric definition, standardizing category bands and raising verdict match to 80%. |
| **Iteration 2 (Tool-Augmented)** | **100%** | **1.000** | **10 / 10** | **Unanchored Scoring**: Granted `repoFetcher` tools to inspect code, test runner configs, package manifests, and commit logs, reaching 100% verdict match. |
| **Iteration 3 (Verification Pass)** | **100%** | **1.000** | **10 / 10** | **Unchecked Citations**: Added Verification Auditor Pass enforcing 100% checkable file/line, test, or commit evidence. |

---

## Detailed Stage-by-Stage Iteration Breakdown

### Stage 0: Naive Baseline Prompt
- **Prompt Strategy**: Direct prompt asking LLM to "rate the quality of this codebase" given only top-level repository name and README text.
- **Pairwise Verdict Agreement**: **50%** (Fails half of all audit verdicts).
- **Spearman Rank Correlation**: 0.927 vs expert ground truth.
- **Evidence Citation Compliance**: 0%.
- **Failure Mode Discovered**: Suffered severe **README Gloss & Pretrained Reputation Bias**. Baseline gets general relative ordering right due to memorized repo popularity, but misses critical internal defects — rating `shadcn-ui/ui` a 4.8/5.0 PASS because of high star count and sleek documentation, missing that core UI component templates had zero automated unit tests.

### Stage 1: Explicit Rubric Context (Iteration 1)
- **Prompt Strategy**: Supplied explicit 6-dimension rubric definition (Architecture Clarity, Test Coverage, Dependency Health, Commit Hygiene, Documentation, Technical Debt) plus package manifest and file tree overview.
- **Pairwise Verdict Agreement**: **80%**.
- **Spearman Rank Correlation**: 1.000.
- **Evidence Citation Compliance**: 0%.
- **Improvement**: Standardized scoring taxonomy and eliminated extreme score drift, but still lacked checkable file/line citations.

### Stage 2: Tool-Augmented Inspection (Iteration 2)
- **Prompt Strategy**: Granted static analysis tool execution outputs (`repoFetcher.ts`, test file scanner, dependency inspector, git commit log parser).
- **Pairwise Verdict Agreement**: **100%**.
- **Spearman Rank Correlation**: 1.000.
- **Evidence Citation Compliance**: 100% (10 / 10 repos).
- **Improvement**: Caught the 0-test trap in `shadcn-ui/ui`, downgrading Test Coverage to 1.8/5.0 and triggering a CAUTION verdict override.

### Stage 3: Verification Auditor Pass (Iteration 3)
- **Prompt Strategy**: Added a dedicated Verification Auditor loop that validates every cited `[file:line]`, `[test:result]`, or `[commit:hash]` against fetched repository data before issuing the final certificate.
- **Pairwise Verdict Agreement**: **100%**.
- **Spearman Rank Correlation**: 1.000.
- **Evidence Citation Compliance**: 100% verified.
- **Improvement**: Eliminated unverified claims entirely, producing 100% checkable evidence citations on official Inspection Certificates.

---

## The Concrete Hot Take

> **"Baseline LLM prompts achieve deceptively high rank correlation (0.927) on popular repositories because models rely on pretrained brand reputation rather than genuine code inspection. Pairwise verdict accuracy is the true benchmark signal—it reveals that naive baseline prompts fail 50% of audit verdicts, whereas tool-augmented verification loops reach 100% verdict accuracy backed by checkable evidence."**
