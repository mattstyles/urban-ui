import cx from "clsx";
import { Flex } from "@urban-ui/flex";
import { Spacer } from "@urban-ui/spacer";
import { Text } from "@urban-ui/text";
import { atoms } from "@urban-ui/theme/atoms";
import { CriticalIcon } from "@urban-ui/icons";

import { baseTheme } from "@urban-ui/theme";

export default function ColorPage() {
	return (
		<Flex orientation="h" gap="xl" className={atoms({ p: "md" })}>
			<Flex orientation="v" gap="xl">
				<Flex orientation="v" gap="md">
					<Heading>Global - App</Heading>
					<Text>Muted - Base - Subtle - Emphasis</Text>
					<Flex className={atoms({ p: "sm" })}>
						<Block className={atoms({ app: "muted" })} />
						<Block className={atoms({ app: "base" })} />
						<Block className={atoms({ app: "subtle" })} />
						<Block className={atoms({ app: "emphasis" })} />
					</Flex>
					<Flex className={atoms({ p: "sm", app: "muted" })}>
						<Block className={atoms({ app: "muted" })} />
						<Block className={atoms({ app: "base" })} />
						<Block className={atoms({ app: "subtle" })} />
						<Block className={atoms({ app: "emphasis" })} />
					</Flex>
				</Flex>
				<Flex orientation="v" gap="md">
					<Heading>Tone - Surface</Heading>
					<Text>Muted - Base - Subtle - Emphasis</Text>
					<Flex className={atoms({ p: "sm" })}>
						<Block className={atoms({ surface: "muted" })} />
						<Block className={atoms({ surface: "base" })} />
						<Block className={atoms({ surface: "subtle" })} />
						<Block className={atoms({ surface: "emphasis" })} />
					</Flex>
					<Flex className={atoms({ p: "sm", app: "muted" })}>
						<Block className={atoms({ surface: "muted" })} />
						<Block className={atoms({ surface: "base" })} />
						<Block className={atoms({ surface: "subtle" })} />
						<Block className={atoms({ surface: "emphasis" })} />
					</Flex>
				</Flex>
				<Flex orientation="v" gap="md">
					<Heading>Tone - Muted</Heading>
					<Text>Base - Hover - Press - Selected</Text>
					<Flex className={atoms({ p: "sm" })}>
						<Block className={atoms({ muted: "base" })} />
						<Block className={atoms({ muted: "hover" })} />
						<Block className={atoms({ muted: "press" })} />
						<Block className={atoms({ muted: "selected" })} />
					</Flex>
					<Flex className={atoms({ p: "sm", app: "muted" })}>
						<Block className={atoms({ muted: "base" })} />
						<Block className={atoms({ muted: "hover" })} />
						<Block className={atoms({ muted: "press" })} />
						<Block className={atoms({ muted: "selected" })} />
					</Flex>
				</Flex>
				<Flex orientation="v" gap="md">
					<Heading>Tone - Strong</Heading>
					<Text>Foreground colour inverted</Text>
					<Text>Base - Hover - Press - Selected</Text>
					<Flex className={atoms({ p: "sm", fg: "invert", tone: "neutral" })}>
						<Block className={atoms({ strong: "base" })} />
						<Block className={atoms({ strong: "hover" })} />
						<Block className={atoms({ strong: "press" })} />
						<Block className={atoms({ strong: "selected" })} />
					</Flex>
					<Flex className={atoms({ p: "sm", app: "muted", fg: "invert" })}>
						<Block className={atoms({ strong: "base" })} />
						<Block className={atoms({ strong: "hover" })} />
						<Block className={atoms({ strong: "press" })} />
						<Block className={atoms({ strong: "selected" })} />
					</Flex>
				</Flex>
				<Flex orientation="v" gap="md">
					<Heading>Tone - critical</Heading>
					<Flex
						orientation="v"
						gap="md"
						className={atoms({
							p: "xl",
							tone: "critical",
							muted: "base",
							fg: "current",
						})}
					>
						<Text>Muted base</Text>
						<Text tone>Text tone</Text>
					</Flex>
				</Flex>
			</Flex>
			<Spacer orientation="h" gap="sm" />
			<Flex orientation="v" gap="xl">
				<Heading>Examples</Heading>
				<Flex
					orientation="h"
					alignment="center"
					gap="sm"
					className={atoms({
						p: "xl",
						tone: "critical",
						muted: "base",
						fg: "current",
						color: "hi",
					})}
				>
					<CriticalIcon size="xl" />
					<Text>Danger Will Robinson</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}

const Heading = ({ children }: { children: string }) => (
	<Text size="lg" weight="semibold">
		{children}
	</Text>
);

const Block = ({ className = "" }: { className?: string }) => (
	<Flex
		className={cx(
			atoms({
				size: "xxl",
				placeItems: "center",
			}),
			className,
		)}
	>
		<Text size="sm" weight="bold">
			FG
		</Text>
	</Flex>
);
