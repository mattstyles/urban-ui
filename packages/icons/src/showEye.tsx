import { EyeIcon } from "@heroicons/react/24/outline";
import { IconProps } from "./props.ts";
import { variants } from "./variants.ts";

export function ShowEyeIcon({
	size,
	fg,
	tone,
	className,
	...props
}: IconProps) {
	return (
		<EyeIcon {...props} className={variants({ size, fg, tone, className })} />
	);
}
