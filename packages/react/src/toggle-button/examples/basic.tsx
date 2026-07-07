import { ToggleButton } from "@urban-ui/react/toggle-button";

/**
 * An uncontrolled mute toggle.
 */
export function Basic() {
  return (
    <ToggleButton onChange={(isSelected) => console.log("muted:", isSelected)}>Mute</ToggleButton>
  );
}
