import * as stylex from "@stylexjs/stylex";

/**
 * Colour domain — coherence groups per docs/knowledge/theme-contract.md.
 * Every colour is OKLCH (oklch-only). Values are the dark flagship drafts:
 * structurally complete and AA-passing by construction (contrast-floor),
 * taste-tuned later. Dark is the only authored scheme; light arrives as a
 * per-entry facet without structural change (no-scheme-switch).
 */

/**
 * The neutral planes — background-only jobs, not a lightness ladder.
 * `canvas`/`panel`/`raised` are the ramp band; `overlay`/`scrim` are the
 * plane band (a child plane's face and the modal recession backdrop).
 * Foreground on surfaces comes from `neutral`/`accent` marks.
 */
export const surface = stylex.defineVars({
  canvas: "oklch(0.15 0.02 255)",
  panel: "oklch(0.19 0.022 255)",
  raised: "oklch(0.23 0.024 255)",
  overlay: "oklch(0.21 0.022 255)",
  // Authored from shade (authored-derivation): shade._700-equivalent black.
  scrim: "oklch(0 0 0 / 0.6)",
});

/**
 * Neutral flavour scale — the full 12-member anatomy shared by every
 * flavour and status scale: fill band (subtle, fill), edge band (border
 * recedes, line advances), marks band (inks, icon, onFills), materials
 * band (trace, glow).
 */
export const neutral = stylex.defineVars({
  subtle: "oklch(0.27 0.02 255)",
  fill: "oklch(0.33 0.022 255)",
  border: "oklch(0.36 0.024 255)",
  line: "oklch(0.52 0.026 255)",
  ink: "oklch(0.93 0.012 255)",
  inkSecondary: "oklch(0.78 0.014 255)",
  inkTertiary: "oklch(0.66 0.014 255)",
  icon: "oklch(0.85 0.014 255)",
  onFill: "oklch(0.96 0.01 255)",
  onFillSecondary: "oklch(0.82 0.012 255)",
  trace: "oklch(0.62 0.03 255 / 0.5)",
  glow: "oklch(0.82 0.05 255 / 0.6)",
});

/**
 * Scale-less app-wide singletons. Contract group name is `static` —
 * exported as `statics` because `static` is a JS reserved word (carrier
 * rename only; docs and the manifest cite the contract name).
 */
export const statics = stylex.defineVars({
  white: "oklch(1 0 0)",
  black: "oklch(0 0 0)",
  disabledInk: "oklch(0.56 0.01 255)",
  disabledFill: "oklch(0.24 0.012 255)",
  focus: "oklch(0.82 0.14 195)",
});

/**
 * Physical derivation pair — scheme-invariant black/white alpha ramps as
 * full colours, for deriving only (shade-tint-derive-only): color-mix
 * inputs, scrim assembly, over-media legibility floors. One designed
 * curve; the ramp re-pitches as one, never step-by-step.
 */
export const shade = stylex.defineVars({
  _100: "oklch(0 0 0 / 0.04)",
  _200: "oklch(0 0 0 / 0.08)",
  _300: "oklch(0 0 0 / 0.12)",
  _400: "oklch(0 0 0 / 0.18)",
  _500: "oklch(0 0 0 / 0.26)",
  _600: "oklch(0 0 0 / 0.36)",
  _700: "oklch(0 0 0 / 0.48)",
  _800: "oklch(0 0 0 / 0.64)",
  _900: "oklch(0 0 0 / 0.82)",
});

export const tint = stylex.defineVars({
  _100: "oklch(1 0 0 / 0.04)",
  _200: "oklch(1 0 0 / 0.08)",
  _300: "oklch(1 0 0 / 0.12)",
  _400: "oklch(1 0 0 / 0.18)",
  _500: "oklch(1 0 0 / 0.26)",
  _600: "oklch(1 0 0 / 0.36)",
  _700: "oklch(1 0 0 / 0.48)",
  _800: "oklch(1 0 0 / 0.64)",
  _900: "oklch(1 0 0 / 0.82)",
});
