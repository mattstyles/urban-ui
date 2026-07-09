---
title: "Theme package — the buildable slice"
source: "docs/knowledge/theme-contract.md"
---

# Theme package — the buildable slice

Milestone plan for urban-ui-727: replace the probe tokens with the buildable slice of [[theme-contract]], ship the ADR-0008 global CSS, propagate the workbench scales route as each domain lands, and validate whole-theme switching. Machinery rationale in [[theme-guidelines]]; rules and strata in [[design-language]].

## Goal

Replace the probe tokens with the buildable slice of the theme contract as StyleX var groups (best-judgement dark flagship values), ship the ADR-0008 global CSS, propagate the workbench scales route as each domain lands so every group is visible, and validate whole-theme switching — at the root and within a subtree — with alternative colour, text, and space themes.

## Acceptance Criteria

1. **Contract groups ship**: `@urban-ui/theme` exports colour (accent, neutral, positive/warning/danger with the 12-member anatomy; surface; static; shade/tint; advance/recede), text (UI size ramp + voice roles; editorial roles), space (gap/inset trios), and shape (depth ramp + typed profile vocabulary) from group-scoped `.stylex` subpaths. No probe tokens remain in the repo.
2. **Global CSS live**: `@urban-ui/theme/global.css` ships `reset` + `base` layers; workbench imports it with the `useCSSLayers` object form; text renders leading-trimmed in Chromium and StyleX output wins over both layers.
3. **Dark flagship workbench**: the shell renders dark-first on `surface`/`neutral` tokens; workbench-specific styling lives in `apps/workbench/src/ui`; no hardcoded colours in app code.
4. **Scales route shows everything**: colour inventory with each legibility pairing (`fill`×`onFill`, surface×`ink`) annotated pass/fail against AA (all functional pairs passing), text specimens for both scales, gap/inset specimens, and a shape/depth specimen. Every shipped group is inspectable.
5. **Theme switching validated**: at least one alternative theme each for colour, text, and space — applied as whole named themes at the app root *and* scoped to a subtree on a scales page — visibly re-valuing tokens with zero call-site changes.
6. **Button restyled light-touch** on contract tokens (enough to render credibly in the dark workbench — not a component-work rebuild); ToggleButton mechanically re-pointed; VRT rebaselined dark; axe green.
7. **Gates green** after every phase: `hk check --all`, `mise run '//...:build'`, VRT.
8. **Primitive needs flagged**: a recorded list (bead comment on urban-ui-727) of the primitives the workbench work kept wanting — flagged, not built.

## Design Decisions

- **Carrier shape**: one `.stylex.ts` module per domain (`color`, `text`, `space`, `shape`), exporting `defineVars` groups matching the contract's coherence groups; subpath exports per module; root index stays types-only.
- **Theme = named bundle of group overrides**: a theme is a set of per-group `createTheme` artifacts applied together (`stylex.props(cosy.gap, cosy.inset, …)`) — at the root or at any branch point, which StyleX supports natively. Granularity follows the contract's categories: colour themes re-value the colour groups, a density theme re-pitches the size-world groups, a text theme re-voices. Alternative themes are **validation artifacts living workbench-side**, not shipped theme-package surface.
- **Scheme**: dark values are the authored baseline (`color-scheme: dark` in the `base` layer); light remains the empty seat — no speculative `light-dark()` plumbing ([[no-scheme-switch]] holds via `advance`/`recede`).
- **Values are best-judgement drafts**: structurally correct and AA-passing by construction; taste-tuning happens after this plan completes, by Matt. No AC asserts "looks right".
- **State grammar is recipe convention**: emphasis moves are sanctioned `color-mix` over `advance`/`recede` at call sites ([[emphasis-pair]]); no per-state tokens minted.
- **Shape ships vocabulary only**: `depth` as vars, `profile` as a typed constant ([[tokens-are-spec]]); the scales-route depth specimen uses an inline clip-path rendering that stays app-side — no shipped generator.
- **Workbench structure**: app-specific tokens/styling consolidate in `src/ui`; scales pages dogfood the editorial roles for their own copy. No primitives are created — needs are flagged (AC 8).
- **Stage-arounds**: Button md-only, no size prop (urban-ui-6yb); plain solid fill, no material vars (urban-ui-s2e); no transitions (urban-ui-ed9).
- **Probe retirement is last**; probes coexist until Button/ToggleButton/workbench are all re-pointed, keeping every phase deployable.

## Risks

- StyleX can't cleanly carry a contract shape (12-member scales, multi-property voice roles, non-CSS vocabularies): **high** — phase 1 exercises the riskiest carrier features end-to-end before the inventory fans out.
- Theme-switch mechanism has a gap (subtree override precedence, cross-package `createTheme` compile): **high** — phase 1 includes a switching smoke-proof (tiny `neutral` override on a subtree); full validation in phase 5.
- Best-judgement values need rework after tuning: **low — accepted by design** — structure and AA are locked; values are data behind an invariant contract.
- Dark flip churns VRT/axe on interim states: **low** — rebaseline deliberately in phases 1 and 6; axe gates each phase.
- Workbench app-structure work balloons into primitive-building: **medium** — hard rule: flag, don't build (AC 8); `src/ui` stays app-grade.

