import * as stylex from "@stylexjs/stylex";

/**
 * UI text scale — text that balances against its environment (theme-contract,
 * theme-guidelines). Two coordinated ramp groups carry the `{fontSize,
 * lineHeight}` pairs (they re-pitch together — the size-world category), and
 * the voice roles are voice-only: family/weight/tracking, exported with a
 * `Voice` suffix (carrier disambiguation: token-group names are one global
 * namespace in the manifest, and `heading`/`subheading` belong to the
 * editorial scale's role names too — prose cites the contract names). Size comes from
 * context (a `label` voice at the `sm` step), so role and control size never
 * fight; each role's default ramp step is documented on the group.
 * Structural constants (textTransform and friends) live in recipes, never
 * here. All values assume the leading-trim law (leading-trim): line-height
 * is designed internal leading, not phantom spacing.
 *
 * md = 16px = 1rem is the shared anchor with the editorial scale.
 */

export const fontSize = stylex.defineVars({
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
});

export const lineHeight = stylex.defineVars({
  xs: "1rem",
  sm: "1.25rem",
  md: "1.5rem",
  lg: "1.75rem",
  xl: "2rem",
});

/** Wayfinding chrome — panel and page headings. Default step: `lg`. */
export const headingVoice = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "650",
  tracking: "-0.01em",
});

/** Secondary wayfinding under a heading. Default step: `md`. */
export const subheadingVoice = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "600",
  tracking: "0",
});

/** Names a control or field. Default step: `sm`. */
export const labelVoice = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "500",
  tracking: "0.01em",
});

/** Text that performs — buttons, links-as-actions. Default step: `sm`. */
export const actionVoice = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "600",
  tracking: "0.02em",
});

/**
 * The running-text workhorse: errors, descriptions, helper text.
 * Default step: `md`.
 */
export const textVoice = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "400",
  tracking: "0",
});
