---
slug: fill-takes-seed
stratum: contract
strictness: default
---

# fill-takes-seed

A colour scale's `fill` SHOULD be its seed colour directly; deviate only when the `fill`×`onFill` AA pairing forces an adjustment.

## Rationale

The seed is what you say when you pick an identity ("the accent is cyan"); fill is the scale's loudest self-expression. Coinciding keeps the re-hue move maximally legible: set seed, fill *is* it, everything else derives around it. The contrast guarantee outranks seed purity — the classic yellow problem, where the pure seed cannot hold AA against any onFill.

## Examples

### Correct

Accent seeded cyan; `accent.fill` is that cyan.

### Sanctioned deviation

```
// deviation(fill-takes-seed): seed L too high for AA onFill; fill darkened one step
```

## Evidence

Recorded at founding (urban-ui-727).
