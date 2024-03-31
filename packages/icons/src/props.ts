import type { VariantProps } from "cva";
import type { variants } from "./variants.ts";

// We will use this one for now as heroicons are all the same but this will probably break at some point
import type { XMarkIcon } from "@heroicons/react/24/outline";

export interface IconProps
	extends VariantProps<typeof variants>,
		React.PropsWithChildren,
		React.ComponentProps<typeof XMarkIcon> {}
