import { createTheme } from "@vanilla-extract/css";
import { theme } from "./theme.css.ts";

const primary = createTheme(theme.colors.current, theme.colors.primary);

// @TODO don't think we need this as they are wrapped up in to atoms now
export const tones = {
	primary,
};
