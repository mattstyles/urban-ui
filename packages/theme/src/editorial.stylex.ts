import * as stylex from "@stylexjs/stylex";

/**
 * Editorial text scale — text that balances against itself: long-form you
 * actually read (theme-contract). Role-first with the ramp hidden: every
 * role carries the full anatomy (family/weight/size/tracking/leading),
 * generous leading, big differentiation. `heading` also exists in the UI
 * scale and is deliberately never shared — a panel heading is wayfinding
 * chrome; an article heading is typographic architecture.
 *
 * The editorial *layout* subsystem (relatedness grammar, container grammar)
 * is its own area, specced with the editorial probe — these are roles only.
 * md = 16px = 1rem anchors both scales.
 */

export const display = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "700",
  fontSize: "3rem",
  tracking: "-0.02em",
  leading: "3.25rem",
});

export const heading = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "650",
  fontSize: "2rem",
  tracking: "-0.015em",
  leading: "2.5rem",
});

export const subheading = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "600",
  fontSize: "1.5rem",
  tracking: "-0.01em",
  leading: "2rem",
});

/** Small announce line above a heading; uppercase lives in recipes. */
export const kicker = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "600",
  fontSize: "0.875rem",
  tracking: "0.08em",
  leading: "1.125rem",
});

export const lede = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "400",
  fontSize: "1.25rem",
  tracking: "0",
  leading: "1.875rem",
});

export const body = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "400",
  fontSize: "1rem",
  tracking: "0",
  leading: "1.625rem",
});

export const mono = stylex.defineVars({
  family: "ui-monospace, 'SF Mono', Menlo, monospace",
  weight: "450",
  fontSize: "0.9375rem",
  tracking: "0",
  leading: "1.5rem",
});

export const caption = stylex.defineVars({
  family: "system-ui, sans-serif",
  weight: "400",
  fontSize: "0.8125rem",
  tracking: "0.01em",
  leading: "1.125rem",
});
