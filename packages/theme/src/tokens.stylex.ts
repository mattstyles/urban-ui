import * as stylex from "@stylexjs/stylex";

/**
 * Placeholder token handful — pipeline probes, not a designed scale.
 * The real token architecture lands with the design-system structural rules;
 * these exist to prove cross-package StyleX resolution end-to-end (ADR-0005).
 */
export const colors = stylex.defineVars({
  surface: "#ffffff",
  text: "#1f2328",
  accent: "#4f46e5",
  accentText: "#ffffff",
});

export const space = stylex.defineVars({
  sm: "8px",
  md: "16px",
  lg: "24px",
});

export const radii = stylex.defineVars({
  control: "6px",
});
