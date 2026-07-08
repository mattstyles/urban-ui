---
slug: no-margin
stratum: language
strictness: default
enforcement: machine
---

# no-margin

Spacing comes from padding and `gap`; margin MUST NOT be used.

## Rationale

Margin collapse is context-dependent — margins collapse in flow layout and don't in flex/grid — so the same value reads differently per container. Padding and gap compose predictably everywhere. Leading-trim removes the phantom leading that margins historically compensated for; to-edge spacing is `inset` (padding), between spacing is `gap`.

## Examples

### Incorrect

```ts
marginBlockStart: space.md
```

### Correct

```ts
gap: space.md   // on the parent
```

### Sanctioned deviation

```
// deviation(no-margin): third-party embed injects sibling flow content
```

## Evidence

Recorded at founding (urban-ui-727); margin-collapse confusion across prior iterations. Supersedes the softer "margin folds into the scales" phrasing.
