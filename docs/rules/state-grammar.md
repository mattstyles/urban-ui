---
slug: state-grammar
stratum: language
strictness: law
enforcement: machine
---

# state-grammar

Interaction states are the exclusive gesture union `default | hover | press | disabled` plus the additive booleans `selected`, `invalid` and `focus`. Nav-current renders as `selected`. The word `active` does not exist in the vocabulary.

## Rationale

`active` means "being pressed" in CSS and "current item" in navigation — one word, two meanings, and agents amplify ambiguity. `press` is unambiguous (and matches react-aria, so the behavioural layer and visual contract share words with zero translation). Selection is a persistent mode and focus an overlay — both demonstrably coexist with gestures (a selected tab is hovered; a pressed button is focused), so they compose rather than compete. Disabled sits in the union because it suppresses the other gestures, yet composes with selection (a disabled toggle holds its state).

`invalid` is the same shape as `selected`: a persistent mode that composes with gestures and disabled, arriving on every form field via platform vocabulary (`aria-invalid`, react-aria's `isInvalid`). It styles from the `danger` scale — a sanctioned mapping, never a cross-scale borrow. Nav-current (`aria-current`) is the other half of the `active` collision, absorbed into `selected` rather than minted as a state.

The boolean set is growable by test — a persistent mode, spanning component classes, composing with gestures. What fails it (an indeterminate checkbox glyph, a calendar's unavailable day, drag/drop visuals) is component-owned styling, not grammar.

## Examples

### Incorrect

```ts
'.active': { … }          // pressed? current? unknowable
```

### Correct

A selected+hovered tab rendering both contributions, each defined.

## Evidence

Recorded at founding (urban-ui-727); `selected`-is-additive corrected during the interview (toggle-button case). `invalid` added, nav-current folded into `selected`, and the growth test written during the PR 50 review against the react-aria catalogue — every form field ships `isInvalid`, so omitting it would have made the first form tranche a deviation farm.
