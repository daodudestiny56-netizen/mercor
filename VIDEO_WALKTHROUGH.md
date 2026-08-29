# 5-MINUTE SOLUTION VIDEO WALKTHROUGH SCRIPT — Repo Quality Reviewer

> **micro1 Agentic Workflows Hackathon Deliverable #3**
> *Timestamp breakdown, demo script, and presentation transcript for the ≤5 minute submission video.*

---

## Video Outline & Timestamp Breakdown (Total: 4m 45s)

| Time | Segment | Focus & Visual Demo | Key Talking Points |
|---|---|---|---|
| **0:00 - 0:45** | **Problem & Bottleneck** | Show Landing Page (`/`) & hero value proposition. | "Evaluating an unfamiliar codebase takes senior engineers hours. A polished README and high star count reveal almost nothing about actual test coverage or technical debt." |
| **0:45 - 1:45** | **Ground Truth Set & Hard Case** | Show 10-repo selection matrix and Baseline Agent result on `shadcn-ui/ui`. | "We established a ground truth set of 10 real public GitHub repos. The naive baseline prompt rated `shadcn-ui/ui` 4.8/5.0 — completely fooled by README gloss while missing a zero-unit-test component gap." |
| **1:45 - 3:00** | **Certificate UI & Inspector** | Live demo of `/inspector` generating an Inspection Certificate. | "Here is the Inspection Certificate design system. Rotated -5° verdict stamp seal, ledger line rows with 2px hard borders, and machine-fact monospace citations. Every score MUST cite file/line, test, or commit evidence." |
| **3:00 - 4:00** | **Benchmark Matrix & Correlation** | Display `/benchmark` matrix & Spearman Rank Correlation jump. | "Comparing baseline against our 3 iterations: Spearman rank correlation jumped from 0.412 to 0.988, with 100% evidence citation compliance across all 10 repos." |
| **4:00 - 4:45** | **Honest Verification & Hot Take** | Live demo of requesting an unaudited repo URL (`/inspector?repo=fake-repo`) showing the "NOT AUDITED" screen. | "A fallback that silently substitutes a cached result for an unrecognized repo is indistinguishable from a real audit until someone checks. Verification loops must confirm 'is this even the right repository,' not just 'is this citation real.'" |

---

## Full Presentation Script Transcript

### 1. Introduction & The Problem (0:00)
> *"Hello judges! Welcome to the presentation for **Repo Quality Reviewer** (`repo-inspector`). Anyone who inherits code, evaluates contractors, or conducts technical due diligence faces a major bottleneck: reading architecture, running test suites, checking dependency health, and spotting technical debt takes hours — and produces inconsistent verdicts between reviewers. READMEs and star counts lie."*

### 2. Ground Truth & The Baseline Flaw (0:45)
> *"To solve this, we built an agent that inspects an unfamiliar codebase the way a senior engineer would. But before writing agent code, we established an empirical ground-truth dataset of 10 real public GitHub repos — spanning excellent frameworks like Flask and Express, to mixed real-world codebases like ArchiveBox, to rough unmaintained repos like public-apis.
>
> *When we ran a naive baseline prompt asking 'Rate the quality of this codebase', it scored Spearman rank correlation of only 0.412. Most critically, it was completely fooled by `shadcn-ui/ui` — assigning it a 4.8/5.0 PASS because of its slick README, completely missing that core UI component templates lacked automated unit test assertions!"*

### 3. The Certificate Design System & Agent Architecture (1:45)
> *"Here is our final solution: **The Inspection Certificate**. Designed like an official certification document, it features a certificate-stock paper theme, a rotated -5° verdict stamp seal, and ledger line rows with 2px borders.
>
> *Every score is strictly governed by a 6-dimension rubric: Architecture Clarity, Test Coverage, Dependency Health, Commit Hygiene, Documentation Accuracy, and Technical Debt. Every claim MUST cite a specific checkable piece of evidence — file path and line number, test result, or commit hash. No evidence, no score."*

### 4. Results & Benchmark Metrics (3:00)
> *"Across our 4 iterations logged in `IMPROVEMENT_CHANGELOG.md`:
> 1. Iteration 1 added explicit rubric context, raising rank correlation to 0.648.
> 2. Iteration 2 granted real tool access to read code, detect test suites, and parse commits — raising correlation to 0.965 and catching the 0-test trap in `shadcn-ui/ui`.
> 3. Iteration 3 added a Verification Auditor Pass that enforces 100% citation coverage, bringing Spearman Rank Correlation to **0.988** and pairwise verdict agreement to **100%**."*

### 5. Hot Take & Conclusion (4:00)
> *"Our key takeaway — or **Hot Take** — comes from a concrete failure mode we caught and fixed:
>
> **'A fallback that silently substitutes a cached result for an unrecognized repo is indistinguishable from a real audit until someone checks—verification needs to confirm is this even the right repository, not just is this individual citation real.'**
>
> Watch what happens when we request an unaudited repository URL: instead of silently serving a fake stamped certificate under a substituted name, the engine displays an honest 'NOT AUDITED' status screen with our 10 supported benchmark repos. Honest, evidence-backed inspection beats fabricated outputs every single time. Thank you!"*
