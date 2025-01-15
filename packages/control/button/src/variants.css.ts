import { style, assignVars } from "@vanilla-extract/css";
import { theme } from "@urban-ui/theme";
import { anatomy } from "./anatomy.css.ts";
import { anatomy as textAnatomy } from "@urban-ui/text/anatomy";
import { radii as varRadii } from "./button.css.ts";

export const solid = style([
	{
		vars: assignVars(anatomy.bg, {
			base: theme.colors.current.element.strong.base,
			hover: theme.colors.current.element.strong.hover,
			press: theme.colors.current.element.strong.press,
		}),
	},
	{
		// This should actually be from the global white scale, as tonal colour hi won’t necessarily work against the element bg current colour
		vars: assignVars(anatomy.fg, {
			base: theme.colors.app.fg.invert.hi,
			hover: theme.colors.app.fg.invert.hi,
			press: theme.colors.app.fg.invert.hi,
		}),
	},
]);

export const ghost = style([
	{
		vars: assignVars(anatomy.bg, {
			base: theme.colors.transparency.accent[0],
			hover: theme.colors.current.element.muted.hover,
			press: theme.colors.current.element.muted.press,
		}),
	},
	{
		vars: assignVars(anatomy.fg, {
			base: theme.colors.current.fg.base.hi,
			hover: theme.colors.current.fg.base.hi,
			press: theme.colors.current.fg.base.hi,
		}),
	},
]);

export const transparent = style([
	{
		vars: assignVars(anatomy.bg, {
			base: theme.colors.core.transparent,
			hover: theme.colors.transparency.deepen[200],
			press: theme.colors.transparency.deepen[300],
		}),
	},
	{
		vars: assignVars(anatomy.fg, {
			base: theme.colors.current.fg.base.hi,
			hover: theme.colors.current.fg.base.hi,
			press: theme.colors.current.fg.base.hi,
		}),
	},
]);

// This uses tonal foreground colours, we may want a way to specify inverted colours (or even app global colours inverted or not)
export const foreground = style([
	{
		vars: {
			...assignVars(anatomy.bg, {
				base: theme.colors.core.transparent,
				hover: theme.colors.core.transparent,
				press: theme.colors.core.transparent,
			}),
			...assignVars(anatomy.fg, {
				base: theme.colors.current.fg.base.lo,
				hover: theme.colors.current.fg.base.hi,
				press: theme.colors.current.fg.base.hi,
			}),
		},
	},
]);

export const outline = style([
	{
		vars: assignVars(anatomy.bg, {
			base: theme.colors.transparency.accent[0],
			hover: theme.colors.current.element.muted.hover,
			press: theme.colors.current.element.muted.press,
		}),
	},
	{
		vars: assignVars(anatomy.fg, {
			base: theme.colors.current.fg.base.hi,
			hover: theme.colors.current.fg.base.hi,
			press: theme.colors.current.fg.base.hi,
		}),
	},
	{
		vars: assignVars(anatomy.border, {
			color: theme.colors.current.border.emphasis,
			// @TODO should pull from a border width theme variable
			width: theme.space.xxs,
		}),
	},
]);

export const sizes = {
	small: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.sm,
			}),
		},
		{
			vars: assignVars(textAnatomy.size, theme.type.size.md),
		},
		{
			vars: {
				[textAnatomy.capHeight]: theme.type.capHeight.md,
			},
		},
	]),
	standard: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.md,
			}),
		},
		{
			vars: assignVars(textAnatomy.size, theme.type.size.md),
		},
		{
			vars: {
				[textAnatomy.capHeight]: theme.type.capHeight.md,
			},
		},
	]),
	large: style([
		{
			vars: assignVars(anatomy.size, {
				height: theme.sizes.control.lg,
			}),
		},
		{
			vars: assignVars(textAnatomy.size, theme.type.size.lg),
		},
		{
			vars: {
				[textAnatomy.capHeight]: theme.type.capHeight.lg,
			},
		},
	]),
	fill: style({
		vars: assignVars(anatomy.size, {
			height: "100%",
		}),
		height: anatomy.size.height,
	}),
};

export const scale = style({
	transition: `transform ${theme.transition.duration.sm} ${theme.transition.easing.bounce}`,

	vars: {
		[anatomy.transition.transform]: "scale(0.97)",
	},
	selectors: {
		"&[data-pressed=true]": {
			transform: anatomy.transition.transform,
		},
	},
});

export const effects = { scale };

export const radii = {
	sm: style({
		vars: {
			[varRadii]: theme.radii.sm,
		},
	}),
	md: style({
		vars: {
			[varRadii]: theme.radii.md,
		},
	}),
	lg: style({
		vars: {
			[varRadii]: theme.radii.lg,
		},
	}),
	circular: style({
		vars: {
			[varRadii]: theme.radii.circular,
		},
	}),
};
