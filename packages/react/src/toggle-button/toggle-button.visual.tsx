import { ToggleButton } from "@urban-ui/react/toggle-button";

/**
 * Visual scenes: coverage, not pedagogy — one export = one screenshot.
 * Imports go through the public subpath so VRT captures what consumers get.
 */

export function Base() {
  return <ToggleButton>Mute</ToggleButton>;
}

export function Selected() {
  return <ToggleButton defaultSelected>Mute</ToggleButton>;
}

export function Disabled() {
  return <ToggleButton isDisabled>Mute</ToggleButton>;
}
