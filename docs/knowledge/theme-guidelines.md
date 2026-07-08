---
tags: [knowledge, theme, tokens]
---

# Theme guidelines

The token architecture for `@urban-ui/theme`: the machinery that makes values swappable, the shape of each domain, and the reasoning behind both — a decision record with guidelines, not the contract itself. The normative inventory (scales, groups, members, vocabularies) is [[theme-contract]]; this document is the *why* behind it. Flagship values live in code; authoring happens by eye in labs. Framed by [[product-framing]]; rules and strata in [[design-language]]; package shape in [[0002-package-architecture]]; shipping in [[0005-style-shipping-and-package-build]]. Distilled from the urban-ui-727 tokenisation interrogation.

Tokens are **implementation-independent**: the contract is a specification; CSS custom properties, JS values, or documented conventions are carriers. The schema outlives any styling technology.

## Machinery

### The spine

> The themeable unit is a coherence group. A theme is a named set of values at any scope.

| tier | what it is | themeable? |
|---|---|---|
| **var** | the atomic value | only as part of its group |
| **group** | vars designed to move together; completeness enforced here | **yes — the only mechanical boundary** |
| **category** | a named collection of groups | via its groups |
| **theme** | a named set of values for any scope — a group, a category, or everything | n/a — it *is* the values |

"Theme" is scope-relative: *the `cosy` spacing theme*, *the high-contrast theme*, *the flagship theme*. The flagship is the default theme — its values **are** the token baselines; everything else themes away from them.

**Categories are empirical.** A category earns its name when its groups visibly cluster in value-space AND real edits move them together (re-pitch, re-hue, re-voice). A category never edited as one, invisible on a plot, is speculative taxonomy — don't create it.

### Structure rules

- **Two-storey where the system owns the curve** — ramps beneath (const vocabulary), themeable semantics above. Applies to text and space. Colour is hue-seeded instead — no shared palette beneath the scales.
- **Scheme (dark/light) is a facet of values**, not a theme: scheme-affected groups (colour, materials) hold per-scheme values in one entry. Dark is the only authored scheme for now; light is an empty seat at a set table — addable without structural change. Call sites never scheme-switch (see the derivation pairs below).
- **Scoped application** — a theme applies to a subtree, not only a root. Local pitch (a Card re-pitching spacing for its children) is scoped theming over the one schema, never a second scale.

## Colour

**Every colour is OKLCH** — `oklch(L C H / α)`. Format law, all strata.

### Scale anatomy

Identical across flavour and status scales. Bands are sub-group vocabulary; fg/bg hue-divergence within a scale is a values freedom.

| band | members | job |
|---|---|---|
| **fill** | `subtle` · `fill` | component backgrounds, quiet → emphatic. `fill` takes the seed directly (Default); deviate only when the `fill`×`onFill` AA pairing forces it |
| **edge** | `border` (recedes) · `line` (advances) | boundaries between layers |
| **marks** | `ink` · `inkSecondary` · `inkTertiary` · `icon` · `onFill` · `onFillSecondary` | foreground content; `icon` sits below `ink` to optically match |
| **materials** | `trace` · `glow` — growable | what colour a material effect is in this hue; the physics live in Materials |

### Roster

- **Flavour**: `accent` · `neutral`. `complementary` is deferred — watch for accent-overload deviations (cross-scale borrows, accent fatigue in dense screens) as the evidence that earns it.
- **Status**: `positive` · `warning` · `danger`. No `info` — that job belongs to `accent`/`neutral` until evidence says otherwise.
- **`surface`** — the neutral planes. Anatomy deferred to the Layers area: its slots are the layer model wearing colour.
- Extension is implicit: shipped components conform to this contract; consumers extend it or build adjacent contracts freely.

### Static category

Scale-less app-wide singletons, themeable like any group: `white` · `black` · `disabledInk` · `disabledFill` · `focus`. Disabled is cross-scale by nature (all scales converge on one greyed pair); `focus` is the app-wide focus-ring colour. `currentColor` is CSS machinery, not a token.

### Derivation pairs

| pair | nature | use |
|---|---|---|
| `shade` / `tint` | physical, **scheme-invariant**, const ramps of black/white alpha as full colours (for `color-mix`) | absolute darkening/lightening: scrims, shadows, over-media legibility floors |
| `advance` / `recede` | semantic, **scheme-variant** (advance = shade in light, tint in dark) | all emphasis derivations: hover washes, press moves, selected lifts |

Emphasis via the physical pair is a deviation — it bakes a scheme assumption into the call site.

Parked: the semantic colour-alias layer — cross-scale borrow deviations are the evidence that will earn it.

## Materials

Two materials, defined by how a surface handles light, plus an orthogonal **emission dial** (radiates; composes with both). Emissive-as-third-material waits for a specimen `solid` at max emission can't express.

| property | `solid` (reflects) | `glass` (transmits) |
|---|---|---|
| backdrop | blocked | transmitted: blur + tint; scrim/opacity floor guarantees marks-band AA over **any** backdrop |
| legibility mechanism | `fill`×`onFill` pairing | the scrim floor — the arbitrary-backdrop contract lives here and only here |
| grain/texture | allowed, quiet | allowed, quiet |
| emission | dial, off by default | dial, off by default |
| reduced-transparency | no-op | collapses toward solid — defined once, here |

