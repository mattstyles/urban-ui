import * as stylex from "@stylexjs/stylex";

/**
 * Shape domain — the tokenised half of the shape system (theme-contract).
 * A silhouette is a base rect plus deformations (chamfer at corners, notch
 * at edges); both draw their cut size from this one shared ramp — one tool,
 * one machining vocabulary. Absolute px by design: a cut is a physical
 * machining depth, not a proportion.
 *
 * Application is site-owned and never tokenised: which elements carry which
 * cuts, where, at what aspect. The generator/rendering mechanism is code,
 * not tokens. Contract invariants live with the sites: a silhouette never
 * exceeds its bounding box (silhouette-bounding-box) and an element's
 * min-size must exceed its cut size (cut-min-size).
 *
 * The `profile` vocabulary (square · straight · round) is typed, not a var:
 * it parameterises the generator, not CSS (tokens-are-spec) — see the root
 * index.
 */
export const depth = stylex.defineVars({
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "14px",
  xl: "22px",
});
