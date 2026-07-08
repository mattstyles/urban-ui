---
slug: chamfer-single-gesture
stratum: language
strictness: default
enforcement: review
---

# chamfer-single-gesture

A chamfer is a single-gesture cut: one profile per corner, no mixed leg character.

## Rationale

A 60/30 leg pair or a hard 45° running into a rounded exit reads as two decisions occupying one corner — visual noise, not vocabulary. Asymmetric legs (expressed as lengths) are permitted; mixed *character* is not. Notches differ: a notch has two ends and specifies profile per end, because a cut can legitimately enter squared and exit rounded.

## Examples

### Incorrect

A corner cut that is half straight, half arc.

### Correct

`chamfer(size: depth.sm, profile: round)` — one gesture, applied whole.

## Evidence

Recorded at founding (urban-ui-727), from the geometry deformation discussion.
