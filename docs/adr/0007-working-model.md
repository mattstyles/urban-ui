---
status: accepted
date: 2026-07-06
tags: [adr, working-model, process, review]
---

# ADR-0007 — Working model: agent-authored, human-reviewed

## Context

- One maintainer and a rotating cast of AI agents build this repository. Human attention is the scarcest resource in the system; agent throughput is not.
- Earlier records ([[0004-release-strategy]], [[0006-component-quality-stack]]) each restate fragments of the same operating assumption in their Context sections. This record makes it canonical; records cite it instead of re-deriving it.

## Decision

- **Agents author; the human reviews.** Agents write most code, documentation, tests, and release intent. The maintainer's time goes to PRDs, ADRs, specs and schemas, and pull-request review.
- **GitHub is the review dashboard.** The pull request is the single gate every change passes through, so anything that gates must be:
  - **PR-reviewable** — visible as a diff in the GitHub UI. Artifacts are committed so they diff: screenshot baselines ([[0006-component-quality-stack]]), release intent files ([[0004-release-strategy]]), generated manifests. No external dashboards, no approval SaaS.
  - **Agent-self-serviceable** — an agent can run, regenerate, and satisfy every gate from the repository alone, without human setup or out-of-band credentials.
- **Mechanics are scripts, judgment is skills, CI enforces.** Deterministic work (version math, validation, generation) is ordinary tested code; judgment work (authoring intent, narrating changelogs, deciding timing) is agent-executed and lands in PRs for review; CI holds the contract between them ([[0004-release-strategy]]).
- **Review inputs are frozen by merge.** What the human approved is what downstream automation consumes — state lives in files pinned by commits, never in mutable surfaces (PR descriptions, tracker bodies, external services).
- **The tracker tracks; it does not remember.** Beads hold working state — a component spec drafts in its epic bead. Durable content graduates to reviewed artifacts before close: decisions to ADRs, behavioural requirements to tests, usage guidance to shipped prose. Closed beads are retained but never read as a knowledge source (periodic cleanup remains an open option).

## Consequences

- The repo optimises for review-legibility over ecosystem convention: committed baselines instead of a VRT service, intent files instead of harvested PR descriptions, git-tracked manifests instead of a registry.
- A gate that cannot be expressed as a PR-visible diff plus a CI check does not ship.
- Agent ceremony is cheap and accepted (regenerating baselines, filing intent); human ceremony is treated as a defect.
- The model leans entirely on review quality — bump levels, prose, and baselines are only as good as the attention they get. Mechanical backstops exist where the cost of a miss is highest (the semver oracle in [[0004-release-strategy]], reproducibility checks in [[0006-component-quality-stack]]).
