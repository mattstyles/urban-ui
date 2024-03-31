import {
	style,
	fallbackVar,
	createVar,
	assignVars,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { atoms } from "@urban-ui/theme/atoms";
import { theme } from "@urban-ui/theme";
import { anatomy } from "./anatomy.css.ts";

export const base = style([
	atoms({
		fontWeight: "normal",
		kerning: "md",
		display: "flex",
		flex: "full",
	}),
	{
		appearance: "none",
		outline: "none",
		border: "none",

		color: anatomy.fg.base,
		background: anatomy.bg.base,

		vars: {},

		selectors: {
			"&[disabled]": {
				background: theme.colors.core.disabled.bg,
				color: theme.colors.core.disabled.fg,
				cursor: "not-allowed",
			},
		},
	},
]);
