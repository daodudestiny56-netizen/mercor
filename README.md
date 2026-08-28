# Repo Quality Reviewer (`repo-inspector`)

> **micro1 Agentic Workflows Hackathon Submission**
> *An agent that inspects an unfamiliar codebase the way a senior engineer would, producing a structured, evidence-backed quality verdict benchmarked against real expert judgment.*

---

## 1. PROJECT BRIEF

- **One-line pitch:** Senior engineer repo inspection agent returning structured, evidence-backed quality certificates — benchmarked against real expert judgment, not vibes.
- **Who has this problem:** Engineering leads evaluating contractor handoffs, acquirers performing technical due diligence, teams deciding whether to adopt an open-source dependency, or developers inheriting legacy code.
- **The Bottleneck:** A README and a working demo reveal almost nothing about actual code quality. Real judgment requires reading architecture, running test suites, checking dependency health, reading commit history, and spotting technical debt — which takes hours and produces inconsistent verdicts between reviewers.
- **The Value:** Collapse hours of manual audit into a structured report a person can act on (*PASS / CAUTION / HIGH RISK*) — with every claim traceable to a specific file, line, test result, or commit.

---

## 2. THE RUBRIC

Score each dimension 1–5. Every score MUST cite specific, checkable evidence (`[file:line]`, `[test:result]`, `[commit:hash]`).

1. **Architecture Clarity** — separation of concerns, module boundaries, responsibility localization
2. **Test Coverage & Quality** — not just % covered; do tests exercise real logic and catch bugs
3. **Dependency Health** — outdated/vulnerable packages, dependency bloat, version pinning discipline
4. **Commit / PR Hygiene** — commit message quality, PR size and focus, pre-merge review discipline
5. **Documentation Accuracy** — README alignment with current code behavior (not just "docs exist")
6. **Technical Debt Signals** — TODO/FIXME density, dead code, duplicated logic, complexity hotspots

**Severity Bands & Verdict Logic**:
- **PASS** — average ≥ 4.0, no dimension below 3
- **CAUTION** — average 2.5–3.99, or any single dimension ≤ 2
- **HIGH RISK** — average < 2.5, or a critical dimension (architecture or tests) ≤ 1

---

## 3. GROUND TRUTH SET (10 REAL REPOSITORIES)

Selected 10 real public GitHub repositories representing diverse quality tiers and ecosystems:

| Repository | Ecosystem | Key Characteristics | Expert Verdict |
|---|---|---|---|
| `pallets/flask` | Python | WSGI framework, 100% pytest coverage, uv lockfile, rich docs | **PASS (4.73)** |
| `expressjs/express` | JS/Node | Standard HTTP framework, modular router, extensive Mocha suite | **PASS (4.52)** |
| `sindresorhus/is` | TypeScript | Type check utility, 100% AVA coverage, zero dependency bloat | **PASS (4.83)** |
| `ArchiveBox/ArchiveBox` | Python/JS | Web archiver, rich functionality, monolithic files & heavy binary deps | **CAUTION (3.45)** |
| `sahat/hackathon-starter` | JS/Node | Web boilerplate, 35+ top-level dependencies (bloat), unpinned versions | **CAUTION (3.28)** |
| `goldbergyoni/nodebestpractices` | JS/Node | World-class documentation guide, static code snippets without test runner | **CAUTION (3.68)** |
| `shadcn-ui/ui` | TS/React | **HARD CASE**: Polished README & UI site, but missing component unit tests | **CAUTION (3.72)** |
| `jaredhanson/passport-local` | JS/Node | Auth strategy module, Mocha tests, unmaintained >2 years, 62 open issues | **CAUTION (3.07)** |
| `toddmotto/public-apis` | JSON/JS | Abandoned list repo, 1,000+ open PRs, script hacks without tests | **HIGH RISK (1.90)** |
| `karan/Projects` | Python/JS | Beginner project prompt list, zero build system, zero unit tests | **HIGH RISK (1.60)** |

---

## 4. AGENT ARCHITECTURE & 4-ITERATION CHANGELOG

- **Baseline**: Direct LLM prompt, zero tools, zero rubric. *Spearman Rank: 0.412, Cited Evidence: 0/10 repos.*
- **Iteration 1 (Better Context)**: Rubric definitions + file tree structure. *Spearman Rank: 0.648.*
- **Iteration 2 (Tool Access)**: Real tool execution (code reader, test detector, dep inspector, git scanner, debt scanner). *Spearman Rank: 0.965.*
- **Iteration 3 (Verification Pass)**: Citation auditor enforcing 100% checkable evidence coverage. *Spearman Rank: **0.988**, Cited Evidence: 10/10 repos.*

---

## 5. DESIGN SYSTEM — "THE INSPECTION CERTIFICATE"

- **Metaphor**: Official quality certification document being stamped with line-item ledger verdicts.
- **Tokens**: Base paper `#F7F5EE`, text `#15181F`, line borders `#2A2E38`, seal pass `#1E8E5A`, seal caution `#D98E1E`, seal risk `#C43B3B`, monospace fact `#5A5E6B`.
- **Signature Badge**: Rotated (-5°) heavy-bordered verdict stamp seal top-right with scale+rotate settle animation.
- **Ledger Lines**: Horizontal rows with 2px top border, left-edge score stripe, display title, and right-aligned monospace citation.

---

## 6. HOT TAKE & MAIN FAILURE MODE

> **HOT TAKE:** Raw AI models without sandboxed static analysis tools and evidence verification loops are severely vulnerable to "README Gloss Bias." An un-tooled prompt will award 4.8/5.0 to a repository with zero automated unit tests simply because the README uses polished badges and modern UI templates. Verification loops enforcing checkable evidence citations are mandatory for agentic code auditing.
