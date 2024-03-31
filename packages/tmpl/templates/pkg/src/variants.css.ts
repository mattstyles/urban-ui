import { style, assignVars } from "@vanilla-extract/css";
import { theme } from "@urban-ui/theme";
import { anatomy } from "./anatomy.css.ts";

export const sizes = {
	sm: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.sm,
			}),
		},
	]),
	md: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.md,
			}),
		},
	]),
	lg: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.lg,
			}),
		},
	]),
};

export const colors = {
	app: {
		muted: style({
			backgroundColor: theme.colors.app.bg.muted,
		}),
		base: style({
			backgroundColor: theme.colors.app.bg.base,
		}),
	},
	surface: {
		muted: style({
			backgroundColor: theme.colors.current.surface.muted,
		}),
		base: style({
			backgroundColor: theme.colors.current.surface.base,
		}),
	},
};
