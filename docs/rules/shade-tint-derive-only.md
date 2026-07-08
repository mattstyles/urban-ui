---
slug: shade-tint-derive-only
stratum: language
strictness: leaning
enforcement: machine
---

# shade-tint-derive-only

`shade`/`tint` are for deriving — mixing, scrim assembly, overlay floors — not for direct use as surface or ink colours.

## Rationale

The pairs are alpha ramps of pure black/white; used directly as fills or inks they bypass the scale anatomy and its contrast relationships. Reaching for them directly usually means a scale member is missing — which the deviation tally will reveal.

## Examples

### Incorrect

```ts
color: shade._700   // as a text colour
```

### Correct

```ts
backgroundColor: `color-mix(in oklch, ${surface.panel}, ${shade._500})`
```

## Evidence

Recorded at founding (urban-ui-727).
