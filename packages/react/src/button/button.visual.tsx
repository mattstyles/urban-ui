import { Button } from "@urban-ui/react/button";

/**
 * Visual scenes: coverage, not pedagogy — each named export is one committed
 * screenshot and one axe pass (one export = one screenshot). Imports go
 * through the public subpath so VRT captures exactly what consumers render.
 *
 * Minimal by design: Button is a pipeline probe; the state matrix grows when
 * the real variant system lands.
 */

export function Base() {
  return <Button>Button</Button>;
}

export function Disabled() {
  return <Button isDisabled>Button</Button>;
}

/** Keyboard-modality focus on load — captures the browser focus ring. */
export function Focused() {
  // oxlint-disable-next-line jsx-a11y/no-autofocus -- the scene exists to screenshot the focused state
  return <Button autoFocus>Button</Button>;
}

/** Stress case: padding and wrapping under a long label. */
export function LongLabel() {
  return <Button>Save all changes and notify every subscriber on the list</Button>;
}
