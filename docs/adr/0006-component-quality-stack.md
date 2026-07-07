---
status: accepted
date: 2026-07-05
tags: [adr, testing, workbench, visual-regression, a11y]
---

# ADR-0006 — Component quality stack

## Context

- Working model: agents write most code autonomously; Matt's time goes to PRDs/ADRs/RFCs/schemas and **pull-request review**. Every quality gate must therefore be PR-reviewable in GitHub and agent-self-serviceable — no external dashboards, no approval SaaS.
- Components wrap react-aria-components (accessible primitives) and are styled with StyleX (compile-time CSS), which constrains where a11y and visual properties can actually be verified: contrast and rendered styles need a real browser with compiled CSS.
- Storybook 10's value (stories-as-tests, a11y addon, Chromatic path) was evaluated and is superseded by this model: committed screenshot baselines make Playwright's native workflow the fit, and axe rides the same suite.

## Decision

- **Workbench: hand-rolled `apps/workbench`** (Vite) — globs `*.visual.tsx` scenes and `examples/` across packages, renders each on a stable route. It is the dev exploration surface, published to GitHub Pages. The VRT render target is the dedicated **`apps/vrt`** app (same globs, minimal hash-route renderer) so the test surface stays isolated from playground concerns.
- **Visual regression: Playwright `toHaveScreenshot` with baselines committed to the repo**, co-located per component (`__screenshots__/`, named by scene export).
  - The authoring agent regenerates baselines in its PR; GitHub's native image diff is the review UI.
  - **CI verifies reproducibility, not change**: it re-renders and fails on mismatch with committed baselines — intentional change never blocks, invisible change is impossible, doctored images can't survive.
  - Determinism: rendering only inside the pinned Playwright container (locally via Docker and in CI), animations disabled, fixed viewport, 1x DPR, oxipng on write — wrapped as `mise …:vrt` / `vrt --update`.
- **A11y gate: `@axe-core/playwright` in the same suite** — per scene and per example, real browser, compiled StyleX (contrast is actually checked). Per-scene exception list maintained for Adobe's documented axe false-positives on react-aria. Later layer (parked): Guidepup screen-reader smokes on flagship composites.
- **Unit/pattern tests: Vitest 4 (jsdom project)** + testing-library + `@react-aria/test-utils` pattern testers — verifies our wrappers still satisfy ARIA pattern contracts fast, without a browser. Known pins: user-event `useFocusVisible` regression; stylex#1399 (`externalPackages` / `server.deps.inline` for token packages).
- **Static gates, orchestrated by hk** (oxlint and oxfmt are hk builtins): TypeScript 7 typecheck (native compiler, RC today); **oxlint** 1.x — note jsx-a11y coverage is partial (28 of ~37 upstream rules), so the axe browser gate remains the a11y authority; **oxfmt** (0.x beta, Prettier-conformant output, version pinned) — changed-files on commit, `--all` in CI.
- **Manifest extraction: custom ts-morph extractor in `internal/`** — resolves wrapped RAC prop types via the checker; no off-the-shelf tool handles this shape (verified: react-docgen punts on intersections, react-docgen-typescript drops props under `Omit`). Fallback if extraction fights us: Astryx-style curated manifest + CI drift checks.

## Consequences

- No Storybook, no VRT SaaS: fewer moving parts, no vendor risk; the costs are owning two small apps (workbench playground, VRT render target) and Docker discipline for deterministic rendering.
- Screenshot baselines add repo weight — accepted; plain git now, Git LFS documented as the escape hatch (with its CI-bandwidth caveat).
- Examples are verified three ways with zero bespoke harness (typecheck, render, axe) via the VRT app bridge; scene baselines are the only committed screenshots and gate regressions — examples are LLM-facing usage docs, so they carry no baselines.
- oxfmt is pre-1.0 (pinned; Prettier-conformant output keeps Prettier/Biome as drop-in fallbacks); oxlint's type-aware mode (`oxlint-tsgolint`) is late-beta — adopt once its monorepo memory behaviour proves out. The ts-morph extractor rides the TS 6.x API until TypeScript 7.1.
- bun test is not used for component packages (no StyleX transform; axe incompatible with happy-dom) — reassess as Bun's runner matures.

Related: [[package-anatomy]], [[0005-style-shipping-and-package-build]].
