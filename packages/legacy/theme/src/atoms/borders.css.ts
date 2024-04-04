import { defineProperties } from "@vanilla-extract/sprinkles";
import { mapValues } from "@urban-ui/utils";
import { theme } from "../theme.css.ts";

export const radii = defineProperties({
	properties: {
		borderRadius: theme.radii,
	},
	shorthands: {
		radii: ["borderRadius"],
	},
});

function mapBorderColour<T>(value: T) {
	return {
		borderColor: value,
	};
}

export const borders = defineProperties({
	properties: {
		borderColor: mapValues(theme.colors.current.border, mapBorderColour),
		borderWidth: theme.borderWidth,
		borderStyle: ["solid", "none"],
		borderRadius: theme.radii,
		border: {
			muted: {
				borderWidth: theme.borderWidth.md,
				borderStyle: "solid",
				borderColor: theme.colors.current.border.muted,
			},
			base: {
				borderWidth: theme.borderWidth.md,
				borderStyle: "solid",
				borderColor: theme.colors.current.border.base,
			},
			subtle: {
				borderWidth: theme.borderWidth.md,
				borderStyle: "solid",
				borderColor: theme.colors.current.border.subtle,
			},
			emphasis: {
				borderWidth: theme.borderWidth.md,
				borderStyle: "solid",
				borderColor: theme.colors.current.border.emphasis,
			},
			underline: {
				borderWidth: theme.borderWidth.md,
				borderStyle: "solid",
				borderBottomColor: theme.colors.current.border.base,
			},
		},
	},
	shorthands: {
		radii: ["borderRadius"],
	},
});
