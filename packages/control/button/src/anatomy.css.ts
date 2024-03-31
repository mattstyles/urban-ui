import { createThemeContract } from "@vanilla-extract/css";

export const color = createThemeContract({
	base: null,
	hover: null,
	press: null,
});

export const border = createThemeContract({
	color: null,
	width: null,
});

export const transition = createThemeContract({
	color: null,
	transform: null,
});

// Add sizes for padding, such as height and text-to-edge variables
export const size = createThemeContract({
	height: null,
});

/**
 * Button component anatomy
 */
export const anatomy = createThemeContract({
	bg: color,
	fg: color,
	border,
	size,
	transition,
});
