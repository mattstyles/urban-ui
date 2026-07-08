---
slug: no-scheme-switch
stratum: contract
strictness: law
enforcement: machine
---

# no-scheme-switch

Call sites MUST NOT branch on colour scheme. A derivation that flips with scheme is a semantic token (`advance`/`recede`) whose per-scheme values do the flipping.

## Rationale

Scheme is a facet of token values, not a component concern. A component that switches shade/tint on dark mode bakes a scheme assumption into every call site — the migration debt "scheme in the contract from day one" exists to prevent. Dark is the only authored scheme today; call sites written against semantic tokens survive light's arrival untouched.

## Examples

### Incorrect

```ts
backgroundColor: isDark ? tint._300 : shade._300
```

### Correct

```ts
backgroundColor: recede._300   // values are scheme-faceted
```

## Evidence

Recorded at founding (urban-ui-727), resolving the shade/tint scheme-variance question.
