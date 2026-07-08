---
slug: leading-trim
stratum: contract
strictness: law
enforcement: machine
---

# leading-trim

All text is leading-trimmed (`text-box-trim`); spacing values MUST be tuned against the trimmed rendering.

## Rationale

Trimming makes a font's box equal its ink, so every gap and inset around text is optical — a 16px gap is 16px of visible whitespace. Control heights become honest, headers seat on their content, and the spacing scales mean what they say. Untrimming later re-pitches every spacing value in every theme.

Ships in the `base` layer of the theme package's global CSS. The untrimmed fallback (Firefox, currently) degrades gracefully looser.

## Examples

### Incorrect

Compensating for phantom leading with asymmetric padding on a control.

### Correct

Symmetric padding from the `inset` scale; the trim guarantees it renders symmetric.

## Evidence

Recorded at founding (urban-ui-727); carried from poc-cyberpunk where the relatedness grammar depends on it.
