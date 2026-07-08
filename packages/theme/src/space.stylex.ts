import * as stylex from "@stylexjs/stylex";

/**
 * Space domain — gap (between siblings) and inset (content → edge), each a
 * semantic trio keyed to the layer model (plane · container · control), over
 * the shared size ramp that refines below the trio defaults (theme-contract).
 * Spacing comes from padding and gap only (no-margin), and every value is
 * tuned to the leading-trimmed rendering (leading-trim): a gap is visible
 * whitespace, not font box.
 *
 * The one structural spacing relationship: a header sits tighter to its
 * content than peers sit to each other (header-proximity) — recipes express
 * it by stepping below the ambient gap.
 */

/**
 * The shared size ramp — the spacing face of the one coordinated size-world
 * (size vocabulary xs–xl) that also pitches UI text and, later, control
 * sizes (urban-ui-6yb).
 */
export const size = stylex.defineVars({
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
});

/**
 * Defaults between siblings, keyed to what the parent contains. Between-ness
 * varies by relatedness within a layer, so the raw ramp refines below these
 * (an icon↔label pair sits below gap.control).
 */
export const gap = stylex.defineVars({
  plane: "1.5rem",
  container: "1rem",
  control: "0.5rem",
});

/**
 * Content → edge, keyed to the layer. `inset.control` is the md-anchor;
 * sized controls chain their padding via control sizing (urban-ui-6yb).
 */
export const inset = stylex.defineVars({
  plane: "1.5rem",
  container: "1rem",
  control: "0.625rem",
});
