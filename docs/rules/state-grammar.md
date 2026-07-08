---
slug: state-grammar
stratum: language
strictness: law
enforcement: machine
---

# state-grammar

Interaction states are the exclusive gesture union `default | hover | press | disabled` plus the additive booleans `selected` and `focus`. The word `active` does not exist in the vocabulary.

## Rationale

`active` means "being pressed" in CSS and "current item" in navigation — one word, two meanings, and agents amplify ambiguity. `press` is unambiguous (and matches react-aria, so the behavioural layer and visual contract share words with zero translation). Selection is a persistent mode and focus an overlay — both demonstrably coexist with gestures (a selected tab is hovered; a pressed button is focused), so they compose rather than compete. Disabled sits in the union because it suppresses the other gestures, yet composes with selection (a disabled toggle holds its state).

## Examples

### Incorrect

```ts
'.active': { … }          // pressed? current? unknowable
```

### Correct

A selected+hovered tab rendering both contributions, each defined.

## Evidence

Recorded at founding (urban-ui-727); `selected`-is-additive corrected during the interview (toggle-button case).
