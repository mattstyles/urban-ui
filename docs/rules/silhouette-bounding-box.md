---
slug: silhouette-bounding-box
stratum: contract
strictness: law
enforcement: machine
---

# silhouette-bounding-box

A silhouette MUST NOT exceed its bounding box: every shape is the base rect minus deformations, never larger.

## Rationale

Because cuts never change an element's footprint, shape never disturbs spacing — the gap and inset scales hold under any theme's geometry. A perceived protrusion is uncut material left standing between two flanking cuts; the box still includes it. Glow bleeding past the silhouette is material, not geometry.

## Examples

### Incorrect

An additive tab/lug drawn outside the element's box.

### Correct

Two flanking notches leaving a raised centre — the box is unchanged.

## Evidence

Recorded at founding (urban-ui-727); carried from poc-cyberpunk geometry laws.
