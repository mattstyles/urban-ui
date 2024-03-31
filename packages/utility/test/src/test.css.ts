import { theme } from "@urban-ui/theme";
import { style } from "@vanilla-extract/css";

export const content = style({
	color: theme.colors.core.black,
});

export const inner = style({
	paddingLeft: theme.space.md,
	paddingRight: theme.space.md,
	color: theme.colors.app.fg.base.hi,
});
