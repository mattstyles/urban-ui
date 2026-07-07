---
status: accepted
date: 2026-07-06
tags: [adr, packages, versioning, publishing]
---

# ADR-0002 — Package architecture

## Context

- The design system's components share runtime singletons: StyleX `defineVars` token objects and React Aria contexts. Split across independently versioned packages, version skew breaks these silently — two copies of a context don't compose, two token objects double-emit CSS. Radix's consolidation from per-primitive packages into a single `radix-ui` package is the ecosystem precedent for this failure mode.
- Consumers still legitimately want the *effects* of small packages: install only what you need, and a clear boundary between stable API and experiments.
- The stability boundary is structural in the repo layout — `packages/labs` vs the rest of `packages/` ([[0001-repository-structure]]: `packages/` holds every published package).
- Package count is the main input to two other systems: release version math ([[0004-release-strategy]]) and the `urban` CLI's discovery surface ([[0003-urban-cli]], [[001-urban-cli]]). A small, fixed shape keeps both simple.

## Decision

Two tiers, three published npm packages. (The `urban` CLI also lives under `packages/` as a Rust package — a published product regardless of language — but ships through the binary train, [[0003-urban-cli]] / [[0004-release-strategy]], and sits outside the npm tiers below.)

### The core train — `react` + `theme`, in lockstep

- `packages/react` is the component library: every stable component in one package, per-component subpath exports alongside the root export. "Install only what you need" is delivered by tree-shaking (`sideEffects` declared, [[0005-style-shipping-and-package-build]]) and subpaths — not by package fission.
- `packages/theme` carries the tokens (StyleX `defineVars`) and their documentation and philosophy.
- The two version **in lockstep** — one version number, one `core` release train ([[0004-release-strategy]]). A matching react/theme pair is the tested, supported unit; `urban doctor` verifies the pairing consumer-side.
- `react` declares `theme` as a **peerDependency**, joining the external peer trio ([[0005-style-shipping-and-package-build]]): the consumer installs the pair explicitly, the install shape guarantees a single theme copy, and doctor verifies the versions match.
- The train launches at **0.10.0** — a soft reset continuing a version history years long, not a greenfield 0.0.x. While pre-1.0, breaking changes version as minors (the 0.x convention, [[0004-release-strategy]]); committing to 1.0 is a deliberate future release act.
- `core` names the release train only; as a *package* name it is reserved for a possible future framework-generic layer.

### The labs tier — one package, permanently 0.x

- `labs` is a **single package** on its own independent 0.x line (the `labs` train). Experiments live at component level with the same anatomy as stable components ([[package-anatomy]]).
- 0.x convention: breaking changes version as minors. Labs never reaches 1.0 — it is a channel, not a package awaiting promotion.
- Experimental knowledge is flagged everywhere it surfaces, and stable knowledge never links into labs (direction rule, [[package-anatomy]]).

### Graduation

- Graduation is **a move, not a version event**: the component folder moves from `packages/labs` into `packages/react` with its anatomy intact — docs, examples, tests, scenes travel as-is. This is why labs mirrors the stable component anatomy: graduation is a move, not a rewrite.
- On the release trains, one graduation lands as a `minor` on core (new component) and a `minor` on labs (component removed — a breaking change under the 0.x convention). The intent file declares the *semantics* — `core: minor`, `labs: major` — and the version math maps the labs breaking change to a minor number while the train sits pre-1.0 ([[0004-release-strategy]]).

### Extraction rule

- Further packages are extracted **only by dependency weight**: a component whose dependencies would burden every consumer (e.g. charts dragging a heavy visualisation library) earns its own package. Component boundaries alone never justify one.
- Rejected: uniform per-component publishing (the singleton skew hazard above); a single package that includes experiments (stability signal lost, experiments taxing every install).

## Consequences

- Adding a component is a `minor` on the core train — no new package, no publish-config churn, no dependency-graph edits.
- Lockstep produces version churn without content: a react-only release still bumps theme. Accepted — the per-package changelog records "no changes"; the invariant "matching versions = supported pair" is worth the noise.
- One labs line means unrelated experiments share version churn. Accepted: labs consumers opt in deliberately and expect movement.
- Consumers need a tree-shaking bundler to get the small-install property; per-component subpath imports are the manual fallback.
- The shape is load-bearing elsewhere: it collapses release version math to a page of code ([[0004-release-strategy]]) and gives the CLI a fixed, small discovery surface ([[0003-urban-cli]]).

## Open questions

- npm scope and package naming. — *Resolved in [[001-repo-foundation]] Phase 1: `@urban-ui/react`, `@urban-ui/theme`, `@urban-ui/labs`; the `@urban-ui` scope is already owned (prior-iteration packages live there).*
