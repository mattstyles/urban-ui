"use client";

import type { VariantProps } from "cva";
import type { CheckboxGroupProps } from "@react-types/checkbox";

import { forwardRef } from "react";
import { useCheckboxGroupState } from "@react-stately/checkbox";
import { useCheckboxGroup } from "@react-aria/checkbox";
import { cva } from "cva";
import cx from "clsx";
import { atoms } from "@urban-ui/theme/atoms";
import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { CheckboxGroupStateProvider } from "./context.tsx";

const variants = cva("", {
	variants: {
		tone: {
			critical: atoms({ tone: "critical" }),
			neutral: atoms({ tone: "neutral" }),
			primary: atoms({ tone: "primary" }),
		},
	},
});

export interface GroupProps
	extends CheckboxGroupProps,
		VariantProps<typeof variants>,
		React.PropsWithChildren {
	className?: string;
	label: string;
	description?: string;
	errorMessage?: string;
	orientation?: "h" | "v";
}
type ElementType = HTMLDivElement;

export const Group = forwardRef<ElementType, GroupProps>(
	({ tone, className, orientation = "v", ...props }, ref) => {
		const state = useCheckboxGroupState(props);
		const { groupProps, labelProps, descriptionProps, errorMessageProps } =
			useCheckboxGroup(props, state);

		return (
			<Flex
				orientation="v"
				gap="md"
				ref={ref}
				className={cx(
					variants({ tone, className }),
					props.isInvalid && atoms({ tone: "critical" }),
				)}
				{...groupProps}
			>
				<Text asChild {...labelProps}>
					<label>{props.label}</label>
				</Text>
				{props.description && (
					<Text size="sm" {...descriptionProps}>
						{props.description}
					</Text>
				)}
				<CheckboxGroupStateProvider value={state}>
					<Flex
						orientation={orientation}
						gap={orientation === "h" ? "lg" : "none"}
					>
						{props.children}
					</Flex>
				</CheckboxGroupStateProvider>
				{props.errorMessage && state.isInvalid && (
					<Text tone {...errorMessageProps}>
						{props.errorMessage}
					</Text>
				)}
			</Flex>
		);
	},
);
