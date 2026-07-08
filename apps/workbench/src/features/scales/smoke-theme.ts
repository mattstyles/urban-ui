import * as stylex from "@stylexjs/stylex";
import { neutral } from "@urban-ui/theme/color.stylex";

/**
 * Scoped-theming smoke proof (docs/plans/002-theme-buildable-slice.md,
 * phase 1): a complete re-valuing of the `neutral` group — the coherence
 * group is the themeable unit, so the override is total, never partial.
 * Values are the flagship drafts re-hued to magenta (H 345) at identical
 * L/C, so every AA pairing survives by construction. Applied to a subtree
 * on the scales page; the full switching validation is phase 5.
 */
export const magentaNeutral = stylex.createTheme(neutral, {
  subtle: "oklch(0.27 0.02 345)",
  fill: "oklch(0.33 0.022 345)",
  border: "oklch(0.36 0.024 345)",
  line: "oklch(0.52 0.026 345)",
  ink: "oklch(0.93 0.012 345)",
  inkSecondary: "oklch(0.78 0.014 345)",
  inkTertiary: "oklch(0.66 0.014 345)",
  icon: "oklch(0.85 0.014 345)",
  onFill: "oklch(0.96 0.01 345)",
  onFillSecondary: "oklch(0.82 0.012 345)",
  trace: "oklch(0.62 0.03 345 / 0.5)",
  glow: "oklch(0.82 0.05 345 / 0.6)",
});
