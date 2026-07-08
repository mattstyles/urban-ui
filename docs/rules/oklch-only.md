---
slug: oklch-only
stratum: contract
strictness: law
---

# oklch-only

Every colour MUST be declared in OKLCH — `oklch(L C H)` or `oklch(L C H / α)`.

## Rationale

The system's colour reasoning is perceptual: scale curves, band relationships, equi-perceptual status hues, and the empirical category test all assume a space where L/C/H moves mean what they say. A hex or HSL value is illegible to that machinery.

## Examples

### Incorrect

```ts
fill: "#4f46e5"
```

### Correct

```ts
fill: "oklch(0.51 0.23 275)"
```

## Evidence

Recorded at founding (urban-ui-727); carried from the poc-cyberpunk colour rules.
