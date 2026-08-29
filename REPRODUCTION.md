# REPRODUCTION GUIDE — Repo Quality Reviewer (`repo-inspector`)

> **micro1 Agentic Workflows Hackathon Deliverable #2**
> *Instructions for setting up environment variables, running the local server, and executing the benchmark evaluation suite.*

---

## 1. Prerequisites & Environment Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Installed and configured

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/daodudestiny56-netizen/mercor.git
cd mercor
npm install
```

### Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure `.env.local` with your API keys:
```env
# AgentRouter / LLM Endpoint Key (Optional for offline benchmark evaluation)
AGENTROUTER_API_KEY=your_agentrouter_key_here
AGENTROUTER_BASE_URL=https://agentrouter.org/v1

# GitHub Personal Access Token (Raises GitHub API rate limit from 60/hr to 5,000/hr)
GITHUB_TOKEN=your_github_pat_here
```

---

## 2. Running the Application Locally

Start the Next.js development server:
```bash
npm run dev
```

Open your browser at [`http://localhost:3002`](http://localhost:3002) (or [`http://localhost:3000`](http://localhost:3000)):
- **Landing Page (`/`)**: Value proposition overview, how it works, and live sample certificate preview for `expressjs/express`.
- **Certificate Inspector (`/inspector`)**: Interactive inspector supporting live repo slug inputs and 4 agent iteration toggles.
- **10-Repo Benchmark (`/benchmark`)**: Benchmark comparison matrix and Spearman Rank Correlation metrics.
- **Agent Trajectories (`/trajectories`)**: Step-by-step trace timeline inspector.

---

## 3. Running the Benchmark Suite & Recomputing Metrics

To execute the benchmark evaluation loop across all 10 ground-truth repositories and re-generate `trajectories/agent_traces.json`:

```bash
npx tsx scripts/run_live_benchmark.ts
```

### Expected Output & Cost
- **Runtime**: ~30-40 seconds for full 10-repo 4-iteration benchmark evaluation.
- **Output**: Writes updated traces to `trajectories/agent_traces.json` and `trajectories/baseline_traces.json`.
- **Target Metrics**:
  - Spearman Rank Correlation: `0.927` (Baseline) -> `1.000` (Iteration 3)
  - Pairwise Verdict Agreement: `50%` (Baseline) -> `100%` (Iteration 3)
  - Citation Verification: `100%` across all 10 repos.
