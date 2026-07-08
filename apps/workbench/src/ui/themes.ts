import * as stylex from "@stylexjs/stylex";
import { accent, neutral } from "@urban-ui/theme/color.stylex";
import { gap, inset, size } from "@urban-ui/theme/space.stylex";
import {
  actionVoice,
  fontSize,
  headingVoice,
  labelVoice,
  lineHeight,
  subheadingVoice,
  textVoice,
} from "@urban-ui/theme/text.stylex";

/**
 * Alternative themes — workbench-side validation artifacts for the
 * switching mechanism (docs/plans/002-theme-buildable-slice.md, phase 5),
 * not shipped theme surface. A theme is a named bundle of per-group
 * createTheme overrides applied together, at the app root or any branch
 * point. violet and dense are category edits from the contract's
 * cross-scale table (flavour re-hue; size-world re-pitch); archive is a
 * coordinated re-voice across the five UI voice groups — no table category
 * yet, exactly the kind of repeated edit that would earn one
 * (empirical-categories). Overrides are always total — the coherence group
 * is the themeable unit, never individual vars.
 */

// createTheme() calls must be bound to bare variables (compiler rule);
// the exported bundles compose them.
const violetAccent = stylex.createTheme(accent, {
  subtle: "oklch(0.28 0.055 315)",
  fill: "oklch(0.75 0.13 315)",
  border: "oklch(0.45 0.085 315)",
  line: "oklch(0.6 0.11 315)",
  ink: "oklch(0.85 0.12 315)",
  inkSecondary: "oklch(0.76 0.1 315)",
  inkTertiary: "oklch(0.68 0.085 315)",
  icon: "oklch(0.8 0.11 315)",
  onFill: "oklch(0.16 0.03 315)",
  onFillSecondary: "oklch(0.27 0.045 315)",
  trace: "oklch(0.7 0.13 315 / 0.5)",
  glow: "oklch(0.82 0.16 315 / 0.6)",
});

const violetNeutral = stylex.createTheme(neutral, {
  subtle: "oklch(0.27 0.02 290)",
  fill: "oklch(0.33 0.022 290)",
  border: "oklch(0.36 0.024 290)",
  line: "oklch(0.52 0.026 290)",
  ink: "oklch(0.93 0.012 290)",
  inkSecondary: "oklch(0.78 0.014 290)",
  inkTertiary: "oklch(0.66 0.014 290)",
  icon: "oklch(0.85 0.014 290)",
  onFill: "oklch(0.96 0.01 290)",
  onFillSecondary: "oklch(0.82 0.012 290)",
  trace: "oklch(0.62 0.03 290 / 0.5)",
  glow: "oklch(0.82 0.05 290 / 0.6)",
});

/** Flavour category edit: accent re-hued 195 → 315, neutral cast 255 → 290. */
export const violetColour = [violetAccent, violetNeutral];

const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";

const archiveHeading = stylex.createTheme(headingVoice, {
  family: SERIF,
  weight: "700",
  tracking: "0",
});
const archiveSubheading = stylex.createTheme(subheadingVoice, {
  family: SERIF,
  weight: "650",
  tracking: "0",
});
const archiveLabel = stylex.createTheme(labelVoice, {
  family: SERIF,
  weight: "500",
  tracking: "0",
});
const archiveAction = stylex.createTheme(actionVoice, {
  family: SERIF,
  weight: "600",
  tracking: "0.01em",
});
const archiveTextVoice = stylex.createTheme(textVoice, {
  family: SERIF,
  weight: "400",
  tracking: "0",
});

/** Re-voice: every UI voice swaps to a serif register; tracking relaxes. */
export const archiveText = [
  archiveHeading,
  archiveSubheading,
  archiveLabel,
  archiveAction,
  archiveTextVoice,
];

const denseSize = stylex.createTheme(size, {
  xs: "0.125rem",
  sm: "0.375rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
});
const denseGap = stylex.createTheme(gap, {
  plane: "1rem",
  container: "0.75rem",
  control: "0.375rem",
});
const denseInset = stylex.createTheme(inset, {
  plane: "1rem",
  container: "0.75rem",
  control: "0.5rem",
});
const denseFontSize = stylex.createTheme(fontSize, {
  xs: "0.6875rem",
  sm: "0.8125rem",
  md: "0.875rem",
  lg: "1.0625rem",
  xl: "1.25rem",
});
const denseLineHeight = stylex.createTheme(lineHeight, {
  xs: "0.875rem",
  sm: "1.0625rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "1.625rem",
});

/**
 * Size-world re-pitch: text ramp, gap and inset move together as one
 * density edit — the size-world category made concrete.
 */
export const denseSpace = [denseSize, denseGap, denseInset, denseFontSize, denseLineHeight];
