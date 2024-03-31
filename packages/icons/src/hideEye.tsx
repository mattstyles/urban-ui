import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { IconProps } from "./props.ts";
import { variants } from "./variants.ts";

export function HideEyeIcon({
	size,
	fg,
	tone,
	className,
	...props
}: IconProps) {
	return (
		<EyeSlashIcon
			{...props}
			className={variants({ size, fg, tone, className })}
		/>
	);
}
