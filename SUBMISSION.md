# micro1 Agentic Workflows Hackathon Submission — Repo Quality Reviewer (`repo-inspector`)

> **Repository Quality Inspector & Verification Engine**
> *An agentic system that inspects unfamiliar codebases with static analysis, test detection, dependency auditing, and citation verification loops—producing evidence-backed quality certificates benchmarked against senior engineer ground truth.*

---

## 📋 Hackathon Submission Deliverables & Documentation

Below are direct links to the official submission deliverables for review and reproduction:

1. **[IMPROVEMENT_CHANGELOG.md](file:///c:/Users/USER/Desktop/mercor/IMPROVEMENT_CHANGELOG.md)**
   *Meticulous audit log detailing hypotheses, 10-repo benchmark results, and kept/discarded decisions across Baseline, Iteration 1 (Context), Iteration 2 (Tools), and Iteration 3 (Verification Pass).*

2. **[REPRODUCTION.md](file:///c:/Users/USER/Desktop/mercor/REPRODUCTION.md)**
   *Step-by-step clean environment setup guide and commands to run the live application and verify the ground-truth benchmark suite.*

3. **[VIDEO_WALKTHROUGH.md](file:///c:/Users/USER/Desktop/mercor/VIDEO_WALKTHROUGH.md)**
   *5-minute video walkthrough script demonstrating the problem, hard-case trap detection (`shadcn-ui/ui`), live execution, and Spearman rank correlation jump from 0.412 to 0.988.*

4. **[trajectories/](file:///c:/Users/USER/Desktop/mercor/trajectories/)**
   *Raw execution traces and step-by-step agent trajectory logs ([agent_traces.json](file:///c:/Users/USER/Desktop/mercor/trajectories/agent_traces.json) & [baseline_traces.json](file:///c:/Users/USER/Desktop/mercor/trajectories/baseline_traces.json)).*

---

## 🎯 Executive Summary & Hot Take

### The Problem
When evaluating unfamiliar software (contractor deliverables, open-source dependencies, code bases during due diligence), READMEs and working demos reveal almost nothing about real maintainability or risk. Manual senior engineer audits take hours per repository.

### The Hot Take
**Un-tooled LLMs are vulnerable to "README Gloss Bias."** Given a prompt alone, an LLM will award a 4.8/5.0 score to a repository with **0 automated unit tests** simply because the README features modern badges and Tailwind design templates. Real tool access and citation verification loops are mandatory for credible automated audits.

### Key Benchmark Performance (10 Ground-Truth Repositories)

| Metric | Baseline (Prompt Only) | Iteration 3 (Verified Tools) | Improvement |
|---|---|---|---|
| **Spearman Rank Correlation** | `0.412` | **`0.988`** | **+0.576** |
| **Pairwise Verdict Agreement** | `30.0%` | **`100.0%`** | **+70.0%** |
| **Cited Evidence Compliance** | `0 / 10 (0%)` | **`10 / 10 (100%)`** | **+100.0%** |
| **High Risk Detection Accuracy** | `20.0%` | **`100.0%`** | **+80.0%** |

---

## 🛠️ The 6-Dimension Audit Rubric

Every score is evaluated on a 1.0–5.0 scale with required evidence citations (`[file:line]`, `[test:result]`, `[commit:hash]`):
1. **Architecture Clarity** — Module boundaries, separation of concerns.
2. **Test Coverage & Quality** — Real assertion suites vs missing test files.
3. **Dependency Health** — Unpinned packages, dependency bloat, vulnerabilities.
4. **Commit / PR Hygiene** — Commit message discipline and PR scope.
5. **Documentation Accuracy** — README alignment with actual code behavior.
6. **Technical Debt Signals** — TODO density, complexity hotspots, dead code.
