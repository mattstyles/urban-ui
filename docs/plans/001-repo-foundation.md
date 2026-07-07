---
title: "Repository foundation — executing the ADR set"
source: "docs/adr/0001-repository-structure.md"
---

# Repository foundation — executing the ADR set

## Goal

Stand up the urban-ui repository so that every accepted ADR (0001–0007) is realized as working, CI-enforced tooling — from one-command bootstrap through to a fully rehearsed, publish-ready release pipeline — proven end-to-end by a single walking-skeleton component that travels the entire pipeline: authored, styled, tested, screenshotted, manifested, intent-filed, and release-assembled.

**Explicitly out of scope:** the Rust `urban` CLI implementation ([[0003-urban-cli]] / [[001-urban-cli]] — its own follow-up plan; this plan builds its repo-side contract surface: manifest, `"urban"` marker, release meta JSON), the docs site, any real npm publish (deferred until there's substance worth a 0.10.0), and any component count beyond the skeleton.

## Acceptance Criteria

1. On a fresh clone, `mise install && bun install` yields working toolchains, dependencies, and git hooks; a commit triggers hk gates (oxlint, oxfmt, typecheck) without any manual setup.
2. `mise '//...:build'` (and `:test`, `:lint`) run across all workspaces; every JS package keeps canonical `package.json` scripts that the mise tasks wrap.
3. The workbench app renders Button with compiled StyleX styles resolved from `@urban-ui/theme` tokens across the package boundary, and deploys to GitHub Pages.
4. `@urban-ui/react` and `@urban-ui/theme` build with `tsc` emit only (ESM, per-file, declarations), expose root + per-component subpath + `source` export conditions, declare the react/react-aria-components/stylex peer trio via bun catalog, and pass `publint` + `@arethetypeswrong/cli` in CI.
5. Vitest pattern tests, axe checks, and Playwright VRT run locally (pinned Docker container) and in CI; an intentional visual change fails VRT until baselines are regenerated, and regenerated baselines appear as image diffs in the PR; CI fails on baseline irreproducibility.
6. The component manifest is generated at build by the ts-morph extractor; a stale manifest fails CI; authored prose referencing a nonexistent component/prop/example name fails CI; wiki-links in prose become manifest graph edges, with the stable-never-links-to-labs rule enforced.
7. A PR touching published package source without a `.changes/` intent file fails CI; an intent file naming an untouched train fails CI.
8. Invoking `/release` assembles a reviewable release PR — versions computed by max-bump per train (0.x convention: breaking → minor; core launches at 0.10.0), intent files consumed, per-package `CHANGELOG.md` + release-level narrative + machine-readable meta JSON.
9. The publish workflow is verified in **rehearsal mode**: everything short of `npm publish` and GitHub Release creation runs — tarballs built via `bun publish --dry-run` with `workspace:*` correctly rewritten, publint/attw gates pass against the packed artifact, tag names and Release body generated and inspectable. No release is cut; the first real departure waits for content.
10. `@urban-ui/labs` exists as a single package on its own 0.x train (the `labs` train) with component anatomy mirroring stable; a graduation rehearsal moves a component folder from labs to react with anatomy intact, expressed as one intent file (`core: minor`, `labs: major`) that the version math maps to minors on both trains.
11. pkg.pr.new produces installable preview builds from PRs; a scratch consumer installs the preview pair with the one-line unplugin config and renders Button correctly — the consumer-compiles contract verified without an npm publish.

## Design Decisions

The ADRs are the substrate; this plan implements without re-litigating. Plan-level decisions:

- **Package names are decided**: `@urban-ui/react`, `@urban-ui/theme`, `@urban-ui/labs`. This closes ADR-0002's open question. `labs` is the one name everywhere — directory `labs/`, train key `labs:`, npm package — matching the accepted ADRs.
- **The walking skeleton is deliberately throwaway-minimal.** The design system's structural rules aren't written yet, so theme ships only a placeholder token handful and Button is the thinnest useful RAC wrapper — pipeline probes, expected to be rewritten when the DS rules land. No API design effort, no variant systems, no tone scales. One durable styling rule applies from day one: **buttons never set `cursor: pointer`** — cursor inherits browser defaults (pointer is for links).
- **Publish-ready, not published.** The publish plane is built and rehearsed end-to-end in dry-run mode; merging a real release PR stays a deliberate future act once there's content worth 0.10.0. pkg.pr.new previews stand in as the real installable artifact for consumer verification.
- **The urban CLI gets its own plan**; its repo-side contract surface (manifest schema, `"urban"` marker, release meta JSON, binary-train intent shape in the version math) is built here.
- **Extractor risk is spiked before it's load-bearing**; the full semver oracle stays deferred per [[0004-release-strategy]], with [[0006-component-quality-stack]]'s curated-manifest fallback as the bail-out.
- **Vertical slices read as team/agent-observable capabilities** — the repo is usable and CI-green after every phase, with a new capability someone can exercise.

## Risks

- Cross-package StyleX tokens rely on `unstable_moduleResolution` — ADR-0005's riskiest deviation surface: **high** — front-loaded into Phase 2 as the first end-to-end proof; fallback experiments (source condition, precompile spike) before touching the ADR.
- ts-morph extractor can't resolve wrapped RAC prop types (verified failure mode of off-the-shelf tools): **high** — Phase 4 opens with a time-boxed go/no-go spike against Button; curated-manifest fallback recorded in ADR-0006.
- VRT determinism across local Docker and CI: **medium** — pinned Playwright container from the first screenshot; render only in-container; fixed viewport, 1x DPR, oxipng.
- mise monorepo task mode and hk are young: **medium** — canonical `package.json` scripts are the escape hatch by design; hk → lefthook is a recorded swap.
- stylex#1399 breaks test-time compilation of the theme package in Vitest: **medium** — known mitigations (`server.deps.inline` / `externalPackages`) per ADR-0005/0006.
- Publish plane verified only in rehearsal — the first real publish may still surprise (npm auth, scope perms): **medium** — claim the `@urban-ui` scope on npm early (Phase 1); dry-run covers pack/shape; npm auth open question (bun #15601) resolved at first real release.
- Scope creep: more components, docs site, CLI mid-plan: **medium** — hard boundary: one skeleton component; CLI and docs site are separate plans.
- oxfmt (0.x) or TS 7 RC regressions: **low** — pinned versions; Prettier and TS 6.x emit are drop-in fallbacks.

## Phases

### ✅ Phase 1: Bootstrap — the jdx stack and repo skeleton — urban-ui-aad — [PR #26](https://github.com/mattstyles/urban-ui/pull/26)

Delivers: a clone-to-committing developer/agent experience — toolchain, layout, hooks, CI skeleton all live.
Covers: AC 1, 2 (fully proven once real packages exist in Phase 2)

#### Acceptance Criteria

- Fresh clone + `mise install && bun install` installs pinned toolchains, workspace deps, and hk hooks via the mise postinstall hook — no other setup steps.
- Directory skeleton (`apps/`, `packages/`, `labs/`, `internal/`) with bun workspaces and root `mise.toml` in monorepo mode; a placeholder internal package proves Bazel-style addressing and wildcard runs with content-hash freshness.
- Committing triggers hk-run oxlint + oxfmt (changed files) + typecheck; CI runs the same gates via mise with `--all` formatting.
- `internal/` carries the shared tsconfig base and lint presets; the `@urban-ui` npm scope is claimed.

### ✅ Phase 2: The core train exists — theme, react, and the style pipeline proven — urban-ui-qup — [PR #27](https://github.com/mattstyles/urban-ui/pull/27)

Delivers: `@urban-ui/theme` (placeholder tokens) and `@urban-ui/react` (minimal Button), built per [[0005-style-shipping-and-package-build]], rendering with correct styles in a minimal workbench — the riskiest ADR bet proven end-to-end.
Covers: AC 3 (render), AC 4

#### Acceptance Criteria

- `@urban-ui/theme` ships a deliberately small `defineVars` token set (`*.stylex.ts`) with stub token docs; `@urban-ui/react` ships a minimal Button wrapping react-aria-components, styled via theme tokens, no `cursor` declaration, with the component folder anatomy scaffolded (`button.md`, `examples/`, placeholder scene).
- Both packages build via `tsc` emit only as mise tasks with declared sources/outputs; exports maps carry root + subpath + `source` condition; `sideEffects` lists only `**/*.stylex.*`; `react` declares `theme` a peerDependency; peer trio pinned via bun catalog.
- `apps/workbench` (Vite + `@stylexjs/unplugin`) renders Button with theme tokens correctly resolved cross-package — compiled CSS contains token-derived values.
- `publint` + `@arethetypeswrong/cli` pass in CI for both packages.

### ✅ Phase 3: Component quality gates — tests, axe, VRT, and the workbench as render target — urban-ui-bke — [PR #29](https://github.com/mattstyles/urban-ui/pull/29)

Delivers: the full [[0006-component-quality-stack]] verification loop on Button; workbench deploys to GitHub Pages.
Covers: AC 3 (Pages), AC 5

#### Acceptance Criteria

- Workbench globs `*.visual.tsx` scenes and `examples/` across packages onto stable routes; Button has real scenes (state coverage, minimal by design) and at least one example.
- Vitest 4 (jsdom) runs Button pattern tests via `@react-aria/test-utils` + testing-library, with the stylex#1399 and user-event pins applied.
- Playwright VRT runs only inside the pinned container (`mise …:vrt` / `vrt --update`); baselines committed per the naming schema; axe rides the same suite per scene and example with the react-aria exception list.
- CI re-renders and fails on mismatch with committed baselines; a deliberate style change demonstrates the loop: VRT fails → regenerate → PR image diff.
- Workbench deploys to GitHub Pages on merge to main.

### ✅ Phase 4: The knowledge layer — manifest extraction and prose validation — urban-ui-es3 — [PR #30](https://github.com/mattstyles/urban-ui/pull/30)

Delivers: the [[package-anatomy]] contract enforced by machines — generated manifests, drift gates, validated prose. The `urban` CLI's future data source exists and cannot rot.
Covers: AC 6

#### Acceptance Criteria

- Time-boxed spike first: the extractor resolves Button's public prop surface through RAC wrapping (intersections, `Omit`) acceptably — go/no-go against the curated-manifest fallback before building further.
- The extractor (`internal/`, TS 6.x API) generates a `schemaVersion`ed manifest at build indexing docs, patterns, examples with published paths; `package.json` carries the `"urban"` marker; manifests are git-tracked and staleness fails CI.
- Prose validation in CI: names in authored guidance checked against the manifest; wiki-links become typed graph edges; labs direction rule enforced; name uniqueness enforced at build.
- Examples verified against public exports by typecheck (completing four-way verification with Phase 3's render/axe/screenshot).

### ✅ Phase 5: Release meta plane — intent capture, gates, and assembly — urban-ui-750 — [PR #31](https://github.com/mattstyles/urban-ui/pull/31)

Delivers: every PR carries reviewable release intent; `/release` produces a complete, reviewable release PR.
Covers: AC 7, 8

#### Acceptance Criteria

- `.changes/*.md` intent format (changesets file shape, train-level frontmatter) parsed by scripts in `internal/`, `bun test`-ed against fixture directories.
- CI gates live: source-without-intent fails; intent-naming-untouched-train fails; manifest-changed-without-intent fails.
- Version math implemented and fixture-tested: max-bump per train; pre-1.0 semantics mapping; graduation semantics (`core: minor`, `labs: major`); binary-train intent shape accepted by the parser (for the future CLI).
- `/release` assembles the release PR: versions applied, intents consumed, per-package `CHANGELOG.md` + narrative synthesized from intent prose, manifest diffs, and linked PR descriptions + release meta JSON; assembly works offline.

### ✅ Phase 6: Publish plane — release-ready, rehearsed, not published — urban-ui-e9l — [PR #32](https://github.com/mattstyles/urban-ui/pull/32)

Delivers: the complete publish pipeline verified in rehearsal; previews installable from every PR. The first real train departure becomes a one-decision act.
Covers: AC 9, 11

#### Acceptance Criteria

- The publish workflow (triggered by release-PR merge) exists with a rehearsal mode exercising everything short of `npm publish` and Release creation: per-package `bun publish --dry-run` loop, `workspace:*` rewrite verified from the packed tarball, publint/attw against the pack, tag names + GitHub Release body generated and inspectable; the loop is idempotent by construction (`--tolerate-republish`).
- pkg.pr.new preview builds run from PRs; a scratch consumer installs the preview `react`+`theme` pair with the one-line unplugin config and renders Button correctly.
- The first real release is documented as a deliberate act: merge a real release PR when there's content worth 0.10.0 — no code changes required, only the decision.

### Phase 7: Labs tier and the graduation rehearsal — urban-ui-syo

Delivers: the experimental channel is real and graduation is demonstrated as a move.
Covers: AC 10

#### Acceptance Criteria

- `@urban-ui/labs` (in `labs/`) exists with one small experimental component in full component anatomy (no `patterns/`), on its own 0.x `labs` train, flowing through every existing gate (VRT, axe, manifest, intent) — experimental flags surface in the manifest.
- Labs' version line moves independently of core in release assembly; its dry-run publish rides the same rehearsal loop.
- Graduation rehearsal: the component folder moves labs → react intact; one intent file (`core: minor`, `labs: major`) produces minors on both trains; stable-links-into-labs validation demonstrably fails if attempted.

## Assessment

- The publish-plane shape (rehearsal, not release) survives the vertical-slice test: Phase 6 still delivers new observable capability (installable previews from every PR; an inspectable rehearsal run) even though nothing lands on npm. The one thing rehearsal can't cover — real npm auth/provenance — is an explicit risk-table entry, mitigated by claiming the scope early.
- "Minimal by design" doesn't undermine any phase: every gate (VRT, axe, extractor, intent) exercises fine against a thin Button. The extractor spike keeps its teeth because even a minimal RAC wrapper has the intersection/`Omit` shape that kills off-the-shelf tools.
- Phase 1 is the weakest slice ("the repo bootstraps") — kept separate because Phase 2 is the riskiest phase and merging would make the first PR enormous; the Phase 1 placeholder is deliberately minimal so Phase 2 lands quickly on top.
- Extractor ordering: the Phase 4 spike is arguably higher-risk than Phase 3's VRT, but component anatomy (scenes, baselines) shapes how Button is authored, and Pages deployment is independent of the extractor outcome. The spike can run concurrently as a de-risking probe if desired.
- Labs last: version math handles two trains from Phase 5 via fixtures, so labs isn't needed earlier; landing it after the rehearsed pipeline means it exercises proven machinery. Cost: graduation math is fixture-tested-only until Phase 7.
- Coverage: all ACs map to phases (1→P1, 2→P1/2, 3→P2/3, 4→P2, 5→P3, 6→P4, 7/8→P5, 9→P6, 10→P7, 11→P6); all seven ADRs are covered (0001→P1, 0002→P2/7, 0005→P2, 0006→P3/4, 0004→P5/6, 0003's repo-side surface→P4/5/6, 0007 enforced by every gate being PR-visible). The closed npm-scope question should be reflected against ADR-0002's open questions (one-line note) during Phase 1.
- Deliberately omitted (recorded elsewhere, not commitments here): the semver-oracle classifier, Guidepup smokes, aube trial, crates.io / npm-installer channels.
