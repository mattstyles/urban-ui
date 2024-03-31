"use client";

import type { Validation, InputBase } from "@react-types/shared";
import type { FlexProps } from "@urban-ui/flex";

import { cloneElement } from "react";
import { useField } from "@react-aria/label";
import { mergeProps } from "@react-aria/utils";
import { Flex } from "@urban-ui/flex";
import { useSlots } from "@urban-ui/slot";

export interface RootProps
	extends React.PropsWithChildren,
		FlexProps,
		Validation,
		InputBase {}
//{
//   isDisabled?: boolean
//   validationState?: 'invalid' | 'valid'
// }
export function Root({ children, id, ...props }: RootProps) {
	// The actual content of the label does not seem to matter here, react-aria will generate a unique id anyway.
	// If an id is passed in then it will be used.
	const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
		useField({
			...props,
			id: id,
			label: "label",

			// Not sure that we need these, seems to work fine without
			// description: 'description',
			// errorMessage: 'error',
		});

	const { isDisabled, validationState, isReadOnly, isRequired, ...rest } =
		props;

	const computedChildren = useSlots(children, {
		label: (child) => {
			return cloneElement(child, mergeProps(child.props, labelProps));
		},
		requiredLabel: (child) => {
			if (isRequired == null || isRequired === false) {
				return null;
			}
			return cloneElement(child, { tone: "critical" });
		},
		field: (child) => {
			return cloneElement(
				child,
				mergeProps(child.props, fieldProps, {
					isDisabled,
					validationState,
					isReadOnly,
					isRequired,
					tone: validationState === "invalid" ? "critical" : null,
				}),
			);
		},
		description: (child) => {
			if (validationState === "invalid") {
				return null;
			}

			return cloneElement(child, mergeProps(child.props, descriptionProps));
		},
		errorMessage: (child) => {
			if (validationState === "valid") {
				return null;
			}

			return cloneElement(
				child,
				mergeProps(child.props, errorMessageProps, {
					tone: "critical",
				}),
			);
		},
	});

	return <Flex {...rest}>{computedChildren}</Flex>;
}
