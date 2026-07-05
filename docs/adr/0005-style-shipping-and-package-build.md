---
status: accepted
date: 2026-07-05
tags: [adr, stylex, build, publishing]
---

# ADR-0005 — Style shipping and package build

## Context

- StyleX compiles at build time, forcing a choice for published packages: ship JS with `stylex.create` intact and let consumers compile (official StyleX guidance), or precompile to CSS + a thin runtime at publish (the pattern Meta's newly open-sourced Astryx design system ships).
- Precompiled is zero-config for consumers — attractive for our AI-agent audience — but has no official StyleX mode, unpublished build mechanics, and known sharp edges when mixed with consumer-side compilation.
- The theme package publishes `defineVars` tokens, where cross-package resolution still relies on `unstable_moduleResolution` — the riskiest place to deviate from official guidance.
- Consumer-compiles is the previous iteration's proven model, and the official `@stylexjs/unplugin` now auto-discovers StyleX packages in node_modules, so consumer setup cost has dropped to one plugin line — which the `urban` CLI can teach.

## Decision

- **Consumer-compiles for v1**: ship transpiled JS with StyleX calls intact; `@stylexjs/stylex` is a peerDependency.
- **Peer-dependency trio**: react, react-aria-components, @stylexjs/stylex — versions pinned repo-wide via bun catalog (single-version property; the monorepo-side defence against the singleton hazards `urban doctor` checks consumer-side).
- **Build is `tsc` emit — no bundler**: ESM-only, per-file output (required anyway: `*.stylex.ts` modules must survive 1:1), declarations from the same tool. TypeScript 7 (the native Go compiler, RC as of July 2026): **typecheck on 7 now**; published dist emit stays on classic 6.x until 7.0 GA, then cut over after diffing the emitted `.d.ts`. Tools consuming the TS programmatic API (the ts-morph extractor) remain on the 6.x API until 7.1 stabilises it.
- **Exports map laid down for the future**: root `.` plus per-component subpaths; the `source` export condition included from day one so Astryx-style dual-mode (precompiled CSS default + source for StyleX-native consumers) can be adopted later as an additive, non-breaking change.
- `sideEffects` lists only `**/*.stylex.*`; knowledge artifacts (docs, examples, manifest) ship in `files`.
- Package shape gated in CI by `publint` + `@arethetypeswrong/cli`.

## Consequences

- Consumers must configure one StyleX bundler plugin; installation guidance is `urban`'s job and the cost is accepted for v1.
- No bundler means the package build is trivially cacheable and debuggable (`tsc` + copy prose + generate manifest, as mise tasks).
- Precompiled-CSS-by-default is the recorded intended evolution — revisit when StyleX ships first-class library precompilation or the Astryx pattern stabilises; adopting it adds artifacts without breaking existing consumers.
- Watch items: TypeScript 7.0 GA (emit cutover) and 7.1 (programmatic API for the extractor); StyleX `unstable_moduleResolution` stabilisation; facebook/stylex#1399 (test-time compilation of external packages) mitigations required in Vitest config.

Related: [[package-anatomy]], [[0006-component-quality-stack]].
