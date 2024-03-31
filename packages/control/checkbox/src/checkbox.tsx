"use client";

import type { VariantProps } from "cva";
import type { AriaCheckboxProps } from "@react-aria/checkbox";

import { forwardRef, useRef, useMemo } from "react";
import { mergeProps, useObjectRef, mergeRefs } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { cva } from "cva";
import cx from "clsx";
import { atoms } from "@urban-ui/theme/atoms";
import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { CheckIcon } from "@urban-ui/icons";
import { base, container } from "./checkbox.css.ts";
import { sizes, radii, variant, background } from "./variants.css.ts";

const containerVariants = cva([container], {
	variants: {
		size: {
			sm: sizes.sm,
			md: sizes.md,
			lg: sizes.lg,
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const variants = cva([base], {
	variants: {
		variant: {
			solid: variant.solid,
		},
		background: {
			app: {},
			surface: {},
		},
		muted: { true: null, false: null },
		radii: {
			sm: radii.sm,
			md: radii.md,
			lg: radii.lg,
			circular: radii.circular,
		},
		tone: {
			primary: atoms({ tone: "primary" }),
			neutral: atoms({ tone: "neutral" }),
			critical: atoms({ tone: "critical" }),
			positive: "",
			caution: "",
		},
	},
	compoundVariants: [
		{
			background: "app",
			muted: true,
			className: background.app.muted,
		},
		{
			background: "app",
			muted: false,
			className: background.app.base,
		},
		{
			background: "surface",
			muted: true,
			className: background.surface.muted,
		},
		{
			background: "surface",
			muted: false,
			className: background.surface.base,
		},
	],
	defaultVariants: {
		variant: "solid",
		radii: "sm",
		background: "app",
		muted: true,
	},
});

export interface CheckboxProps
	extends AriaCheckboxProps,
		VariantProps<typeof containerVariants>,
		VariantProps<typeof variants>,
		React.PropsWithChildren {
	className?: string;
}
type ElementType = HTMLInputElement;

export const Checkbox = forwardRef<ElementType, CheckboxProps>(
	({ size, radii, variant, tone, className, ...props }, passRef) => {
		const innerRef = useRef<ElementType>(null);
		const ref = useObjectRef(
			useMemo(() => {
				return mergeRefs(passRef, innerRef);
			}, [passRef, innerRef]),
		);

		const state = useToggleState(props);
		const { inputProps, isPressed, isSelected } = useCheckbox(
			props,
			state,
			ref,
		);
		const { hoverProps, isHovered } = useHover(props);
		const { focusProps, isFocusVisible, isFocused } = useFocusRing();

		const children =
			typeof props.children === "string" ? (
				<Text>{props.children}</Text>
			) : (
				props.children
			);

		return (
			<Flex
				asChild
				fit
				alignment="center"
				gap="md"
				{...hoverProps}
				className={containerVariants({ size })}
			>
				<label>
					<VisuallyHidden>
						<input
							{...mergeProps(inputProps, focusProps, hoverProps)}
							ref={ref}
						/>
					</VisuallyHidden>
					<Flex
						alignment="center"
						justify="center"
						className={variants({ radii, variant, tone, className })}
						data-disabled={inputProps.disabled}
						data-selected={isSelected}
						data-pressed={isPressed}
						data-hovered={isHovered}
						data-focused={isFocused}
						data-focus-visible={isFocusVisible}
					>
						<CheckIcon
							aria-hidden
							strokeWidth={3}
							size={size === "sm" ? "md" : "lg"}
						/>
					</Flex>
					{children}
				</label>
			</Flex>
		);
	},
);
Checkbox.displayName = "Urban.Checkbox";
