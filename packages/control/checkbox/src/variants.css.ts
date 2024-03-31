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

export const variant = {
	solid: style({
		vars: {
			[anatomy.bg.select]: theme.colors.current.element.strong.base,
			[anatomy.fg.base]: theme.colors.core.transparent,
			[anatomy.fg.hover]: theme.colors.core.transparent,
			[anatomy.fg.press]: theme.colors.core.transparent,
			[anatomy.fg.select]: theme.colors.app.fg.invert.hi,
			[anatomy.border.color]: theme.colors.current.border.muted,
		},
		selectors: {
			"&[data-hovered=true]": {
				vars: {
					[anatomy.border.color]: theme.colors.current.element.strong.base,
				},
			},
			"&[data-selected=true]": {
				vars: {
					[anatomy.border.color]: theme.colors.current.element.strong.base,
				},
			},
		},
	}),
};

export const background = {
	app: {
		muted: style({
			vars: {
				[anatomy.bg.base]: theme.colors.app.bg.muted,
				[anatomy.bg.hover]: theme.colors.app.bg.muted,
				[anatomy.bg.press]: theme.colors.app.bg.muted,
			},
			// backgroundColor: theme.colors.app.bg.muted,
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

export const radii = {
	sm: style({
		vars: {
			[anatomy.border.radii]: theme.radii.sm,
		},
	}),
	md: style({
		vars: {
			[anatomy.border.radii]: theme.radii.md,
		},
	}),
	lg: style({
		vars: {
			[anatomy.border.radii]: theme.radii.lg,
		},
	}),
	circular: style({
		vars: {
			[anatomy.border.radii]: theme.radii.circular,
		},
	}),
};
