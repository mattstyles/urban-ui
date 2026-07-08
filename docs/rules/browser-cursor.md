---
slug: browser-cursor
stratum: language
strictness: law
enforcement: machine
---

# browser-cursor

Let the browser set the cursor. Links show `pointer` natively; buttons show the default arrow. `cursor: pointer` MUST NOT be set manually.

## Rationale

Pointer means *navigates*, and only links navigate. A control that makes you reach for `cursor: pointer` is mis-built (probably a link wearing a button, or vice versa) — fix the control, not the cursor. Non-pointer state cursors (`not-allowed` on a disabled control, resize handles) are fine; the ban is on faking `pointer`.

## Examples

### Incorrect

```ts
cursor: "pointer"   // on a <button>
```

### Correct

`<a href>` for navigation (pointer for free); `<button>` for actions (arrow, correctly).

## Evidence

Recorded at founding (urban-ui-727); carried from poc-cyberpunk where it was already Law.
