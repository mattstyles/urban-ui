"use client";

import type { CheckboxGroupState } from "@react-stately/checkbox";

import { createContext, useContext } from "react";
const CheckboxGroupContext = createContext<CheckboxGroupState | null>(null);

type CheckboxGroupContextProps = React.PropsWithChildren<{
	value: CheckboxGroupState;
}>;
export function CheckboxGroupStateProvider({
	value,
	children,
}: CheckboxGroupContextProps) {
	return (
		<CheckboxGroupContext.Provider value={value}>
			{children}
		</CheckboxGroupContext.Provider>
	);
}

export function useCheckboxGroupContextState() {
	const state = useContext(CheckboxGroupContext);
	if (state == null) {
		throw new Error("Checkbox must be a part of a checkbox group");
	}
	return state;
}
