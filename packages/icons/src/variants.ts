import { cva } from "cva";
import { atoms } from "@urban-ui/theme/atoms";
import { base } from "./styles.css.ts";

export const variants = cva(base, {
	variants: {
		size: {
			sm: atoms({ size: "sm" }),
			md: atoms({ size: "md" }),
			lg: atoms({ size: "lg" }),
			xl: atoms({ size: "xl" }),
			xxl: atoms({ size: "xxl" }),
			fill: atoms({ size: "fill" }),
		},
		fg: {
			hi: atoms({ fg: "hi" }),
			lo: atoms({ fg: "lo" }),
		},
		tone: {
			critical: atoms({ fg: "critical" }),
			neutral: atoms({ fg: "neutral" }),
			primary: atoms({ fg: "primary" }),
		},
	},
	defaultVariants: {
		size: "xl",
	},
});
