import { colors } from "@stylexjs/open-props/lib/colors.stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { spacing } from "@urban-ui/theme/spacing.stylex";
import { forwardRef } from "react";
import { gaps } from "./vars.stylex.tsx";

console.log(spacing);
console.log(gaps);

const styles = stylex.create({
	base: {
		display: "flex",
		backgroundColor: colors.blue7,
	},
	gapSm: {
		// gap: gaps.sm,
		gap: spacing.sm,
		// gap: 8,
	},
	gapMd: {
		// gap: spacing.md,
		gap: 16,
	},
});

export interface FlexProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style">,
		React.PropsWithChildren {
	gap?: "sm" | "md";
	// @TODO is this a good idea to override the html attribute?
	style?: StyleXStyles;
	asChild?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			// orientation,
			// alignment,
			// justify,
			gap = "sm",
			// inline,
			// fit,
			// flex,
			// wrap,
			asChild,
			className,
			// stylex: style,
			style,
			children,
			...props
		},
		ref,
	) => {
		// const Comp = asChild ? Slot : "div";
		return (
			<div
				{...stylex.props(
					styles.base,
					gap === "sm" && styles.gapSm,
					gap === "md" && styles.gapMd,
					style,
				)}
			>
				{children}
			</div>
		);
	},
);
