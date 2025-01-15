import { defineProperties } from "@vanilla-extract/sprinkles";
import { assignVars } from "@vanilla-extract/css";
import { theme } from "../theme.css.ts";
import { mapValues } from "@urban-ui/utils";

function mapBackground<T>(value: T) {
	return {
		backgroundColor: value,
	};
}

export const background = defineProperties({
	properties: {
		app: mapValues(theme.colors.app.bg, mapBackground),
		surface: mapValues(theme.colors.current.surface, mapBackground),
		muted: mapValues(theme.colors.current.element.muted, mapBackground),
		strong: mapValues(theme.colors.current.element.strong, mapBackground),
	},
});

/**
 * Color.hi, color.lo, fg.hi, fg.lo are used to apply css properties.
 * All other values apply variables.
 */
export const foreground = defineProperties({
	properties: {
		color: {
			hi: {
				color: theme.colors.fg.hi,
			},
			lo: {
				color: theme.colors.fg.lo,
			},
		},
		contrast: {
			hi: {
				color: theme.colors.fg.hi,
			},
			lo: {
				color: theme.colors.fg.lo,
			},
		},
		fg: {
			hi: {
				color: theme.colors.fg.hi,
			},
			lo: {
				color: theme.colors.fg.lo,
			},
			// Tones
			current: {
				vars: assignVars(theme.colors.fg, theme.colors.current.fg.base),
			},
			tone: {
				vars: assignVars(theme.colors.fg, theme.colors.current.fg.base),
			},
			app: {
				vars: assignVars(theme.colors.fg, theme.colors.app.fg.base),
			},
			primary: {
				vars: assignVars(theme.colors.fg, theme.colors.primary.fg.base),
			},
			neutral: {
				vars: assignVars(theme.colors.fg, theme.colors.neutral.fg.base),
			},
			critical: {
				vars: assignVars(theme.colors.fg, theme.colors.critical.fg.base),
			},
			invert: {
				vars: assignVars(theme.colors.fg, theme.colors.current.fg.invert),
			},
		},
		invert: {
			app: {
				vars: assignVars(theme.colors.fg, theme.colors.app.fg.invert),
			},
			tone: {
				vars: assignVars(theme.colors.fg, theme.colors.current.fg.invert),
			},
		},
	},
});

export const tone = defineProperties({
	properties: {
		tone: {
			primary: {
				vars: assignVars(theme.colors.current, theme.colors.primary),
				// vars: {
				//   ...assignVars(theme.colors.current, theme.colors.primary),
				//   ...assignVars(theme.colors.fg, theme.colors.primary.fg.base),
				// },
			},
			neutral: {
				vars: assignVars(theme.colors.current, theme.colors.neutral),
			},
			critical: {
				vars: assignVars(theme.colors.current, theme.colors.critical),
			},
		},
	},
});

export const opacity = defineProperties({
	properties: {
		opacity: ["1", "0", "0.2", "0.4", "0.6", "0.8"],
	},
});
