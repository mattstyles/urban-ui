"use client";

import type { Slot } from "@radix-ui/react-slot";
import type { AriaButtonProps } from "@react-aria/button";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, mergeRefs, useObjectRef } from "@react-aria/utils";
import { Text } from "@urban-ui/text";
import { atoms } from "@urban-ui/theme/atoms";
import cx from "clsx";
import type { VariantProps } from "cva";
import { cva } from "cva";
import * as React from "react";
import { forwardRef, useMemo, useRef } from "react";
import { base, components, shaping } from "./button.css.ts";
import {
	effects,
	foreground,
	ghost,
	outline,
	radii,
	sizes,
	solid,
	transparent,
} from "./variants.css.ts";

const variants = cva([base], {
	variants: {
		variant: {
			solid: solid,
			transparent: transparent,
			ghost: ghost,
			outline: outline,
			foreground: foreground,
		},
		tone: {
			primary: atoms({ tone: "primary" }),
			neutral: atoms({ tone: "neutral" }),
			critical: atoms({ tone: "critical" }),
			positive: "",
			caution: "",
		},
		size: {
			sm: sizes.small,
			md: sizes.standard,
			lg: sizes.large,
			fill: sizes.fill,
		},
		effect: {
			scale: effects.scale,
		},
		icon: {
			true: shaping.icon,
			false: shaping.normal,
		},
		clamp: {
			true: shaping.clamp,
		},
		fill: {
			true: sizes.fill,
		},
		radii: {
			sm: radii.sm,
			md: radii.md,
			lg: radii.lg,
			circular: radii.circular,
		},
	},
	defaultVariants: {
		radii: "md",
		icon: false,
	},
});

export interface ButtonProps
	extends Omit<AriaButtonProps, "children">,
		VariantProps<typeof variants>,
		React.PropsWithChildren {
	className?: string;
	asChild?: boolean;
	tabIndex?: number;
	children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			effect = "scale",
			variant,
			size,
			tone,
			radii,
			icon = false,
			fill = false,
			clamp,
			className,
			asChild,
			...props
		},
		passRef,
	) => {
		const innerRef = useRef<HTMLButtonElement>(null);
		const ref = useObjectRef(
			useMemo(() => {
				return mergeRefs(passRef, innerRef);
			}, [passRef]),
		);

		const { buttonProps, isPressed } = useButton(props, ref);
		const { hoverProps, isHovered } = useHover(props);
		const { focusProps, isFocusVisible, isFocused } = useFocusRing(props);

		const Components: {
			Container: typeof Slot | "button";
			passProps: PassPropsType;
		} = useMemo(() => {
			if (asChild !== true) {
				return {
					Container: "button",
					passProps: { children },
				};
			}

			return slot(children);
		}, [asChild, children]);

		const Content = useMemo(() => {
			const content = Components.passProps.children;

			if (typeof content === "string") {
				return <Text>{content}</Text>;
			}

			return content;
		}, [Components]);

		const setHeight = useMemo(() => {
			return clamp != null
				? clamp
				: typeof Components.passProps.children !== "string";
		}, [Components.passProps.children, clamp]);

		return (
			<Components.Container
				className={variants({
					variant,
					size,
					tone,
					effect,
					radii,
					icon,
					fill,
					clamp: setHeight,
					className,
				})}
				{...mergeProps(
					buttonProps,
					hoverProps,
					focusProps,
					Components.passProps,
				)}
				ref={ref}
				tabIndex={props.tabIndex}
				data-pressed={isPressed}
				data-hovered={isHovered}
				data-focused={isFocused}
				data-focus-visible={isFocusVisible}
			>
				<span className={components.hover} />
				<span className={components.press} />
				<span className={components.border} />
				<span
					className={cx(
						icon ? components.foregroundIcon : components.foreground,
					)}
				>
					{Content}
				</span>
			</Components.Container>
		);
	},
);
Button.displayName = "Urban-Button";

// type Slot = React.ForwardRefExoticComponent<
// 	React.PropsWithChildren & React.RefAttributes<HTMLElement>
// >;
type PassPropsType = {
	children?: React.ReactNode;
};

function slot(children: React.ReactNode): {
	Container: typeof Slot;
	passProps: PassPropsType;
} {
	const childArray = React.Children.toArray(children);
	const head = childArray[0];

	if (!React.isValidElement(head)) {
		throw new Error("Invalid component passed to Slot asChild");
	}

	return {
		// @ts-expect-error default exists for the type of component we should pass
		Container: head.type.default,
		passProps: head.props,
	};
}
