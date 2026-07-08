---
tags: [knowledge, theme, tokens, contract]
---

# Theme contract

The normative inventory of the token system: every vocabulary, group, member, and the categories that cut across them. Implementation-independent — StyleX is one carrier ([[0005-style-shipping-and-package-build]]). Rationale and machinery live in [[theme-guidelines]]; rules and strata in [[design-language]]. Unresolved slots are marked **open** with their owner.

## Vocabularies

The const storey — ramps and enums the themeable semantics draw from.

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
| `surface` | planes — anatomy **open** (urban-ui-btl) |
| `static` | scale-less singletons |
| `advance` · `recede` | emphasis derivation, scheme-variant |

Scale anatomy — identical for every flavour and status scale, 12 members:

| band | members |
|---|---|
| fill | `subtle` · `fill` (= seed) |
| edge | `border` · `line` |
| marks | `ink` · `inkSecondary` · `inkTertiary` · `icon` · `onFill` · `onFillSecondary` |
| materials | `trace` · `glow` |

Other groups:

| group | members |
|---|---|
| `static` | `white` · `black` · `disabledInk` · `disabledFill` · `focus` |
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
| UI | `size` ramp + roles: `heading` · `subheading` · `label` · `action` |
| editorial | roles: `display` · `heading` · `subheading` · `kicker` · `lede` · `body` · `mono` · `caption` |

Per-role var anatomy (family/weight/size/tracking/leading) — **open** (missing section, [[theme-guidelines]]).

## Space

| group | levels |
|---|---|
| `gap` | `size` vocabulary — between items |
| `inset` | level names **open** (urban-ui-btl) — content → edge |

Editorial layout subsystem (relatedness levels, container grammar) — **open**, specced with the editorial probe.

## State grammar

| axis | values |
|---|---|
| gesture (exclusive) | `default · hover · press · disabled` |
| additive booleans | `selected` · `focus` |

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
| `surface` anatomy · `inset` levels | urban-ui-btl (Layers) |
| control sizes · content widths · focus-ring vars | urban-ui-6yb |
| motion tokens | urban-ui-ed9 |
| material/emission var anatomy | deferred to lab + use-cases — urban-ui-s2e |
| text role var anatomy · UI running-text role | missing section, [[theme-guidelines]] |
| global CSS: one shipped file, `reset` + `base` layers | decided — ADR amending [[0005-style-shipping-and-package-build]] pending |
