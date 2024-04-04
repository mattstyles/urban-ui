import { createThemeContract } from "@vanilla-extract/css";
import {
	space,
	sizes,
	alpha,
	typography,
	tone,
	background,
	coreColor,
	foreground,
	fullForeground,
	transition,
	radii,
	borderWidth,
	shadows,
} from "./system.css.ts";

export const theme = createThemeContract({
	/** --------------------------- Space/Size --------------------------- */
	space: space,
	sizes: sizes,

	/** --------------------------- Shadows --------------------------- */
	shadows: shadows,

	/** --------------------------- Borders --------------------------- */
	radii: radii,
	borderWidth: borderWidth,

	// Base colors
	colors: {
		/** --------------------------- Core --------------------------- */

		// Core alpha transparency scales
		transparency: {
			accent: alpha,
			deepen: alpha,
		},

		// Core colours
		core: coreColor,

		/**
		 * Core application colours.
		 * 4 backgrounds + 2 foreground colours for high and low contrast.
		 * App colours denote background colours on a scale of lightess/saturation.
		 */
		app: {
			bg: background,
			fg: fullForeground,
		},

		/** --------------------------- Tones --------------------------- */

		// Primary is often used as brand colours or accent colours.
		primary: tone,

		// Neutral scale, need not be grayscale though, give it a little flavour to match your app scale hues
		neutral: tone,

		// Components with this tone require immediate attention or represent destructive actions
		critical: tone,

		/** --------------------------- Dynamic --------------------------- */
		/**
		 * Dynamic colours change based on context.
		 */

		// Dynamic dynamic tonal field.
		current: tone,

		// Dynamic foreground colours
		fg: foreground,
	},

	/** --------------------------- Typography --------------------------- */
	type: typography,

	/** --------------------------- Transitions --------------------------- */
	transition: transition,
});
