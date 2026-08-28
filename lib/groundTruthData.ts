import { AuditReport } from './types';

export const EXPERT_GROUND_TRUTH_DATA: Record<string, AuditReport> = {
  'pallets/flask': {
    id: 'gt-flask',
    repoUrl: 'https://github.com/pallets/flask',
    repoName: 'pallets/flask',
    owner: 'pallets',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 4.73,
    verdict: 'PASS',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1420,
    summary: 'Senior Engineer Verdict: PASS (4.73/5.0). Clean WSGI/CLI architecture with 100% pytest test suite, pinned uv lockfile, active release discipline, and comprehensive Sphinx documentation.',
    keyFindings: [
      'Exemplary separation of concerns via Blueprint and Config subsystems [src/flask/app.py#L45-L120].',
      '100% pytest test suite exercising routes, CLI, and async handlers [tests/test_basic.py::test_options (PASS)].',
      'Strict dependency lockfile discipline using uv [uv.lock#L1-L150].',
      'Disciplined commit history and PR review before release [commit: d318b68].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 4.8,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clean modular separation between WSGI request handling, Blueprint routing, and CLI extension hooks.',
        evidence: [
          {
            id: 'flask-arch-1',
            type: 'file_line',
            citation: '[src/flask/app.py#L45-L120]',
            description: 'Core Flask application class defining explicit request lifecycle hooks.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 4.9,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Exhaustive pytest suite testing edge cases, HTTP method routing, and error handlers.',
        evidence: [
          {
            id: 'flask-test-1',
            type: 'test_result',
            citation: '[tests/test_basic.py::test_options (PASS)]',
            description: 'Pytest suite verifying HTTP OPTIONS request handling.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 4.6,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Strict version locking via uv.lock; minimal core dependency footprint (Werkzeug, Jinja2, Click).',
        evidence: [
          {
            id: 'flask-dep-1',
            type: 'dep_manifest',
            citation: '[uv.lock#L1-L150]',
            description: 'Pinned lockfile guaranteeing deterministic reproducible builds.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 4.7,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clean commit messages, PR review tags, and active main-branch commit frequency.',
        evidence: [
          {
            id: 'flask-git-1',
            type: 'commit_hash',
            citation: '[commit: d318b68]',
            description: 'Commit message "explain seek" with accompanying test fix.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.9,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Sphinx docs match exact runtime behavior of WSGI context, request object, and app.query decorators.',
        evidence: [
          {
            id: 'flask-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L50]',
            description: 'Accurate quickstart code snippets matching current 3.x WSGI API.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 4.5,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Zero critical TODO/FIXME items in core package modules; high code clarity.',
        evidence: [
          {
            id: 'flask-debt-1',
            type: 'file_line',
            citation: '[src/flask/app.py]',
            description: 'Clean refactored route registration system.',
            verified: true
          }
        ]
      }
    ]
  },

  'expressjs/express': {
    id: 'gt-express',
    repoUrl: 'https://github.com/expressjs/express',
    repoName: 'expressjs/express',
    owner: 'expressjs',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 4.52,
    verdict: 'PASS',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1350,
    summary: 'Senior Engineer Verdict: PASS (4.52/5.0). Gold-standard Node HTTP framework with decoupled middleware router, extensive Mocha test suite, and rapid security patch response.',
    keyFindings: [
      'Decoupled middleware and router system [lib/router/index.js#L40-L110].',
      'Comprehensive Mocha test suite exercising HTTP response verbs [test/res.location.js].',
      'Prompt security dependency patching for body-parser CVE-2026-12590 [commit: 8ba0c07].',
      'Disciplined commit history and detailed changelog history [History.md#L1-L45].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 4.6,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clean separation between Application, Router, Layer, Request, and Response prototypes.',
        evidence: [
          {
            id: 'express-arch-1',
            type: 'file_line',
            citation: '[lib/router/index.js#L40-L110]',
            description: 'Router prototype handling stack dispatch and middleware execution.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 4.7,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Comprehensive Mocha suite testing HTTP status codes, headers, and error middleware dispatch.',
        evidence: [
          {
            id: 'express-test-1',
            type: 'test_result',
            citation: '[test/res.location.js (PASS)]',
            description: 'Mocha test verifying header formatting on res.location redirect.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 4.4,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Active security patching (body-parser bump for CVE-2026-12590); pinned dependency bounds.',
        evidence: [
          {
            id: 'express-dep-1',
            type: 'dep_manifest',
            citation: '[package.json#L40-L65]',
            description: 'Package manifest with explicit semver bounds.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 4.5,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Structured commit conventional messages (build(deps), docs(res.location)).',
        evidence: [
          {
            id: 'express-git-1',
            type: 'commit_hash',
            citation: '[commit: 8ba0c07]',
            description: 'Commit bumping body-parser to fix CVE vulnerability.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.6,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Readme.md and History.md accurately reflect current 4.x/5.x API methods.',
        evidence: [
          {
            id: 'express-doc-1',
            type: 'file_line',
            citation: '[History.md#L1-L45]',
            description: 'Meticulous release changelog detailing API modifications.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 4.3,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Legacy callback patterns are cleanly wrapped and encapsulated.',
        evidence: [
          {
            id: 'express-debt-1',
            type: 'file_line',
            citation: '[lib/router/route.js]',
            description: 'Route handler dispatch loop free of unstructured TODO items.',
            verified: true
          }
        ]
      }
    ]
  },

  'sindresorhus/is': {
    id: 'gt-is',
    repoUrl: 'https://github.com/sindresorhus/is',
    repoName: 'sindresorhus/is',
    owner: 'sindresorhus',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 4.83,
    verdict: 'PASS',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1100,
    summary: 'Senior Engineer Verdict: PASS (4.83/5.0). Pristine type checking micro-library. 100% test coverage with AVA, 0 open issues, zero runtime dependencies, and strict TypeScript rules.',
    keyFindings: [
      'Single-responsibility type guard design [source/index.ts#L1-L150].',
      'Exhaustive AVA unit test suite covering primitive & complex types [test/test.ts].',
      'Zero runtime dependencies [package.json#L20-L35].',
      'Zero open GitHub issues and crisp documentation [readme.md#L1-L120].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 4.9,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Laser-focused scope; every type guard is a pure TypeScript assertion function.',
        evidence: [
          {
            id: 'is-arch-1',
            type: 'file_line',
            citation: '[source/index.ts#L1-L150]',
            description: 'Type guard function signatures with custom predicate return types.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 5.0,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: '100% branch and statement coverage exercising edge cases for NaN, Symbol, and null prototypes.',
        evidence: [
          {
            id: 'is-test-1',
            type: 'test_result',
            citation: '[test/test.ts::is.string (PASS)]',
            description: 'AVA assertion testing string primitive vs String object wrappers.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 4.8,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Zero production dependencies; modern development dependencies.',
        evidence: [
          {
            id: 'is-dep-1',
            type: 'dep_manifest',
            citation: '[package.json#L20-L35]',
            description: 'Empty dependencies object guaranteeing zero supply chain risk.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 4.8,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Crisp release tags and clean commit logs.',
        evidence: [
          {
            id: 'is-git-1',
            type: 'commit_hash',
            citation: '[commit: 7821031]',
            description: 'CI alignment commit following version bump.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.7,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clear Markdown table mapping TypeScript types to guard functions.',
        evidence: [
          {
            id: 'is-doc-1',
            type: 'file_line',
            citation: '[readme.md#L1-L120]',
            description: 'Exhaustive API table with type guard return signatures.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 4.8,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Zero technical debt markers or TODO items in source code.',
        evidence: [
          {
            id: 'is-debt-1',
            type: 'file_line',
            citation: '[source/index.ts]',
            description: 'Clean TypeScript codebase with strict compiler options enabled.',
            verified: true
          }
        ]
      }
    ]
  },

  'ArchiveBox/ArchiveBox': {
    id: 'gt-archivebox',
    repoUrl: 'https://github.com/ArchiveBox/ArchiveBox',
    repoName: 'ArchiveBox/ArchiveBox',
    owner: 'ArchiveBox',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 3.45,
    verdict: 'CAUTION',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1650,
    summary: 'Senior Engineer Verdict: CAUTION (3.45/5.0). Powerful self-hosted web archiving application with high utility, but suffers from large monolithic models, heavy external binary dependencies, and mixed test coverage.',
    keyFindings: [
      'Monolithic Django model file containing core archiving logic [archivebox/core/models.py#L1-L350].',
      'Mixed test suite coverage for complex async subprocess calls [archivebox/tests/test_cli.py].',
      'Heavy external binary dependency footprint (chromium, wget, yt-dlp, singlefile) [pyproject.toml#L40-L85].',
      'Active release candidate tags and high user feature delivery [commit: 683beb5].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 3.4,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Large monolithic core modules; Django app layer is heavily coupled to CLI execution.',
        evidence: [
          {
            id: 'ab-arch-1',
            type: 'file_line',
            citation: '[archivebox/core/models.py#L1-L350]',
            description: 'Snapshot model handling database persistence alongside subprocess rendering.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 3.2,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'CLI and index tests exist, but mock coverage for external binary tools (yt-dlp, singlefile) is incomplete.',
        evidence: [
          {
            id: 'ab-test-1',
            type: 'test_result',
            citation: '[archivebox/tests/test_cli.py (PASS)]',
            description: 'Pytest suite verifying basic CLI parameter parsing.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 2.8,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Requires multiple external native binaries and browser automation drivers.',
        evidence: [
          {
            id: 'ab-dep-1',
            type: 'dep_manifest',
            citation: '[pyproject.toml#L40-L85]',
            description: 'Dependencies manifest referencing multiple third-party Python extractors.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 4.1,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Frequent release candidate bumps and active main-branch commit cadence.',
        evidence: [
          {
            id: 'ab-git-1',
            type: 'commit_hash',
            citation: '[commit: 683beb5]',
            description: 'Release version bump commit "0.9.35rc316".',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.2,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Rich README, architecture diagrams, and detailed Docker setup instructions.',
        evidence: [
          {
            id: 'ab-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L200]',
            description: 'Comprehensive installation guide covering Docker, pip, and system dependencies.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 3.0,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Legacy extractor code paths retained alongside new Django web interface.',
        evidence: [
          {
            id: 'ab-debt-1',
            type: 'file_line',
            citation: '[archivebox/legacy/]',
            description: 'Legacy shell script wrappers retained for backwards compatibility.',
            verified: true
          }
        ]
      }
    ]
  },

  'sahat/hackathon-starter': {
    id: 'gt-hackathon',
    repoUrl: 'https://github.com/sahat/hackathon-starter',
    repoName: 'sahat/hackathon-starter',
    owner: 'sahat',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 3.28,
    verdict: 'CAUTION',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1280,
    summary: 'Senior Engineer Verdict: CAUTION (3.28/5.0). Popular Node.js boilerplate providing broad authentication & API integrations, but suffers from heavy dependency bloat (35+ packages) and superficial test coverage.',
    keyFindings: [
      'Large app setup file configuring 15+ middleware plugins [app.js#L1-L220].',
      'Superficial HTTP GET pings in test suite; missing unit assertions for OAuth providers [test/app.js].',
      'Dependency bloat: 35+ top-level packages (Stripe, Twilio, Passport) [package.json#L25-L75].',
      'Active minor version updates for core packages [commit: 73faf8c].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 3.5,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Standard MVC layout, but app.js acts as a bloated configuration monolith.',
        evidence: [
          {
            id: 'hs-arch-1',
            type: 'file_line',
            citation: '[app.js#L1-L220]',
            description: 'Main express application bootstrap initializing database and passport sessions.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 2.6,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Tests check basic route 200 OK responses, but do not test authentication failure or API payload handlers.',
        evidence: [
          {
            id: 'hs-test-1',
            type: 'test_result',
            citation: '[test/app.js (PASS)]',
            description: 'Supertest suite checking HTTP GET status codes.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 2.4,
        band: 'CAUTION',
        highRiskFlag: true,
        reasoning: 'Excessive top-level dependencies creating significant supply chain bloat.',
        evidence: [
          {
            id: 'hs-dep-1',
            type: 'dep_manifest',
            citation: '[package.json#L25-L75]',
            description: '35+ direct dependencies including multiple OAuth strategies.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 3.8,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Regular dependency bump commits via Dependabot.',
        evidence: [
          {
            id: 'hs-git-1',
            type: 'commit_hash',
            citation: '[commit: 73faf8c]',
            description: 'Commit message "fix: upgrade multer and morgan".',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.3,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clear environment variable instructions (.env.example) and production deployment checklist.',
        evidence: [
          {
            id: 'hs-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L150]',
            description: 'Detailed API keys configuration section.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 3.1,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Multiple TODO comments in controllers for unhandled API error cases.',
        evidence: [
          {
            id: 'hs-debt-1',
            type: 'file_line',
            citation: '[controllers/api.js#L45]',
            description: 'Inline TODO note for rate limiting handling.',
            verified: true
          }
        ]
      }
    ]
  },

  'goldbergyoni/nodebestpractices': {
    id: 'gt-nodebestpractices',
    repoUrl: 'https://github.com/goldbergyoni/nodebestpractices',
    repoName: 'goldbergyoni/nodebestpractices',
    owner: 'goldbergyoni',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 3.68,
    verdict: 'CAUTION',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1150,
    summary: 'Senior Engineer Verdict: CAUTION (3.68/5.0). World-class documentation guide for Node.js best practices, but functions as a documentation repository rather than an executable application, lacking an automated top-level test runner for code snippets.',
    keyFindings: [
      'Pristine modular documentation hierarchy [sections/architecture/].',
      'Missing top-level test runner for embedded code snippets [package.json#L10-L20].',
      'Minimal dependency pinning for markdown assets [package.json].',
      'Active annual release updates and community PR review [commit: dc3d60c].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 3.7,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Clear folder hierarchy for guides, but code snippets are static text files.',
        evidence: [
          {
            id: 'nbp-arch-1',
            type: 'file_line',
            citation: '[sections/architecture/]',
            description: 'Structured section layout for architectural guidelines.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 2.8,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Lacks an automated test suite verifying that sample code snippets compile and run.',
        evidence: [
          {
            id: 'nbp-test-1',
            type: 'dep_manifest',
            citation: '[package.json#L10-L20]',
            description: 'Package manifest with markdown linters but no test runner execution target.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 3.0,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Dependencies restricted to documentation linters.',
        evidence: [
          {
            id: 'nbp-dep-1',
            type: 'dep_manifest',
            citation: '[package.json]',
            description: 'Minimal devDependencies for markdown syntax checks.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 3.9,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Well-structured community pull request merges.',
        evidence: [
          {
            id: 'nbp-git-1',
            type: 'commit_hash',
            citation: '[commit: dc3d60c]',
            description: 'Update commit for annual edition release.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.9,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Industry-leading documentation accuracy, translated into 10+ languages.',
        evidence: [
          {
            id: 'nbp-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L300]',
            description: 'Exhaustive Table of Contents covering security, testing, and performance.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 3.8,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Clean markdown files with low technical debt.',
        evidence: [
          {
            id: 'nbp-debt-1',
            type: 'file_line',
            citation: '[sections/]',
            description: 'Up-to-date modern Async/Await code examples.',
            verified: true
          }
        ]
      }
    ]
  },

  'shadcn-ui/ui': {
    id: 'gt-shadcn',
    repoUrl: 'https://github.com/shadcn-ui/ui',
    repoName: 'shadcn-ui/ui',
    owner: 'shadcn-ui',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 3.72,
    verdict: 'CAUTION',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 1500,
    summary: 'Senior Engineer Verdict: CAUTION (3.72/5.0 — HARD CASE BENCHMARK TRAP). Polished UI & documentation, but component templates rely on copy-paste distribution without automated assertion unit test coverage for individual UI components (Test score 1.8 <= 2.0 triggers CAUTION).',
    keyFindings: [
      'Modern monorepo setup with pnpm workspaces & turbo [pnpm-workspace.yaml].',
      'HARD CASE FINDING: Vitest is configured, but core component templates in apps/www lack automated unit test assertions [vitest.config.ts].',
      'Heavy peer dependency footprint on Radix UI and Tailwind CSS [package.json].',
      'Active changeset releases and rapid pull request merges [commit: 683a5a9].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 4.2,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Clean monorepo separation between CLI generator, web documentation, and registry templates.',
        evidence: [
          {
            id: 'shadcn-arch-1',
            type: 'file_line',
            citation: '[packages/cli/src/index.ts#L1-L120]',
            description: 'CLI entrypoint for component initialization and registry fetching.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 1.8,
        band: 'HIGH_RISK',
        highRiskFlag: true,
        reasoning: 'HARD CASE TRAP: Naive evaluators rate this 5/5 due to pristine UI, but automated component unit tests are sparse.',
        evidence: [
          {
            id: 'shadcn-test-1',
            type: 'file_line',
            citation: '[vitest.config.ts]',
            description: 'Vitest setup exists for CLI utilities, but component rendering templates have zero unit test files.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 3.6,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Strict pnpm workspace lockfile discipline, though peer dependencies on Radix UI primitives are complex.',
        evidence: [
          {
            id: 'shadcn-dep-1',
            type: 'dep_manifest',
            citation: '[pnpm-workspace.yaml]',
            description: 'Monorepo workspace specification.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 4.4,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Disciplined use of Changesets for automated versioning and release notes.',
        evidence: [
          {
            id: 'shadcn-git-1',
            type: 'commit_hash',
            citation: '[commit: 683a5a9]',
            description: 'Registry feature addition PR merge.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 4.8,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Exceptional interactive documentation matching exact CLI flags.',
        evidence: [
          {
            id: 'shadcn-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L100]',
            description: 'Clear command-line quickstart instructions.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 3.5,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Some fallback shims required to support Next.js App Router vs Vite component paths.',
        evidence: [
          {
            id: 'shadcn-debt-1',
            type: 'file_line',
            citation: '[packages/cli/src/utils/]',
            description: 'Framework path resolution shims.',
            verified: true
          }
        ]
      }
    ]
  },

  'jaredhanson/passport-local': {
    id: 'gt-passport-local',
    repoUrl: 'https://github.com/jaredhanson/passport-local',
    repoName: 'jaredhanson/passport-local',
    owner: 'jaredhanson',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 3.07,
    verdict: 'CAUTION',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 980,
    summary: 'Senior Engineer Verdict: CAUTION (3.07/5.0). Classic authentication strategy module with a real Mocha test suite, but unmaintained for over 2 years with 62 unresolved issues and legacy Travis CI configs.',
    keyFindings: [
      'Clean single-file strategy implementation [lib/strategy.js#L1-L110].',
      'Real Mocha/Chai test suite exercising success, failure, and error callbacks [test/strategy.test.js#L1-L90].',
      'Legacy Travis CI configuration and unpinned devDependencies [package.json#L20-L30].',
      'Inactive repository maintenance (last commit Dec 2022) with 62 open issues [commit: 6045c1c].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 3.6,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Single-file module implementing the standard Passport strategy contract.',
        evidence: [
          {
            id: 'pl-arch-1',
            type: 'file_line',
            citation: '[lib/strategy.js#L1-L110]',
            description: 'Strategy constructor and authenticate prototype method.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 4.1,
        band: 'PASS',
        highRiskFlag: false,
        reasoning: 'Valid Mocha/Chai unit test suite testing username/password options, bad credentials, and exceptions.',
        evidence: [
          {
            id: 'pl-test-1',
            type: 'test_result',
            citation: '[test/strategy.test.js#L1-L90 (PASS)]',
            description: 'Mocha test asserting failure callback when credentials are missing.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 2.2,
        band: 'CAUTION',
        highRiskFlag: true,
        reasoning: 'Outdated devDependencies and legacy Travis CI config.',
        evidence: [
          {
            id: 'pl-dep-1',
            type: 'dep_manifest',
            citation: '[package.json#L20-L30]',
            description: 'Unpinned devDependencies from 2018.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 2.1,
        band: 'HIGH_RISK',
        highRiskFlag: true,
        reasoning: 'Repository unmaintained for >2 years; 62 unaddressed open issues.',
        evidence: [
          {
            id: 'pl-git-1',
            type: 'commit_hash',
            citation: '[commit: 6045c1c]',
            description: 'Last documentation update commit from 2022.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 3.8,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'README accurately describes strategy options, though lacks modern async/await examples.',
        evidence: [
          {
            id: 'pl-doc-1',
            type: 'file_line',
            citation: '[README.md#L1-L70]',
            description: 'Usage code snippet showing express authentication middleware.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 2.6,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Uses ES5 function prototypes instead of modern ES6 classes or TypeScript definitions.',
        evidence: [
          {
            id: 'pl-debt-1',
            type: 'file_line',
            citation: '[lib/strategy.js#L40]',
            description: 'ES5 function prototype inherits helper call.',
            verified: true
          }
        ]
      }
    ]
  },

  'toddmotto/public-apis': {
    id: 'gt-public-apis',
    repoUrl: 'https://github.com/toddmotto/public-apis',
    repoName: 'toddmotto/public-apis',
    owner: 'toddmotto',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 1.90,
    verdict: 'HIGH_RISK',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 850,
    summary: 'Senior Engineer Verdict: HIGH_RISK (1.90/5.0). Abandoned data list repository with no executable application codebase, zero unit tests, unmaintained pull requests, and high link decay rate.',
    keyFindings: [
      'Unstructured static markdown list file without software architecture [README.md#L1-L500].',
      'Zero unit test suite; minimal validate script [scripts/validate.js].',
      'Abandoned maintainer activity (last updated 2022) [commit: 831ff03].',
      'Hundreds of broken/dead external API links creating high debt.'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 2.1,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'Not a software application; monolithic markdown list file.',
        evidence: [
          {
            id: 'pa-arch-1',
            type: 'file_line',
            citation: '[README.md#L1-L500]',
            description: 'Static markdown table listing public API endpoints.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 1.2,
        band: 'HIGH_RISK',
        highRiskFlag: true,
        reasoning: 'Zero automated unit tests exercising software logic.',
        evidence: [
          {
            id: 'pa-test-1',
            type: 'file_line',
            citation: '[scripts/validate.js]',
            description: 'Basic syntax checker script with no test assertions.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 2.0,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'Unmaintained package manifest.',
        evidence: [
          {
            id: 'pa-dep-1',
            type: 'dep_manifest',
            citation: '[package.json]',
            description: 'Minimal package manifest with outdated linters.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 1.5,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'Abandoned repository with 1,000+ open unmerged pull requests.',
        evidence: [
          {
            id: 'pa-git-1',
            type: 'commit_hash',
            citation: '[commit: 831ff03]',
            description: 'Last commit from March 2022.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 3.0,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Table lists API names, but operational project documentation is absent.',
        evidence: [
          {
            id: 'pa-doc-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'Markdown table of public APIs.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 1.6,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'High rate of broken/dead external API links.',
        evidence: [
          {
            id: 'pa-debt-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'Broken link entries.',
            verified: true
          }
        ]
      }
    ]
  },

  'karan/Projects': {
    id: 'gt-karan-projects',
    repoUrl: 'https://github.com/karan/Projects',
    repoName: 'karan/Projects',
    owner: 'karan',
    evaluatedAt: '2026-08-28T22:00:00Z',
    agentIteration: 'iteration_3',
    overallScore: 1.60,
    verdict: 'HIGH_RISK',
    citationCount: 6,
    totalCheckableEvidence: 6,
    executionTimeMs: 780,
    summary: 'Senior Engineer Verdict: HIGH_RISK (1.60/5.0). Inactive collection of programming problem prompts with zero build system, zero test suite, no dependency manifest, and abandoned maintenance.',
    keyFindings: [
      'Raw text prompt list without executable application architecture [README.md#L1-L300].',
      'Zero unit test suite across all problem categories [README.md].',
      'No package.json or dependency lockfile [README.md].',
      'Inactive repo since 2020 (main commits from 2015) [commit: 10ed1c0].'
    ],
    dimensions: [
      {
        key: 'architecture_clarity',
        label: 'Architecture Clarity',
        score: 1.8,
        band: 'HIGH_RISK',
        highRiskFlag: true,
        reasoning: 'No application source code or module structure.',
        evidence: [
          {
            id: 'kp-arch-1',
            type: 'file_line',
            citation: '[README.md#L1-L300]',
            description: 'Problem statement descriptions in markdown bullet points.',
            verified: true
          }
        ]
      },
      {
        key: 'test_coverage_quality',
        label: 'Test Coverage & Quality',
        score: 1.0,
        band: 'HIGH_RISK',
        highRiskFlag: true,
        reasoning: 'Zero test files or test framework setup.',
        evidence: [
          {
            id: 'kp-test-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'No test suite present in repo.',
            verified: true
          }
        ]
      },
      {
        key: 'dependency_health',
        label: 'Dependency Health',
        score: 1.0,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'No dependency management files present.',
        evidence: [
          {
            id: 'kp-dep-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'Missing package.json or pyproject.toml.',
            verified: true
          }
        ]
      },
      {
        key: 'commit_pr_hygiene',
        label: 'Commit / PR Hygiene',
        score: 1.4,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'Abandoned repository; last commit from 2020.',
        evidence: [
          {
            id: 'kp-git-1',
            type: 'commit_hash',
            citation: '[commit: 10ed1c0]',
            description: 'Create CNAME commit from 2020.',
            verified: true
          }
        ]
      },
      {
        key: 'documentation_accuracy',
        label: 'Documentation Accuracy',
        score: 3.2,
        band: 'CAUTION',
        highRiskFlag: false,
        reasoning: 'Clear problem statements, but lacks project setup docs.',
        evidence: [
          {
            id: 'kp-doc-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'Markdown problem descriptions.',
            verified: true
          }
        ]
      },
      {
        key: 'technical_debt_signals',
        label: 'Technical Debt Signals',
        score: 1.2,
        band: 'HIGH_RISK',
        highRiskFlag: false,
        reasoning: 'Unmaintained repository structure.',
        evidence: [
          {
            id: 'kp-debt-1',
            type: 'file_line',
            citation: '[README.md]',
            description: 'Legacy repository state.',
            verified: true
          }
        ]
      }
    ]
  }
};
