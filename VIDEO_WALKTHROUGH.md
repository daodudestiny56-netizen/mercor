# 5-MINUTE SOLUTION VIDEO WALKTHROUGH SCRIPT — Repo Quality Reviewer

> **micro1 Agentic Workflows Hackathon Deliverable #3**
> *Timestamp breakdown, demo script, and presentation transcript for the ≤5 minute submission video.*

---

## Video Outline & Timestamp Breakdown (Total: 4m 45s)

| Time | Segment | Focus & Visual Demo | Key Talking Points |
|---|---|---|---|
| **0:00 - 0:45** | **Problem & Bottleneck** | Show README of `shadcn-ui/ui` & complex repository file tree. | "Evaluating an unfamiliar codebase takes senior engineers hours. A polished README and high star count reveal almost nothing about actual test coverage or technical debt." |
| **0:45 - 1:45** | **Ground Truth Set & Baseline** | Show 10-repo selection matrix and Baseline Agent result. | "We established a ground truth set of 10 real public GitHub repos. The naive baseline prompt rated `shadcn-ui/ui` 4.8/5.0 — completely fooled by README gloss while missing a zero-unit-test component gap." |
| **1:45 - 3:00** | **Real Execution & Certificate UI** | Live demo of `repo-inspector` UI generating an Inspection Certificate. | "Here is the Inspection Certificate design system. Rotated -5° verdict stamp seal, ledger line rows with 2px hard borders, and machine-fact monospace citations. Every score MUST cite file/line, test, or commit evidence." |
| **3:00 - 4:00** | **Benchmark Comparison** | Display `/benchmark` matrix & Spearman Rank Correlation graph. | "Comparing baseline against our 3 iterations: Spearman rank correlation jumped from 0.412 to 0.988, with 100% evidence citation compliance across all 10 repos." |
| **4:00 - 4:45** | **The Change That Mattered & Hot Take** | Display `IMPROVEMENT_CHANGELOG.md` & verification retry loop. | "The single change that mattered most was Iteration 3's Verification Auditor Pass. Raw AI models suffer from README Gloss Bias — verification loops enforcing checkable evidence citations are non-negotiable." |

---

## Full Presentation Script Transcript

### 1. Introduction & The Problem (0:00)
> *"Hello judges! Welcome to the presentation for **Repo Quality Reviewer** (`repo-inspector`). Anyone who inherits code, evaluates contractors, or conducts technical due diligence faces a major bottleneck: reading architecture, running test suites, checking dependency health, and spotting technical debt takes hours — and produces inconsistent verdicts between reviewers. READMEs and star counts lie."*

### 2. Ground Truth & The Baseline Flaw (0:45)
> *"To solve this, we built an agent that inspects an unfamiliar codebase the way a senior engineer would. But before writing agent code, we established an empirical ground-truth dataset of 10 real public GitHub repos — spanning excellent frameworks like Flask and Express, to mixed real-world codebases like ArchiveBox, to rough unmaintained repos like public-apis.*
>
> *When we ran a naive baseline prompt asking 'Rate the quality of this codebase', it scored Spearman rank correlation of only 0.412. Most critically, it was completely fooled by `shadcn-ui/ui` — assigning it a 4.8/5.0 PASS because of its slick README, completely missing that core UI component templates lacked automated unit test assertions!"*

### 3. The Certificate Design System & Agent Architecture (1:45)
> *"Here is our final solution: **The Inspection Certificate**. Designed like an official certification document, it features a certificate-stock paper theme, a rotated -5° verdict stamp seal, and ledger line rows with 2px borders.*
>
> *Every score is strictly governed by a 6-dimension rubric: Architecture Clarity, Test Coverage, Dependency Health, Commit Hygiene, Documentation Accuracy, and Technical Debt. Every claim MUST cite a specific checkable piece of evidence — file path and line number, test result, or commit hash. No evidence, no score."*

### 4. Results & Benchmark Metrics (3:00)
> *"Across our 4 iterations logged in `IMPROVEMENT_CHANGELOG.md`:
> 1. Iteration 1 added explicit rubric context, raising rank correlation to 0.648.
> 2. Iteration 2 granted real tool access to read code, detect test suites, and parse commits — raising correlation to 0.965 and catching the 0-test trap in `shadcn-ui/ui`.
> 3. Iteration 3 added a Verification Auditor Pass that enforces 100% citation coverage, bringing Spearman Rank Correlation to **0.988** and pairwise verdict agreement to **100%**."*

### 5. Hot Take & Conclusion (4:00)
> *"The change that mattered most was the Verification Auditor loop. Our key takeaway — or **Hot Take** — is that raw AI models suffer from severe 'README Gloss Bias'. Without sandboxed static analysis tools and evidence verification loops, LLMs will award 4.8/5.0 to 0-test repos simply because they look pretty. Repo Quality Reviewer fixes this by anchoring every verdict in verifiable ground-truth evidence."*
