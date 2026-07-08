---
slug: interactivity-is-class
stratum: language
strictness: law
---

# interactivity-is-class

A component is interactive or it is not — interactivity is a class property of the component, never a per-instance styling choice.

## Rationale

Interactive affordance is a promise to the user. A Panel that hovers in one screen and not another teaches users nothing reliable, and lets agents sprinkle affordance where no behaviour exists. Non-interactive components carry no state styling at all.

## Examples

### Incorrect

Adding a hover treatment to a static Panel "for liveliness".

### Correct

Wrapping content in an interactive primitive when it genuinely acts; the Panel itself stays inert.

## Evidence

Recorded at founding (urban-ui-727), stated during the interaction-state discussion.