## Phases

### Phase 1: Dark spine end-to-end

Delivers: the riskiest slice proven — global CSS layers, the group-file carrier, scheme-dark rendering, and a theme-switch smoke-proof — visible as the workbench going dark on real tokens.
Covers: AC 2, AC 3, AC 7 (starts AC 1, AC 4, AC 5)

#### Acceptance Criteria

- `global.css` with `reset` + `base` layers (Comeau reset, reduced-motion, `text-box-trim`, `color-scheme: dark`); workbench wired with the `useCSSLayers` object form.
- Per-domain `.stylex` modules; first real groups: `surface`, `neutral` (full 12-member anatomy — the anatomy stress-test), `static`, `shade`/`tint`, draft dark values.
- Workbench shell restyled dark onto the new groups, app styling consolidated into `src/ui`; scales route gains its first section: `neutral` + `surface` inventory.
- Switching smoke-proof: a minimal `createTheme` over `neutral` applied to one subtree on the scales page.
- VRT rebaselined dark; theme-contract's "ADR pending" row updated to cite ADR-0008.

### Phase 2: Full colour inventory

Delivers: every colour group, inspectable and AA-annotated on the scales route.
Covers: AC 4 (colour), AC 7 (colour portion of AC 1)

#### Acceptance Criteria

- `accent`, `positive`, `warning`, `danger` (identical anatomy), `advance`/`recede` land.
- Scales route renders the complete colour inventory grouped by band, every `fill`×`onFill` and surface×`ink` pairing annotated pass/fail; all functional pairs pass ([[contrast-floor]]).
- Status scales authored as one equi-perceptual family ([[empirical-categories]]).

### Phase 3: Text and space

Delivers: the size-world — both text scales and the spacing trios, with the scales pages dogfooding editorial roles.
Covers: AC 4 (text/space), AC 7 (text/space portion of AC 1)

#### Acceptance Criteria

- `size` ramp (md = 16px/1rem anchor), UI voice roles (voice-only anatomy), editorial roles (full anatomy), `gap`/`inset` trios.
- Scales route gains type and spacing specimens; scales-page copy itself restyles onto editorial roles — the workbench's own docs surfaces become the first editorial consumer.
- Editorial *layout* grammar explicitly not built — roles only.

### Phase 4: Shape vocabulary

Delivers: the depth ramp and profile vocabulary, visible as a scales-route specimen.
Covers: AC 4 (shape), AC 7 (completes token surface of AC 1)

#### Acceptance Criteria

- `depth` ramp with best-judgement values; `profile` as a typed vocabulary constant.
- Scales route depth specimen: inline clip-path cuts at each step across control- and panel-sized boxes (app-side rendering, unshipped).
- Contract invariants recorded with the tokens ([[silhouette-bounding-box]], [[cut-min-size]]).

### Phase 5: Theme switching validated

Delivers: the coherence-group machinery proven — whole themes swapping at root and subtree with no call-site changes.
Covers: AC 5, AC 7

#### Acceptance Criteria

- Workbench-side alternative themes: one colour theme (re-hue of `accent`, per the flavour category edit), one text theme (re-voice), one space/density theme (size-world re-pitch).
- A theme switcher in the workbench shell applies bundles at the app root; a scales page section applies one scoped to a subtree alongside the flagship.
- Demonstrates the category edits from the contract's cross-scale table are real single edits.

### Phase 6: Light-touch Button and probe retirement

Delivers: the probes gone and the milestone closed, with Button credible in the dark workbench.
Covers: AC 6, AC 8, completes AC 1, AC 7

#### Acceptance Criteria

- Button restyled onto contract tokens — `action` voice, `accent` fill, hover/press via `advance`/`recede`, focus ring from `static.focus`, `inset` padding, square baseline. Deliberately minimal: enough to visualise, not component-plan work.
- ToggleButton mechanically re-pointed (three imports, like-for-like values); remaining workbench probe consumers swept; `colors`/`space`/`radii` deleted; grep confirms zero references.
- VRT rebaselined; axe green; primitive-needs list recorded as a comment on urban-ui-727.

### Follow-ups filed at close (beads, not plan work)

`urban doctor` global.css/layers check (alongside urban-ui-7dw) · labs route as its own milestone · value taste-tuning pass · component plans (Button proper, ToggleButton).

## Assessment

Labs was dropped from the milestone, so scoped theming's proof moved from lab knobs to a dedicated switching phase (5) plus a phase-1 smoke-proof — the smoke-proof matters because subtree override precedence is the second-biggest technical unknown and shouldn't wait until phase 5 to surface. The scales route accretes per phase rather than appearing in one lump, which makes phases 2–4 clean vertical slices (each ends with something newly inspectable). Button's phase is deliberately small to match its demoted purpose — visualisation, not component work — and ToggleButton's re-point is the one unavoidable touch (it breaks otherwise).

Checked tensions: phase 5's alternative themes depend on phases 2–4's inventory, so switching validation can't come earlier in full — the phase-1 smoke-proof covers the mechanism risk (root vs subtree application uses the same StyleX machinery). Phase 1 is the heaviest phase by design: every risky carrier feature lands there. AC 8 is unusual (a list, not behaviour) but cheap, explicitly requested, and has a concrete home.
