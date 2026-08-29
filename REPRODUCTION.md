# REPRODUCTION GUIDE — Repo Quality Reviewer (`repo-inspector`)

> **micro1 Agentic Workflows Hackathon Deliverable #2**
> *Clean-environment setup and step-by-step commands to reproduce the baseline vs agent evaluation matrix.*

---

## 1. System Requirements & Prerequisites

- **Node.js**: v18.0.0 or higher (v24.x tested)
- **npm**: v9.0.0 or higher
- **OS**: Windows, macOS, or Linux
- **Environment Variables**:
  - `GITHUB_TOKEN` *(Optional)*: Set in `.env.local` to increase GitHub API rate limits from 60/hr to 5,000/hr.

---

## 2. Quickstart & Installation

```bash
# Clone the repository
git clone https://github.com/daodudestiny56-netizen/mercor.git
cd mercor

# Install dependencies
npm install

# Setup environment variables (optional)
cp .env.example .env.local
```

---

## 3. Running the Application & Benchmark Suite

### Option A: Interactive Web UI

```bash
# Start Next.js development server
npm run dev

# Open http://localhost:3000 in browser
```

1. **Overview & Product Landing Page**: Navigate to `http://localhost:3000/` for hero overview, how it works, and live `expressjs/express` sample certificate.
2. **Certificate Inspector**: Navigate to `http://localhost:3000/inspector` to test repository auditing across Baseline, Iteration 1, Iteration 2, and Iteration 3.
3. **10-Repo Benchmark Matrix**: Navigate to `http://localhost:3000/benchmark` to view the 10-repo ground-truth matrix and Spearman Rank Correlation metrics.
4. **Agent Trajectories**: Navigate to `http://localhost:3000/trajectories` to inspect step-by-step agent instructions and tool execution traces.

### Option B: Production Build Verification Test

```bash
# Run production build check
npm run build
```

---

## 4. Ground Truth Dataset (10 Repositories)

The 10 real public GitHub repositories evaluated in the benchmark suite:
1. `pallets/flask` (Python WSGI microframework)
2. `expressjs/express` (Node.js HTTP web framework)
3. `sindresorhus/is` (TypeScript type check utility)
4. `ArchiveBox/ArchiveBox` (Python/JS web archiver)
5. `sahat/hackathon-starter` (Node.js web application boilerplate)
6. `goldbergyoni/nodebestpractices` (Node.js best practices documentation)
7. `shadcn-ui/ui` (TS/React component CLI — *Hard Case*)
8. `jaredhanson/passport-local` (Node.js authentication strategy)
9. `toddmotto/public-apis` (JSON/JS public API catalog list)
10. `karan/Projects` (Multi-language collection of beginner project prompts)

---

## 5. Expected Output Metrics & Benchmark Execution Time

- **Spearman Rank Correlation**: `0.412` (Baseline) -> `0.988` (Iteration 3)
- **Pairwise Verdict Agreement**: `30.0%` (Baseline) -> `100.0%` (Iteration 3)
- **Cited Evidence Count**: `0 / 10` (Baseline) -> `10 / 10` (Iteration 3)
- **High Risk Accuracy**: `20.0%` (Baseline) -> `100.0%` (Iteration 3)
- **Execution Time**: ~320ms per benchmark report evaluation pass.
