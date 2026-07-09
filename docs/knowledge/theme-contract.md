---
tags: [knowledge, theme, tokens, contract]
---

# Theme contract

The normative inventory of the token system: every vocabulary, group, member, and the categories that cut across them. Implementation-independent — StyleX is one carrier ([[0005-style-shipping-and-package-build]]). Rationale and machinery live in [[theme-guidelines]]; rules and strata in [[design-language]]. Unresolved slots are marked **open** with their owner.

## Vocabularies

The name storey — the step names and enums the themeable semantics draw from. The names are the contract's invariant; the values behind them (a ramp's steps, `shade`/`tint`'s alphas) are group-configurable like every other value in this document ([[theme-guidelines]]).

| vocabulary | values |
|---|---|
| `size` | `xs · sm · md · lg · xl` — one coordinated size-world across UI text, `gap`, `inset`, control sizes |
| `depth` | small set of absolute px cut sizes — **open** (values: labs) |
| `profile` | `square · straight · round` |
| `shade` | numbered black-alpha full colours `oklch(0 0 0 / α)` — physical darkening, scheme-invariant |
| `tint` | numbered white-alpha full colours — physical lightening, scheme-invariant |

## Colour

Format: every colour is `oklch(L C H / α)`.

| group | kind |
|---|---|
| `accent` | flavour scale |
| `neutral` | flavour scale |
| `positive` · `warning` · `danger` | status scales |
| `surface` | planes |
| `static` | scale-less singletons |
| `advance` · `recede` | emphasis derivation, scheme-variant |

Scale anatomy — identical for every flavour and status scale, 12 members:

| band | members |
|---|---|
| fill | `subtle` · `fill` (= seed) |
| edge | `border` · `line` |
| marks | `ink` · `inkSecondary` · `inkTertiary` · `icon` · `onFill` · `onFillSecondary` |
| materials | `trace` · `glow` |

`surface` anatomy — background-only jobs (no ink members; foreground comes from `neutral`/`accent`); members are jobs, not a lightness ladder — direction (recessed vs raised panels) is a values decision:

| band | members |
|---|---|
| ramp | `canvas` (the plane's ground) · `panel` (container face) · `raised` (one step forward) |
| plane | `overlay` (child-plane face) · `scrim` (modal recession backdrop, authored from `shade`) |

Other groups:

| group | members |
|---|---|
| `static` | `white` · `black` · `disabledInk` · `disabledFill` · `focus` · `currentColor` |
| `advance` / `recede` | numbered, mirroring `shade`/`tint`; values scheme-faceted |

## Materials

| group | defined as |
|---|---|
| `solid` | reflects — backdrop blocked; legibility via `fill`×`onFill` |
| `glass` | transmits — blur + tint; scrim floor guarantees marks-band AA over any backdrop; reduced-transparency collapses to solid |
| emission | orthogonal dial, off by default; colour from the scale's `glow` |

Var anatomy for all three (blur, tint, scrim floor, grain slots, emission levels) — **open** (missing section, [[theme-guidelines]]).

## Shape

| token | form |
|---|---|
| `depth` | shared ramp (chamfer + notch) |
| `profile` | enum — chamfer carries one; notch carries one per end |

Invariants: a silhouette never exceeds its bounding box; element min-size must exceed its cut size. Application (which cuts, where) is site-owned — never tokenised.

## Text

Anchor: `md` = `16px / 1rem`, shared by both scales.

| scale | groups |
|---|---|
| UI | ramp: `{fontSize, lineHeight}` per `size` step · voice roles: `heading` · `subheading` · `label` · `action` · `text` |
| editorial | full roles: `display` · `heading` · `subheading` · `kicker` · `lede` · `body` · `mono` · `caption` |

Role anatomy: UI roles are **voice-only** (`family` · `weight` · `tracking`, + a default ramp step; structural constants like `textTransform` live in recipes) — size comes from context (`label` voice × `sm` step). Editorial roles carry the full set (`family` · `weight` · `size` · `tracking` · `leading`). `text` is the UI running-text workhorse (errors, descriptions, helper text).

## Space

| group | levels |
|---|---|
| `gap` | `plane · container · control` — defaults between siblings, keyed to what the parent contains; the `size` ramp refines (icon↔label sits below `gap.control`) |
| `inset` | `plane · container · control` — content → edge, keyed to the layer; `inset.control` is the md-anchor, sized controls chain padding via control sizing (urban-ui-6yb) |

Editorial layout subsystem (relatedness levels, container grammar) — **open**, specced with the editorial probe.

## State grammar

| axis | values |
|---|---|
| gesture (exclusive) | `default · hover · press · disabled` |
| additive booleans | `selected` · `invalid` · `focus` |

- `invalid` styles from the status scales (`danger`) — a sanctioned mapping, never a cross-scale borrow.
- Nav-current (`aria-current`) renders as `selected` — not a separate state.
- The boolean axis is growable. The test: a persistent mode, spanning component classes, composing with gestures. States that fail it are component-owned styling, not grammar.

## Cross-scale categories

Categories are empirical ([[design-language]]); these are the earned set. Some cut across domains — that is deliberate and load-bearing.

| category | groups | co-movement edit |
|---|---|---|
| flavour | `accent` · `neutral` | re-hue |
| status | `positive` · `warning` · `danger` | equi-perceptual retune, as one |
| size-world | UI text ramp · `gap` · `inset` · control sizes (open) | density re-pitch |
| physical derivation | `shade` · `tint` | never — scheme-invariant by definition |
| emphasis derivation | `advance` · `recede` | scheme facet swap |
| scheme-affected | all colour groups · materials | per-scheme values in one entry |

## Open slots

| slot | owner |
|---|---|
| control sizes · content widths · focus-ring vars | urban-ui-6yb |
| motion tokens | urban-ui-ed9 |
| material/emission var anatomy | deferred to lab + use-cases — urban-ui-s2e |
| global CSS: one shipped file, `reset` + `base` layers | shipped — [[0008-global-css-distribution]] |
