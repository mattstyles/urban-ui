---
status: accepted
date: 2026-07-05
tags: [adr, monorepo, tooling, dev-environment]
---

# ADR-0001 — Repository structure

## Context

- This repository hosts an experimental design system: stable enough to consume in real applications, structured so that experimentation is cheap and visible.
- Predominantly TypeScript/React (React Aria + StyleX), plus standalone CLIs written in Rust or Go living in the same repository.
- The languages are deliberately loosely coupled — JS packages never depend on CLI build output. This invariant shapes most tooling decisions below.
- Small team (2–6), CI on GitHub Actions.
- Prior iterations of this design system used Turborepo + changesets in a JS-only shape; this repo re-evaluates the stack from scratch.

## Decision

### Dev environment — the jdx stack

- [mise](https://mise.jdx.dev/) is the single source of truth for toolchain versions, environment variables, and tasks.
  - Monorepo task mode: `monorepo_root = true` at the root, Bazel-style addressing (`mise //packages/core:build`, wildcards `mise '//...:test'`).
  - Each project directory carries its own `mise.toml`, inheriting and overriding root tools/env — CLIs pin their own Rust/Go versions without global churn.
  - Freshness checking uses content hashing (`task.source_freshness_hash_contents = true`); every task declares `sources`/`outputs`.
- [hk](https://hk.jdx.dev/) manages git hooks, wrapped by mise (`hk install --mise` via a mise postinstall hook) so contributors get correct tool versions without activating mise themselves.
- [bun](https://bun.sh/) provides JS package installs and workspaces. aube remains a possible later swap — it reads and writes `bun.lock` in place, so trialling it is cheap and reversible.
- **No build orchestrator** — no Turborepo, moon, or Nx. mise tasks orchestrate everything, across all languages.
  - The escape hatch stays open by convention: JS packages keep canonical `package.json` scripts (`build`, `test`, `lint`) as the source of truth; mise tasks are thin wrappers around them.
  - Revisit when PR CI wall time regularly exceeds ~10 minutes, or the workspace passes ~15–20 active nodes — at that point an orchestrator bolts onto the existing scripts.

### Monorepo layout

```
apps/          deployable applications (docs site, playgrounds)
packages/      stable published packages (core, tokens) — versioned in lockstep
labs/          experimental packages — 0.x, independently versioned
tools/         CLIs (Rust/Go) — standalone, never build-dependencies of JS packages
tooling/       internal-only shared config (tsconfig base, lint presets, build presets, test setup) — never published
docs/          this documentation brain (ADRs, specs)
```

- The `packages/` vs `labs/` boundary is the stability tier boundary, made structural — see [[0002-package-architecture]] for the versioning and graduation model.
- `tools/` shares the repository, CI, and mise tasks, but not the JS dependency graph.
- Apps and docs are private workspaces; they consume packages via `workspace:*` and are never published.

## Consequences

- One-command bootstrap: `mise install && bun install` sets up toolchains, dependencies, and hooks.
- No content-addressed build cache, no remote cache, no affected-detection — a clean CI runner rebuilds everything, every run. Accepted at current scale; GitHub Actions caching (bun store, cargo/go caches, mise-action tool cache) covers the dependency-level costs.
- Task conventions (`package.json` scripts + declared `sources`/`outputs`) keep the cost of adopting an orchestrator later to roughly a day, if scale ever demands it.
- The dev environment leans heavily on one maintainer's ecosystem (jdx). Accepted: the tools are independently replaceable (hk → lefthook, bun → pnpm) and mise itself is widely adopted with full-time sponsored development.

## Open questions

- How the `urban` CLI gathers and surfaces design-system knowledge — manifests shipped inside packages vs alternatives → [[0003-urban-cli]]
- Release strategy: intent capture and changelog assembly (meta plane) and npm/binary publish mechanics (publish plane) → [[0004-release-strategy]]
- Deploy target for apps; npm scope; aube adoption timing.
