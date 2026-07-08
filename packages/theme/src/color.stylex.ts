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
  // Authored black-alpha per authored-derivation — derived with the shade
  // ramp's vocabulary but pitched for modal recession (no step equivalent).
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
  trace: "oklch(0.62 0.03 255 / 0.14)",
  glow: "oklch(0.82 0.05 255 / 0.12)",
});

/**
 * Accent flavour scale — the identity hue (cyan). `fill` is the seed
 * directly (fill-takes-seed).
 */
export const accent = stylex.defineVars({
  subtle: "oklch(0.28 0.055 195)",
  fill: "oklch(0.75 0.13 195)",
  border: "oklch(0.45 0.085 195)",
  line: "oklch(0.6 0.11 195)",
  ink: "oklch(0.85 0.12 195)",
  inkSecondary: "oklch(0.76 0.1 195)",
  inkTertiary: "oklch(0.68 0.085 195)",
  icon: "oklch(0.8 0.11 195)",
  onFill: "oklch(0.16 0.03 195)",
  onFillSecondary: "oklch(0.27 0.045 195)",
  trace: "oklch(0.7 0.13 195 / 0.14)",
  glow: "oklch(0.82 0.16 195 / 0.12)",
});

/**
 * Status scales — one equi-perceptual family (empirical-categories): the
 * three share every L/C value and differ only in hue, so a retune moves
 * them as one.
 */
export const positive = stylex.defineVars({
  subtle: "oklch(0.28 0.055 150)",
  fill: "oklch(0.72 0.15 150)",
  border: "oklch(0.45 0.085 150)",
  line: "oklch(0.6 0.11 150)",
  ink: "oklch(0.85 0.12 150)",
  inkSecondary: "oklch(0.76 0.1 150)",
  inkTertiary: "oklch(0.68 0.085 150)",
  icon: "oklch(0.8 0.11 150)",
  onFill: "oklch(0.16 0.03 150)",
  onFillSecondary: "oklch(0.27 0.045 150)",
  trace: "oklch(0.7 0.13 150 / 0.14)",
  glow: "oklch(0.82 0.16 150 / 0.12)",
});

export const warning = stylex.defineVars({
  subtle: "oklch(0.28 0.055 85)",
  fill: "oklch(0.72 0.15 85)",
  border: "oklch(0.45 0.085 85)",
  line: "oklch(0.6 0.11 85)",
  ink: "oklch(0.85 0.12 85)",
  inkSecondary: "oklch(0.76 0.1 85)",
  inkTertiary: "oklch(0.68 0.085 85)",
  icon: "oklch(0.8 0.11 85)",
  onFill: "oklch(0.16 0.03 85)",
  onFillSecondary: "oklch(0.27 0.045 85)",
  trace: "oklch(0.7 0.13 85 / 0.14)",
  glow: "oklch(0.82 0.16 85 / 0.12)",
});

export const danger = stylex.defineVars({
  subtle: "oklch(0.28 0.055 25)",
  fill: "oklch(0.72 0.15 25)",
  border: "oklch(0.45 0.085 25)",
  line: "oklch(0.6 0.11 25)",
  ink: "oklch(0.85 0.12 25)",
  inkSecondary: "oklch(0.76 0.1 25)",
  inkTertiary: "oklch(0.68 0.085 25)",
  icon: "oklch(0.8 0.11 25)",
  onFill: "oklch(0.16 0.03 25)",
  onFillSecondary: "oklch(0.27 0.045 25)",
  trace: "oklch(0.7 0.13 25 / 0.14)",
  glow: "oklch(0.82 0.16 25 / 0.12)",
});

/**
 * Scale-less app-wide singletons. Contract group name is `static` —
 * exported as `statics` because `static` is a JS reserved word. Carrier
 * rename only: prose cites the contract name; the generated manifest
 * records the exported binding.
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

/**
 * Semantic emphasis derivation pair — scheme-variant (no-scheme-switch):
 * `advance` moves toward the viewer, `recede` away, in whatever scheme is
 * active. Dark facet authored: advance lightens (white alpha), recede
 * darkens (black alpha); light's facet flips the polarity when authored.
 * All emphasis moves (hover washes, press moves, selected lifts) derive
 * from this pair (emphasis-pair).
 */
export const advance = stylex.defineVars({
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

export const recede = stylex.defineVars({
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
