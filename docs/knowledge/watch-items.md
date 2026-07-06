---
tags: [knowledge, watch-items]
---

# Watch items

Living register of external events, pins, and revisit triggers that ADRs committed us to watching. ADRs are immutable, so items born there are tracked — and retired — here. Check this when planning upgrades; retire an item by deleting it (its ADR keeps the historical context).

## Toolchain

- **TypeScript 7.0 GA** — cut published emit over from 6.x after diffing the emitted `.d.ts` ([[0005-style-shipping-and-package-build]])
- **TypeScript 7.1** — programmatic API stabilises; migrate the ts-morph extractor off the 6.x API ([[0005-style-shipping-and-package-build]], [[0006-component-quality-stack]])
- **oxfmt 1.0** — pre-1.0 and version-pinned; Prettier-conformant output keeps Prettier/Biome as drop-in fallbacks ([[0006-component-quality-stack]])
- **oxlint type-aware mode (`oxlint-tsgolint`)** — late beta; adopt once monorepo memory behaviour proves out ([[0006-component-quality-stack]])
- **aube** — cheap trial as a bun.lock-compatible install layer; timing open ([[0001-repository-structure]])

## Libraries

- **StyleX `unstable_moduleResolution`** — stabilisation; the riskiest deviation surface for cross-package tokens ([[0005-style-shipping-and-package-build]])
- **facebook/stylex#1399** — test-time compilation of external packages; Vitest `externalPackages` / `server.deps.inline` mitigations required until fixed ([[0005-style-shipping-and-package-build]], [[0006-component-quality-stack]])
- **user-event `useFocusVisible` regression** — pinned pending upstream fix ([[0006-component-quality-stack]])

## Release

- **bun #15601** — publish OIDC/provenance support; decides the npm auth open question ([[0004-release-strategy]])
- **Prerelease machinery** — none by design; revisit when the core train faces a breaking release large enough to demand an RC period ([[0004-release-strategy]])

## Scale triggers

- **Build orchestrator** — adopt one when PR CI wall time regularly exceeds ~10 minutes or the workspace passes ~15–20 active nodes ([[0001-repository-structure]])
- **Git LFS** — escape hatch if committed screenshot baselines weigh the repo down (CI-bandwidth caveat noted) ([[0006-component-quality-stack]])
