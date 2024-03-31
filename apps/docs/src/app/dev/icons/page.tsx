import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { Button } from "@urban-ui/button";
import { atoms } from "@urban-ui/theme/atoms";
import {
	CloseIcon,
	CheckIcon,
	HideEyeIcon,
	ShowEyeIcon,
	SearchIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	CriticalIcon,
	WarningIcon,
	PositiveIcon,
} from "@urban-ui/icons";

export default function TextFieldPage() {
	return (
		<Flex orientation="v" gap="md" className={atoms({ p: "xl" })}>
			<Text size="lg" weight="semibold">
				Sizes
			</Text>
			<Flex orientation="h" gap="md" alignment="center">
				<CloseIcon size="sm" />
				<CloseIcon size="md" />
				<CloseIcon size="lg" />
				<CloseIcon size="xl" />
				<CloseIcon size="xxl" />
			</Flex>
			<Text size="lg" weight="semibold">
				Colours
			</Text>
			<Flex orientation="h" gap="md">
				<CloseIcon fg="hi" />
				<CloseIcon fg="lo" />
				<CloseIcon fg="hi" tone="primary" />
			</Flex>
			<Text size="lg" weight="semibold">
				Composed
			</Text>
			<Flex orientation="h" gap="md">
				<Button icon radii="circular" variant="ghost">
					<CloseIcon className={atoms({ size: "xl" })} />
				</Button>
			</Flex>
			<Text size="lg" weight="semibold">
				Named
			</Text>
			<Flex orientation="h" gap="xl" wrap="wrap">
				{icons.map(({ name, Icon }) => {
					return (
						<Flex key={name} orientation="h" alignment="center" gap="md">
							<Icon size="xxl" />
							<Text font="mono">{name}</Text>
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
}

const icons = [
	{
		Icon: CloseIcon,
		name: "CloseIcon",
	},
	{
		Icon: HideEyeIcon,
		name: "HideEyeIcon",
	},
	{
		Icon: ShowEyeIcon,
		name: "ShowEyeIcon",
	},
	{
		Icon: SearchIcon,
		name: "SearchIcon",
	},
	{
		Icon: CheckIcon,
		name: "CheckIcon",
	},
	{
		Icon: ChevronDownIcon,
		name: "ChevronDownIcon",
	},
	{
		Icon: ChevronUpIcon,
		name: "ChevronUpIcon",
	},
	{
		Icon: CriticalIcon,
		name: "CriticalIcon",
	},
	{
		Icon: WarningIcon,
		name: "WarningIcon",
	},
	{
		Icon: PositiveIcon,
		name: "PositiveIcon",
	},
];
