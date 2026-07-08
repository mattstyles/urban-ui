---
tags: [knowledge, design-language, rules]
---

# Design language

How rules work in this system: the strata that scope them, the register that holds them, and the deviation model that evolves them. The token schema itself lives in [[theme-contract]]; the product frame in [[product-framing]]. Distilled from the urban-ui-727 tokenisation interrogation.

## The three strata

Every rule belongs to exactly one stratum:

| stratum | nature | enforcement |
|---|---|---|
| **token contract** | mechanical, neutral — the group schema, its slots, formats, invariants | the machinery itself (group completeness, generators, static checks) |
| **design language** | opinionated grammar, theme-agnostic — what makes any urban-ui app read as urban-ui regardless of theme | documented rules, agent-followed, review-enforced |
| **flagship theme** | the cyberpunk identity — value-level laws (square baseline, cuts-must-host, hue-not-weight emphasis) | flagship values + rules; fully deviatable by another theme |

The language was discovered through cyberpunk eyes but is written theme-agnostically — every rule gets re-examined for hidden flagship assumptions before landing in a lower stratum.

## The rule register

Rules are a **flat, evidence-based collection**: we hit a snag, we record the rule, we fix current violations, and the record prevents reintroduction. No upfront taxonomy — categorisation and the link-graph come later, from the data. Each rule carries:

- **stratum** — contract / language / flagship
- **strictness** — `Law` (breaking it exits the language; written justification required) · `Default` (expected choice; deviate with an inline annotation) · `Leaning` (soft preference; deviate freely)
- **the rule** — one or two sentences, decision-rule crisp (agents amplify vagueness at machine speed; vague guidance is a correctness bug)
- **evidence** — what proved it

## Deviation model

A deviation is a call-site contradiction of a decision the system owns — not a variant prop (sanctioned API), not a scoped theme (sanctioned machinery), not a value the system doesn't govern.

- Deviation is **plain composition at the call site** — a local style layered over the system value, never a fork of the token or recipe.
- Every deviation carries the annotation: `// deviation(<rule>): <reason>`
- **Silent overrides are themselves violations** — an un-annotated local override of a governed property is flaggable by any reviewer, human or agent.
- **Deviations are data.** Each annotation is a vote: the ramp lacks a step, a rule's stratum/scope is wrong, a predicted category has become real, or a law needs a written exemption. Tallies (greppable by format) drive rule rewrites and demotions.
- **Standing deviations** (e.g. round avatars under a square-baseline flagship) are annotated once, cited thereafter, and promote into rule text when citations accumulate.

## Seed rules

The register as of the founding session. Format: stratum · strictness — rule.

### Contract

- contract · Law — Every colour is OKLCH (`oklch(L C H / α)`).
- contract · Law — Tokens are implementation-independent: the contract is a specification; CSS vars, JS values, or conventions are carriers.
- contract · Law — All text is leading-trimmed; spacing values are tuned to the trimmed rendering.
- contract · Law — A silhouette never exceeds its bounding box; shape never disturbs spacing.
- contract · Law — An element's min width/height must exceed its cut size.
- contract · Law — Categories are empirical: created only on visible clustering + co-movement under real edits.
- contract · Law — Scheme-flipping derivations are semantic tokens (`advance`/`recede`); call sites never scheme-switch.
- contract · Default — `fill` takes the scale's seed directly; deviate only when the `fill`×`onFill` AA pairing forces an adjustment.
- contract · Default — Derived colour values (`color-mix`) are authoring tools; results land as authored group values.

### Language

- language · Law — WCAG AA contrast is the floor for functional content, and it is the material's job to guarantee it ([[product-framing]]).
- language · Law — Flair never solely carries meaning; a glow may garnish a focus indicator, never be it.
- language · Law — Interactivity is a class property of a component, never per-instance.
- language · Law — Interaction states: gesture union `default | hover | press | disabled`; `selected` and `focus` are additive booleans. The word `active` does not exist in the vocabulary.
- language · Law — Focus is structural: a ring from `static.focus`; emission never substitutes.
- language · Default — Text is classified by what it balances against: environment → UI scale; itself → editorial scale.
- language · Default — Emphasis derivations use `advance`/`recede`; the physical pair (`shade`/`tint`) for emphasis is a deviation.
- language · Default — A header sits tighter to its content than peers sit to each other, at any density.
- language · Default — Margin folds into the spacing scales: to-edge is `inset`, between is `gap`; a raw margin is a deviation.
- language · Default — Shape application is site-owned: no theme or global rule dictates which deformations an element carries.
- language · Default — A chamfer is a single-gesture cut: one profile, no mixed legs-character on one corner.
- language · Default — Composed components are convenience, never capability: anything shipped composed must be constructable from the language ([[product-framing]]).
- language · Leaning — Shade/tint are for deriving, not for direct surface colours.

### Flagship

- flagship · Law — Square baseline: chamfers and notches over rounding; `round` profile is the sanctioned exception (standing deviation: avatars, control thumbs).
- flagship · Law — A cut's job is to host; "nothing, it looks good" fails the existence test. Hosting the light itself counts.
- flagship · Default — Things light up under the hand: hover → ambient emission, press → hot. A leaning of the identity, not a state-grammar binding.
- flagship · Default — Emphasis advances by hue, not weight (scope under observation: long-form prose may earn a read-duty exemption via deviation tally).
- flagship · Leaning — Texture is an abstracted machined motif, never a picture; dense texture crosses into noise field.

### Watches

Anticipatory entries — not rules yet, waiting for evidence:

- **accent-overload** — accent does heavy lifting system-wide; cross-scale borrows and accent fatigue in dense screens are the tally that earns a second flavour scale (`complementary` or better-named).
- **gamepad navigation** — deferred from [[product-framing]]; real game UI will eventually raise it.
- **spacing-context protocol** — scoped theming covers local pitch; a component needing to *know* its pitch is the evidence for a formal protocol.
