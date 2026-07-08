---
tags: [index, rules]
---

# Rules

Entrypoint for the design-language rule register: a flat, evidence-based collection, one file per rule under `docs/rules/`. The model behind it — strata, strictness, the deviation format — lives in [[design-language]]. Add rules with the `rule` skill as violations are discovered; removal is deliberate and rare.

Cite rules at deviation sites: `// deviation(<slug>): <reason>`.

## Contract

Mechanical, neutral — enforced by the machinery itself.

| rule | |
|---|---|
| [[oklch-only]] | every colour is `oklch(L C H / α)` — the perceptual space all colour reasoning assumes |
| [[tokens-are-spec]] | tokens are implementation-independent; CSS vars/JS/conventions are carriers |
| [[leading-trim]] | all text is leading-trimmed; spacing is tuned against the trimmed rendering |
| [[silhouette-bounding-box]] | a silhouette never exceeds its box; shape never disturbs spacing |
| [[cut-min-size]] | an element must exceed its cut size — a cut can never eat its element |
| [[empirical-categories]] | categories are earned by visible clustering + co-movement, never declared |
| [[no-scheme-switch]] | call sites never branch on scheme; semantic tokens carry the flip |
| [[fill-takes-seed]] | `fill` is the seed directly, unless the AA pairing forces adjustment |
| [[authored-derivation]] | derivation is an authoring tool; results land as authored values |

## Language

Opinionated grammar, theme-agnostic — agent-followed, review-enforced.

| rule | |
|---|---|
| [[contrast-floor]] | AA is the floor for functional content, guaranteed by the material |
| [[flair-never-sole-carrier]] | flair garnishes meaning, never carries it alone |
| [[interactivity-is-class]] | a component is interactive or it isn't — never per-instance |
| [[state-grammar]] | gestures `default·hover·press·disabled`; `selected`/`focus` additive; no `active` |
| [[structural-focus]] | focus is a `static.focus` ring; emission never substitutes |
| [[browser-cursor]] | the browser sets the cursor; never fake `pointer` |
| [[text-balance]] | text balancing its environment → UI scale; itself → editorial |
| [[emphasis-pair]] | emphasis uses `advance`/`recede`; `shade`/`tint` are physical only |
| [[header-proximity]] | a header sits tighter to its content than peers sit to each other |
| [[no-margin]] | spacing is padding + `gap`; margin is a deviation |
| [[shape-site-owned]] | geometry application is a site decision, never theme-global |
| [[chamfer-single-gesture]] | one profile per chamfer; notches take a profile per end |
| [[composed-constructable]] | composed components are convenience, never capability |
| [[shade-tint-derive-only]] | the physical pairs derive; they are not surface/ink colours |

## Flagship

The cyberpunk identity — value-level laws; other themes deviate freely.

| rule | |
|---|---|
| [[square-baseline]] | the square is the baseline; cuts over rounding; avatars stand deviant |
| [[cut-must-host]] | every cut hosts something — light counts; garnish fails |
| [[emissive-states]] | things light up under the hand: hover → ambient, press → hot |
| [[hue-emphasis]] | emphasis advances by hue, not weight (scope under observation in prose) |
| [[machined-texture]] | texture is an abstracted machined motif, never a picture |
