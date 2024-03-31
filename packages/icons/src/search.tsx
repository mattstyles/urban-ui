import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { IconProps } from "./props.ts";
import { variants } from "./variants.ts";

export function SearchIcon({ size, fg, tone, className, ...props }: IconProps) {
	return (
		<MagnifyingGlassIcon
			{...props}
			className={variants({ size, fg, tone, className })}
		/>
	);
}
