---
slug: hue-emphasis
stratum: flagship
strictness: default
---

# hue-emphasis

Emphasis advances by hue, not weight: to stress a span, lift it into the accent ink rather than bolding it.

## Rationale

Weight stays the role's to set; emphasis borrows the contrast axis — "louder" said in the language's own terms. Bolding running prose also fights leading-trim's optical spacing.

**Scope under observation:** in long-form prose, accent-hued spans can read as links. A deviation tally here may earn the read/editorial context a written exemption — this is the register's canonical example of a rule whose scope is being tested by evidence.

## Examples

### Incorrect (flagship default)

```tsx
<strong>overdue</strong>
```

### Correct

```tsx
<em {...stylex.props(emphasis.accent)}>overdue</em>
```

## Evidence

Recorded at founding (urban-ui-727); carried from poc-cyberpunk, scope question raised during the interview.
