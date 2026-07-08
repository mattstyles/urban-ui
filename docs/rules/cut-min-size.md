---
slug: cut-min-size
stratum: contract
strictness: law
enforcement: machine
---

# cut-min-size

An element's minimum width and height MUST exceed its cut size — a cut can never eat its element.

## Rationale

Deformation sizes come from the shared `depth` ramp; elements scale independently. Without the guardrail, a small element with a standard cut degenerates (self-intersecting polygons, vanished fill). The generator should enforce this, not just document it.

## Examples

### Incorrect

A 12px icon-button carrying a 16px chamfer.

### Correct

The same button clamped to the smallest depth step that fits, or shipped square.

## Evidence

Recorded at founding (urban-ui-727); carried from poc-cyberpunk geometry laws.
