import type { VariantProps } from "cva";

import { forwardRef } from "react";
import { cva } from "cva";
import { Slot } from "@radix-ui/react-slot";
import { atoms } from "@urban-ui/theme/atoms";

const variants = cva(
	[
		atoms({
			display: "inline-block",
		}),
	],
	{
		variants: {
			orientation: { h: "", v: "" },
			gap: {
				xs: "",
				sm: "",
				md: "",
				lg: "",
				xl: "",
			},
		},
		compoundVariants: [
			{
				orientation: "h",
				gap: "xs",
				className: atoms({
					pl: "xs",
				}),
			},
			{
				orientation: "h",
				gap: "sm",
				className: atoms({
					pl: "sm",
				}),
			},
			{
				orientation: "h",
				gap: "md",
				className: atoms({
					pl: "md",
				}),
			},
			{
				orientation: "h",
				gap: "lg",
				className: atoms({
					pl: "lg",
				}),
			},
			{
				orientation: "h",
				gap: "xl",
				className: atoms({
					pl: "xl",
				}),
			},
			{
				orientation: "v",
				gap: "xs",
				className: atoms({
					pt: "xs",
				}),
			},
			{
				orientation: "v",
				gap: "sm",
				className: atoms({
					pt: "sm",
				}),
			},
			{
				orientation: "v",
				gap: "md",
				className: atoms({
					pt: "md",
				}),
			},
			{
				orientation: "v",
				gap: "lg",
				className: atoms({
					pt: "lg",
				}),
			},
			{
				orientation: "v",
				gap: "xl",
				className: atoms({
					pt: "xl",
				}),
			},
		],
	},
);

export interface SpacerProps
	extends VariantProps<typeof variants>,
		React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
	({ orientation, gap, asChild = false, className, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				ref={ref}
				className={variants({ orientation, gap, className })}
				{...props}
			/>
		);
	},
);
Spacer.displayName = "Spacer";
