import { style, assignVars, createTheme } from "@vanilla-extract/css";
import { theme } from "@urban-ui/theme";

export const block = style({
	backgroundColor: theme.colors.current.surface.base,
	color: theme.colors.current.fg.base.hi,
});

export const highlightBlock = style({
	// vars: assignVars(theme.colors.base.muted, {
	//   bg: {
	//     base: 'hsl(120, 86%, 74%)',
	//     hover: 'hsl(120, 86%, 82%)',
	//     active: 'hsl(120, 86%, 89%)',
	//   },
	//   fg: {
	//     hi: 'hsl(0, 0%, 20%)',
	//     lo: 'hsl(0, 0%, 34%)',
	//   },
	// }),
});

export const primary = style({
	vars: assignVars(theme.colors.current, theme.colors.primary),
});

// export const cyberColorMode = createTheme(theme.colors, {
//   alphaLighten: theme.colors.alphaLighten,
//   alphaDarken: theme.colors.alphaDarken,
//   base: {
//     bg: {
//       muted: 'hsl(57, 98%, 44%)',
//       base: 'hsl(57, 98%, 52%)',
//       subtle: 'hsl(57, 98%, 58%)',
//       emphasis: 'hsl(57, 98%, 64%)',
//     },
//     fg: {
//       hi: 'hsl(187, 98%, 48%)',
//       lo: 'hsl(187, 88%, 41%)',
//     },
//   },
//   primary: {
//     bg: {
//       muted: 'hsl(187, 98%, 40%)',
//       base: 'hsl(187, 98%, 48%)',
//       subtle: 'hsl(187, 98%, 53%)',
//       emphasis: 'hsl(187, 98%, 60%)',
//     },
//     fg: {
//       hi: 'hsl(0, 0, 0%)',
//       lo: 'hsl(0, 0, 33%)',
//     },
//   },
//   subtle: {
//     bg: {
//       muted: 'hsl(187, 98%, 20%)',
//       base: 'hsl(187, 98%, 28%)',
//       subtle: 'hsl(187, 98%, 33%)',
//       emphasis: 'hsl(187, 98%, 42%)',
//     },
//     fg: {
//       hi: 'hsl(0, 0, 0%)',
//       lo: 'hsl(0, 0, 33%)',
//     },
//   },
// })
