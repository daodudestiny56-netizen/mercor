# Repo Quality Reviewer

Know if a codebase is actually good — before you have to trust it.

---

## The 2am Demo Doesn't Matter Anymore

Somewhere, right now, someone is staring at a repository they didn't write.

Maybe it's an engineering lead who just inherited a contractor's handoff, and the client wants to know if it was money well spent. Maybe it's an acquirer, three days from signing, whose entire technical due diligence budget is "one engineer, one weekend, and a README that says nothing." Maybe it's just a developer who found a promising open-source library at 11pm and has thirty seconds to decide: do I build my product on top of this, or not?

The demo works. The landing page looks great. None of that tells you the truth.

The truth is buried in places nobody has time to read at 11pm — whether the tests actually test anything, whether the dependencies are quietly rotting, whether the commit history shows real review or just one person shipping straight to main for two years, whether the docs describe the code that exists or the code that used to exist.

A senior engineer could tell you in an afternoon. Most people don't have an afternoon, or a senior engineer.

That's the problem this project solves.

---

## What It Does

`repo-inspector` inspects a codebase the way a senior engineer would — architecture, tests, dependencies, commit hygiene, documentation accuracy, technical debt — and hands back a verdict you can actually act on, with every claim traceable to a real file, test result, or commit. Not vibes. Not a star count. Evidence.

### Two Tiers, Upfront About the Difference

| Attribute | Benchmarked Tier | Live Audit Tier |
|---|---|---|
| **Scope** | 10 hand-picked ground-truth repos | Any public GitHub repo |
| **Ground Truth** | Manually audited by a real engineer, dimension by dimension | None — the agent's independent verdict only |
| **What It Proves** | Measured accuracy against real expert judgment | Whether the same pipeline generalizes to the unknown |
| **Seal Token** | `BENCHMARKED VERIFIED` | `LIVE AUDIT` |

We could have blurred that line to make every certificate look equally authoritative. We didn't, on purpose — a verdict with no ground truth attached is a different kind of claim than one that's been measured, and pretending otherwise is exactly the kind of overconfidence this tool exists to catch in other people's code.

---

## How It Decides

Every audit runs through four stages, each one a deliberate answer to "what would actually make this judgment better":

- **Baseline**: Direct prompt, no rubric, no tools, no evidence.
- **Iteration 1**: Rubric + repo structure context. Still no tools.
- **Iteration 2**: Real tool calls: tests run, deps checked, commit log read.
- **Iteration 3**: Evidence verification — every citation must be real, or it's rejected.

Baseline shows what "just ask an LLM" gets you: a confident-sounding score with nothing behind it — and on famous, widely-known repositories, it can look deceptively accurate simply because the model already has an opinion about their reputation, independent of ever reading the code. That turned out to be one of the most useful things we learned building this — see the Hot Take in [SUBMISSION.md](SUBMISSION.md).

Iteration 3 is the one that matters most. A model that can cite evidence is only trustworthy if something checks whether that evidence is real. Ours does — and when it isn't, the dimension doesn't get to pass.

---

## The Rubric

Six dimensions, each scored 1–5, each requiring a real citation:

1. **Architecture Clarity** — separation of concerns, module boundaries
2. **Test Coverage & Quality** — not just present, but does it catch real bugs
3. **Dependency Health** — outdated, vulnerable, or bloated dependencies
4. **Commit / PR Hygiene** — message quality, review discipline
5. **Documentation Accuracy** — does the README match what the code does
6. **Technical Debt Signals** — TODOs, dead code, complexity hotspots

**Verdict Bands**:
- **Pass**: Average score >= 4.0, no dimension below 3.0
- **Caution**: Average score 2.5–3.99, or any dimension <= 2.0
- **High Risk**: Average score < 2.5, or a critical dimension <= 1.0

---

## What We Measured

Run across all 10 benchmarked repos, comparing each stage's independent verdict against real expert-audited ground truth:

| Stage | Pairwise Verdict Agreement | Evidence Citations |
|---|---|---|
| **Baseline** | **50%** | 0 |
| **+ Rubric & Context (Iter 1)** | **80%** | 0 |
| **+ Tool Access (Iter 2)** | **100%** | 10 / 10 repos |
| **+ Verification Pass (Iter 3)** | **100%** | 100% verified |

We lead with verdict agreement rather than rank correlation on purpose — correlation looked artificially strong even at baseline, and figuring out why taught us more than the number itself did. Full story in [SUBMISSION.md](SUBMISSION.md).

---

## Getting Started

Full setup, environment variables, and exact commands live in [REPRODUCTION.md](REPRODUCTION.md).

```bash
git clone https://github.com/daodudestiny56-netizen/mercor.git
cd mercor
npm install
cp .env.example .env.local  # add your AGENTROUTER_API_KEY (or router key) and GITHUB_TOKEN
npm run dev
```

---

## The Design System

The certificate reads like an inspection document, not a dashboard — a codebase gets evaluated, each dimension gets a line-item verdict with cited evidence, and the whole thing closes with a stamped seal. Paper, ink, and three colors that only mean one thing each: pass, caution, risk. Nothing decorative, nothing that isn't carrying real information.

---

## Where Everything Else Lives

- **[SUBMISSION.md](SUBMISSION.md)** — hackathon context, full results, hot take
- **[IMPROVEMENT_CHANGELOG.md](IMPROVEMENT_CHANGELOG.md)** — the real iteration history
- **[REPRODUCTION.md](REPRODUCTION.md)** — clean-environment setup
- **[trajectories/](trajectories/)** — real agent execution traces

*Built for the micro1 Agentic Workflows Hackathon. Every claim in this README, and every claim this tool makes about a codebase, is meant to be checkable — that's the whole point.*
