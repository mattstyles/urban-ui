---
slug: emphasis-pair
stratum: language
strictness: default
enforcement: review
---

# emphasis-pair

Emphasis derivations (hover washes, press moves, selected lifts) use `advance`/`recede`; the physical pair (`shade`/`tint`) is for absolute darkening/lightening only.

## Rationale

Emphasis moves against the scheme's ground — what darkens in light mode lightens in dark mode — and `advance`/`recede` carry that flip in their scheme-faceted values. `shade`/`tint` are scheme-invariant by design: scrims, shadows, and over-media legibility floors darken in any scheme. Using the physical pair for emphasis bakes today's dark-mode assumption into the call site (see [[no-scheme-switch]]).

## Examples

### Incorrect

```ts
backgroundColor: `color-mix(in oklch, ${fill}, ${tint._300})`  // hover wash
```

### Correct

```ts
backgroundColor: `color-mix(in oklch, ${fill}, ${advance._300})`
```

## Evidence

Recorded at founding (urban-ui-727), resolving the shade/tint scheme-variance question.
