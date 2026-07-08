---
tags: [knowledge, design-language, rules]
---

# Design language

How rules work in this system: the strata that scope them, the register that holds them, and the deviation model that evolves them. The token inventory lives in [[theme-contract]], its rationale in [[theme-guidelines]]; the product frame in [[product-framing]]. Distilled from the urban-ui-727 tokenisation interrogation.

## The three strata

Every rule belongs to exactly one stratum:

| stratum | nature | enforcement |
|---|---|---|
| **token contract** | mechanical, neutral — the group schema, its slots, formats, invariants | the machinery itself (group completeness, generators, static checks) |
| **design language** | opinionated grammar, theme-agnostic — what makes any urban-ui app read as urban-ui regardless of theme | documented rules, agent-followed, review-enforced |
| **flagship theme** | the cyberpunk identity — value-level laws (square baseline, cuts-must-host, hue-not-weight emphasis) | flagship values + rules; fully deviatable by another theme |

The language was discovered through cyberpunk eyes but is written theme-agnostically — every rule gets re-examined for hidden flagship assumptions before landing in a lower stratum.

## The rule register

Rules are a **flat, evidence-based collection**: we hit a snag, we record the rule, we fix current violations, and the record prevents reintroduction. No upfront taxonomy — categorisation and the link-graph come later, from the data.

The register lives as **one file per rule** under `docs/rules/`, indexed in [[rules]] (eslint/biome shape: rule-per-page, scannable index). Add rules while they're hot with the `rule` skill; removal is deliberate and separately managed (deferred). Each rule carries:

- **slug** — flat kebab-case identity, cited at deviation sites; no numbers, no category prefixes
- **stratum** — contract / language / flagship
- **strictness** — `law` (breaking it exits the language; written justification required) · `default` (expected choice; deviate with an inline annotation) · `leaning` (soft preference; deviate freely)
- **the rule** — one sentence, decision-rule crisp (agents amplify vagueness at machine speed; vague guidance is a correctness bug)
- **rationale + examples** — the why, and Biome-style incorrect/correct pairs
- **evidence** — what proved it; deviation tallies append here

## Deviation model

A deviation is a call-site contradiction of a decision the system owns — not a variant prop (sanctioned API), not a scoped theme (sanctioned machinery), not a value the system doesn't govern.

- Deviation is **plain composition at the call site** — a local style layered over the system value, never a fork of the token or recipe.
- Every deviation carries the annotation: `// deviation(<rule>): <reason>`
- **Silent overrides are themselves violations** — an un-annotated local override of a governed property is flaggable by any reviewer, human or agent.
- **Deviations are data.** Each annotation is a vote: the ramp lacks a step, a rule's stratum/scope is wrong, a predicted category has become real, or a law needs a written exemption. Tallies (greppable by format) drive rule rewrites and demotions.
- **Standing deviations** (e.g. round avatars under a square-baseline flagship) are annotated once, cited thereafter, and promote into rule text when citations accumulate.

## The rules

The register lives in [[rules]] — one file per rule under `docs/rules/`, seeded at founding with the contract, language, and flagship rules from the urban-ui-727 sessions.

### Watches

Anticipatory entries — not rules yet, waiting for evidence:

- **accent-overload** — accent does heavy lifting system-wide; cross-scale borrows and accent fatigue in dense screens are the tally that earns a second flavour scale (`complementary` or better-named).
- **gamepad navigation** — deferred from [[product-framing]]; real game UI will eventually raise it.
- **spacing-context protocol** — scoped theming covers local pitch; a component needing to *know* its pitch is the evidence for a formal protocol.