- Every component that owns a surface has a material — containers lean glass, controls lean solid; marks never have one. Exposed as a prop where the choice is legitimate.
- Emission colour comes from the scale's `glow` member; gradients/cores derive via `color-mix` with seed/fill at authoring time. Derived values land as authored group values — no runtime identity math.
- Grain/texture: slots for asset, density, opacity; colour-agnostic masks over token colour; specifics discovered in labs (masking also serves emissive surfaces).
- The group anatomy for `solid` / `glass` / the emission dial — which vars each carries (blur, tint, scrim floor, emission levels) — is **unresolved**; tracked as an open slot in [[theme-contract]].

### Interaction states

- **Interactivity is a class property of the component, never per-instance.** Non-interactive components have no state styling.
- **Gesture union** (exclusive): `default | hover | press | disabled` — `press`, never `active` (nav-current collision). Disabled suppresses the others.
- **Additive booleans**: `selected` (a persistent mode — coexists with gestures and disabled) and `focus` (`focus-visible` semantics; composes with everything).
- **Focus is structural**: a ring drawn from `static.focus`, never an emission level — glow may garnish a focus ring, never be it. Token home (ring width/offset) deferred to the component-category area.
- Emission-maps-to-states (hover → ambient, press → hot) is a **flagship leaning**, not a contract binding: panels may run ambient emission as atmosphere; solid controls may have crisp no-emission states.

## Shape

Two deformation types, by perimeter site; a silhouette is a base rect plus deformations. **Radius is not a concept** — the rounded world is chamfers with `round` profile.

| type | site | properties |
|---|---|---|
| **chamfer** | corner | position (corners/sets) · size (depth ramp) · optional asymmetric legs · **one** profile — a chamfer is a single-gesture cut |
| **notch** | edge | position (edge + placement) · width × depth (ratio is the aspect; `slot` = narrow×deep preset) · wall · profile **per end** |

- **Tokenised**: the shared **depth ramp** (a few absolute px steps — one tool, one machining vocabulary) and the **profile vocabulary** (`square · straight · round`).
- **Site-owned**: which elements carry which deformations, where, at what aspect — design decisions, never theme-global. Named presets record recurring recipes, earned not speculative.
- **Mechanism**: the polygon generator and rendering (clip-path + SVG stroke + drop-shadow halo) are code, not tokens.
- **Contract invariants**: the bounding box is never exceeded (shape never disturbs spacing, under any theme); min width/height must exceed the cut size.
- Accepted consequence: de-cyberpunking geometry is per-site work, not a one-line theme edit.

## Text

**Leading-trim is a contract law** — `text-box-trim` applied globally; a font's box equals its ink, so every gap and inset around text is optical. Spacing values are tuned to the trimmed rendering; the untrimmed fallback (Firefox, today) degrades gracefully looser.

**Two scales.** The classification rule: *text balances against its environment (UI) or against itself (editorial).* An error message balances against its field → UI; long-form you actually read → editorial.

| scale | shape | roles |
|---|---|---|
| **UI** | t-shirt ramp `xs · sm · md · lg · xl` (`md` = 16px/1rem, the shared anchor) + thin semantic roles | `heading` · `subheading` · `label` · `action` — growable |
| **editorial** | role-first, ramp hidden; generous leading; big differentiation | `display` · `heading` · `subheading` · `kicker` · `lede` · `body` · `mono` · `caption` — growable |

- `heading` exists in both scales and is never shared — a panel heading is wayfinding chrome; an article heading is typographic architecture.
- The duty taxonomy (announce / read / data) survives as classification guidance — the test an agent applies when placing a new role — not as mechanical structure.

## Space

- **UI spacing**: `gap` (between items) and `inset` (content → edge) over the shared t-shirt ramp. Margin folds in — margin-to-edge is inset, margin-between is gap; a raw margin is a deviation. Width/height are excluded (control sizing belongs to the component-category area).
- **Editorial layout is its own subsystem** — the relatedness grammar (`cluster / hug / group / section`) and the recursive container grammar (`header? · body · footer?`) live there, opted into for genuine long-form.
- Kept as a UI-side rule: **a header sits tighter to its content than peers sit to each other** — the one spacing relationship that keeps headed structure legible at any density.
- `inset` level naming deferred until the Layers area settles.

## The size vocabulary

`xs · sm · md · lg · xl` is **one coordinated size-world** across UI text, spacing, and control sizes — a `sm` control wants a `sm` label and `sm` gaps. The coordination contract gets defined with the component-category groups.

## Open threads

Tracked as beads; owned by future sessions or earned by evidence:

- **Layers** — the planes/layer model, `surface` scale anatomy, `inset` level names
- **Component-category groups** — control sizes, content widths, focus-ring tokens, the t-shirt coordination contract
- **Motion** — the missing axis; `prefers-reduced-motion` is already law ([[product-framing]])
- Semantic colour-alias layer (earned by borrow deviations) · `complementary` (earned by accent overload) · emissive-as-material (earned by specimen) · container-grammar componentization
