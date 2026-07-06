---
tags: [component, button]
---

# Button

> **Stub.** This component is a walking-skeleton pipeline probe
> ([[001-repo-foundation]]); the guidance below is scaffolding for the
> anatomy contract ([[package-anatomy]]) and will be rewritten with the real
> component.

## Purpose

A pressable action trigger wrapping `react-aria-components` Button —
accessible press semantics with token-driven styling.

## When to use / when not

- Use for actions: submit, confirm, open, toggle.
- Do not use for navigation — links navigate, buttons act.

## Prop intent

The public surface is the react-aria-components `ButtonProps` minus
`className` and `style`; styling is owned by the system.

## Behaviour notes

- Cursor inherits the browser default — buttons never set `cursor: pointer`
  (pointer is for links).

## Examples

- `basic` — a minimal press-handler button.
