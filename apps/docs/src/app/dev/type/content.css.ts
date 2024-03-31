import { style, assignVars } from "@vanilla-extract/css";
import { theme } from "@urban-ui/theme";
import { atoms } from "@urban-ui/theme/atoms";
import { anatomy as textAnatomy } from "@urban-ui/text/anatomy";

export const column = style({
	width: 300,
});

// Only background color, inverted tone would have to come from the text component itself
export const customPanel = style({
	backgroundColor: "slategray",
});

// Also sets text colour to be inverted
export const darkPanel = style({
	backgroundColor: theme.colors.current.element.strong.base,
	vars: assignVars(textAnatomy.color, theme.colors.current.fg.invert),
});

// Sets global foreground colour which should be the preferred mechanism
export const darkPanel2 = style({
	backgroundColor: theme.colors.current.element.strong.base,
	vars: assignVars(theme.colors.fg, theme.colors.app.fg.invert),
});

export const lightPanel = style({
	backgroundColor: theme.colors.current.surface.emphasis,
	vars: assignVars(theme.colors.fg, theme.colors.current.fg.base),
});

export const lightPanel2 = style([
	atoms({ invert: "tone", tone: "primary" }),
	{
		backgroundColor: theme.colors.current.element.strong.base,
	},
]);
