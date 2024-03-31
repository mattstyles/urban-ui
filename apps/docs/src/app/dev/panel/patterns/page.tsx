import type { TextProps } from "@urban-ui/text";

import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { atoms } from "@urban-ui/theme/atoms";
import { Panel } from "@urban-ui/panel";
import { Spacer } from "@urban-ui/spacer";
import { FloatingPanelExample } from "./content.tsx";

export default function PanelPatternsPage() {
	return (
		<Flex orientation="v" gap="xl" className={atoms({ p: "xl" })}>
			<Heading>Common pattern examples</Heading>
			<Spacer gap="sm" />
			<Flex orientation="v" gap="md">
				<SubHeading>Split panel</SubHeading>
				<Panel.Root gap="xl" split>
					<Panel.Root flex="full" prominence="muted" bg="app" shadow="sm">
						<Panel.Content>
							<Text>Left</Text>
						</Panel.Content>
					</Panel.Root>
					<Panel.Root flex="full" prominence="muted" bg="app" shadow="sm">
						<Panel.Content>
							<Text>Right</Text>
						</Panel.Content>
					</Panel.Root>
				</Panel.Root>
			</Flex>
			<Spacer gap="sm" />
			<Flex orientation="v" gap="md">
				<SubHeading>Centralise panel</SubHeading>
				<Flex justify="center">
					<Panel.Root
						width="md"
						prominence="subtle"
						bg="element"
						fg="invert"
						contrast="hi"
						tone="primary"
					>
						<Panel.Content>
							<Text>Centralised panel</Text>
						</Panel.Content>
					</Panel.Root>
				</Flex>
				<SubHeading>Centralised stack</SubHeading>
				<Flex orientation="v" gap="md" alignment="center">
					<Panel.Root bg="app" prominence="emphasis" width="sm">
						<Panel.Content>
							<Text>One</Text>
						</Panel.Content>
					</Panel.Root>
					<Panel.Root bg="app" prominence="emphasis" width="sm">
						<Panel.Content>
							<Text>Two</Text>
						</Panel.Content>
					</Panel.Root>
				</Flex>
			</Flex>
			<Spacer gap="sm" />
			<FloatingPanelExample />
			<Spacer gap="sm" />
		</Flex>
	);
}

function Heading(props: TextProps) {
	return <Text {...{ size: "xl", weight: "light", kerning: "xs", ...props }} />;
}
function SubHeading(props: TextProps) {
	return <Text {...{ size: "lg", weight: "semibold", ...props }} />;
}
