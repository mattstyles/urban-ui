import * as stylex from "@stylexjs/stylex";

// import { spacing } from "@urban-ui/theme/spacing.stylex";

// This works, but importing from an external package does not. Check openprops, which works.
export const gaps = stylex.defineVars({
	sm: "32px",
	// As expected, this borks, same as using in stylex.create call
	// sm: spacing.sm,
	md: "16px",
});
