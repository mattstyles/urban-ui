---
name: rule
description: Record a design-language rule in docs/rules/ while it's hot — when a snag, violation, or decision reveals a rule worth enforcing. Use when the user says "add a rule", "record this as a rule", "this should be a rule", or a review/deviation discussion converges on a new convention.
argument-hint: "<the rule, roughly stated>"
---

# Rule

Record a design-language rule as a per-file entry under `docs/rules/`, indexed in `docs/rules.md`. Rules are evidence-based: they get recorded when reality proves them, and current violations get fixed (or filed) at recording time. The model (strata, strictness, deviation format) lives in `docs/knowledge/design-language.md`.

## Steps

1. **Capture the one-liner first** — a single sentence stating the rule, RFC-2119 style where it helps (MUST/SHOULD). If `$ARGUMENTS` is rough, sharpen it with the user before proceeding. Decision-rule crisp: agents amplify vagueness.
2. **Sort it**:
   - **stratum** — `contract` (mechanical/neutral: formats, invariants, schema) · `language` (opinionated but theme-agnostic grammar) · `flagship` (the cyberpunk identity's values). Test: would a non-cyberpunk theme still obey it? yes → language or contract; no → flagship.
   - **strictness** — `law` (breaking it exits the language; written justification) · `default` (expected choice; deviate with annotation) · `leaning` (soft preference; deviate freely).
   - If genuinely unsure, ask the user — one question, both axes at once.
3. **Slug it** — flat kebab-case, short, imperative-ish (`no-margin`, `browser-cursor`). Check uniqueness against `docs/rules/`. No numbers, no category prefixes.
4. **Write `docs/rules/<slug>.md`** in the format below. Rationale carries the *why* (the snag that proved it); examples are Biome-style incorrect/correct pairs, plus a sanctioned-deviation example where one is already known.
5. **Index it** — add a row to the matching stratum table in `docs/rules.md`: `| [[<slug>]] | <short description distilled from the rationale> |`.
6. **Fix current violations** — grep/search for existing violations. Fix them in this change where cheap; where not, file a bead referencing the rule and note it in the Evidence section.
7. **Remind the deviation format** if the rule came from a deviation discussion: `// deviation(<slug>): <reason>`.

## Template

```markdown
---
slug: <slug>
stratum: contract | language | flagship
strictness: law | default | leaning
---

# <slug>

<One-sentence rule statement.>

## Rationale

<Why — the forces, the snag that proved it, what breaks without it.>

## Examples

### Incorrect

<code or description>

### Correct

<code or description>

### Sanctioned deviation (optional)

// deviation(<slug>): <known-legitimate reason>

## Evidence

<What earned it: date/session/bead, violations found and fixed or filed. Deviation tallies append here over time.>
```

## Constraints

- One rule per file; one file per rule. Never batch unrelated rules into one entry.
- Do not remove or demote rules in this skill — removal is deliberate, separately managed (currently deferred; raise it with the user instead).
- Keep entries compact — the rationale is a paragraph, not an essay.
