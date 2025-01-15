import { anatomy as textAnatomy } from "@urban-ui/text/anatomy";

import { style, assignVars } from "@vanilla-extract/css";
import { atoms } from "@urban-ui/theme/atoms";
import { theme } from "@urban-ui/theme";
import { anatomy } from "./anatomy.css.ts";

export const base = style([
	atoms({
		width: "fill",
	}),
	{
		vars: {
			[anatomy.px]: theme.space.md,
			[anatomy.py]: theme.space.md,
		},
	},
]);

export const header = style([
	atoms({
		// fontSize: 'lg',
		// fontWeight: 'semibold',
	}),
	{
		vars: {
			...assignVars(textAnatomy.size, theme.type.size.lg),
			[textAnatomy.weight]: theme.type.weight.semibold,
		},
	},
]);

export const padding = {
	px: style({
		paddingLeft: anatomy.px,
		paddingRight: anatomy.px,
	}),
	py: style({
		paddingTop: anatomy.py,
		paddingBottom: anatomy.py,
	}),
};
