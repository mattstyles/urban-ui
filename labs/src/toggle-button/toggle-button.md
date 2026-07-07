---
tags: [component, toggle-button, labs]
---

# ToggleButton

> **Experimental.** Labs component on the labs train — the API moves fast and
> graduates to `@urban-ui/react` when proven ([[package-anatomy]]).

## Purpose

A pressable two-state control wrapping `react-aria-components` ToggleButton —
accessible selection semantics (`aria-pressed`) with token-driven styling.

## When to use / when not

- Use for on/off controls whose state is the point: mute, bold, pin.
- Do not use where a [[button]] fires an action without retained state, or
  where a checkbox in a form is the honest control.

## Prop intent

The public surface is the react-aria-components `ToggleButtonProps` minus
`className` and `style`; styling is owned by the system. Control selection
with `isSelected`/`defaultSelected` and observe it with `onChange`.

## Behaviour notes

- Selection is exposed as `aria-pressed`, not a visual-only swap.
- Cursor inherits the browser default — buttons never set `cursor: pointer`.

## Examples

- `basic` — an uncontrolled mute toggle.
