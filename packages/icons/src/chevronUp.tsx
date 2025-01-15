import { ChevronUpIcon as Icon } from "@heroicons/react/24/outline";
import type { IconProps } from "./props.ts";
import { variants } from "./variants.ts";

export function ChevronUpIcon({
	size,
	fg,
	tone,
	className,
	...props
}: IconProps) {
	return (
		<Icon {...props} className={variants({ size, fg, tone, className })} />
	);
}
