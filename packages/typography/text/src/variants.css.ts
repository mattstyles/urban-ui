import {
	style,
	assignVars,
	createVar,
	fallbackVar,
} from "@vanilla-extract/css";
import { theme } from "@urban-ui/theme";
import { anatomy } from "./anatomy.css.ts";
import { mapValues } from "@urban-ui/utils";

/**
 * Scoped capsize variables.
 * This allows us to apply fallback variables when applying createTextStyle.
 */
export const sizeVars = {
	fontSize: createVar(),
	lineHeight: createVar(),
	capHeightTrim: createVar(),
	baselineTrim: createVar(),
};

export const sizes = mapValues(theme.type.size, (capsize) => {
	return style({
		vars: assignVars(sizeVars, capsize),
	});
});

export const font = mapValues(theme.type.font, (value) => {
	return style({
		vars: {
			[anatomy.font]: value,
		},
	});
});

export const weights = mapValues(theme.type.weight, (value) => {
	return style({
		vars: {
			[anatomy.weight]: value,
		},
	});
});

export const kerning = mapValues(theme.type.kerning, (value) => {
	return style({
		vars: {
			[anatomy.kerning]: value,
		},
	});
});

export const strong = style({
	vars: {
		[anatomy.weight]: "700",
	},
});

export const em = style({
	vars: {
		[anatomy.style]: "italic",
	},
});

export const colors = {
	inherit: style({
		vars: assignVars(anatomy.color, {
			hi: "inherit",
			lo: "inherit",
		}),
	}),
	fg: {
		hi: style({
			color: fallbackVar(
				anatomy.color.hi,
				theme.colors.fg.hi,
				// Currently colors.fg.hi is _always_ set so this additional fallback is unnecessary
				theme.colors.current.fg.base.hi,
			),
		}),
		lo: style({
			color: fallbackVar(
				anatomy.color.lo,
				theme.colors.fg.lo,
				theme.colors.current.fg.base.lo,
			),
		}),
	},
	// invert: style({
	//   vars: assignVars(anatomy.color, theme.colors.current.fg.invert),
	// }),
};
