import { defineProperties } from "@vanilla-extract/sprinkles";

export const pointer = defineProperties({
	properties: {
		pointerEvents: ["auto", "none", "fill", "stroke", "unset"],
		cursor: ["not-allowed", "auto", "default", "pointer"],
		userSelect: ["none", "text", "all", "auto"],
	},
});
