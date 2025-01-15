import { LoremIpsum } from "lorem-ipsum";
import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { atoms } from "@urban-ui/theme/atoms";
import { Panel } from "@urban-ui/panel";
import { Spacer } from "@urban-ui/spacer";
import { Button } from "@urban-ui/button";
import { SearchIcon, CloseIcon, CheckIcon } from "@urban-ui/icons";

const lorem = new LoremIpsum();

export default function PanelExamplesPage() {
	return (
		<Flex orientation="v" gap="xl" className={atoms({ p: "xl" })}>
			<Text size="xl" weight="light" kerning="sm">
				Examples of panels
			</Text>
			<Spacer gap="md" />
			<PanelWithTextHeader />
			<WithTextHeaderAndControls />
			<WithEmptyFooter />
			<PanelWithinPanel />
		</Flex>
	);
}

function PanelWithTextHeader() {
	return (
		<Panel.Root padding="lg" width="md" bg="app" prominence="muted">
			<Panel.Header>
				<Text>Panel with header</Text>
			</Panel.Header>
			<Panel.Content>
				<Text asChild>
					<p>
						<Text
							font="mono"
							asChild
							className={atoms({ display: "inline-block" })}
						>
							<code>Panel.header</code>
						</Text>{" "}
						component sets the text size and weight.
					</p>
				</Text>
				<Text asChild>
					<p>{lorem.generateWords(25)}</p>
				</Text>
			</Panel.Content>
		</Panel.Root>
	);
}

function WithTextHeaderAndControls() {
	return (
		<Panel.Root
			padding="lg"
			width="sm"
			bg="app"
			prominence="muted"
			shadow="sm"
			radii="md"
		>
			<Panel.Header>
				<Text>Panel with header and control icons</Text>
				<Flex
					gap="xs"
					alignment="center"
					className={atoms({ tone: "primary" })}
				>
					<Button icon radii="circular" variant="ghost" size="sm">
						<SearchIcon size="lg" />
					</Button>
					<Button icon radii="circular" variant="ghost" size="sm">
						<CloseIcon size="lg" />
					</Button>
				</Flex>
			</Panel.Header>
			<Panel.Content>
				<Text asChild>
					<p>
						<Text
							font="mono"
							asChild
							className={atoms({ display: "inline-block" })}
						>
							<code>Panel.header</code>
						</Text>{" "}
						component sets the text size and weight.
					</p>
				</Text>
				<Text asChild>
					<p>{lorem.generateWords(25)}</p>
				</Text>
			</Panel.Content>
		</Panel.Root>
	);
}

function WithEmptyFooter() {
	return (
		<Panel.Root width="sm" shadow="sm" radii="md" prominence="muted" bg="app">
			<Panel.Header py>
				<Text>Friend requests</Text>
				<Button radii="md" variant="foreground" tone="neutral" size="sm">
					View all
				</Button>
			</Panel.Header>
			<Panel.Content gap="lg">
				<Flex
					justify="spread"
					alignment="center"
					gap="xl"
					className={atoms({ py: "sm" })}
				>
					<Flex orientation="v" gap="md">
						<Text size="md" weight="semibold" kerning="sm">
							Grace Hopper
						</Text>
						<Text>
							Panel components, such as header or footer, can accept a py prop
							to control their specific paddingTop and paddingBottom
						</Text>
					</Flex>
					<Button size="sm" tone="primary" variant="outline">
						Confirm
					</Button>
				</Flex>
				<Flex
					justify="spread"
					alignment="center"
					gap="xl"
					className={atoms({ py: "sm" })}
				>
					<Flex orientation="v" gap="md">
						<Text size="md" weight="semibold" kerning="sm">
							Edward Teller
						</Text>
						<Text>
							py can also be applied as a boolean to inherit from Panel.Root
							padding
						</Text>
					</Flex>
					<Button size="sm" tone="primary" variant="outline">
						Confirm
					</Button>
				</Flex>
			</Panel.Content>
			<Panel.Footer py="sm" />
		</Panel.Root>
	);
}

function InnerPanel({
	title,
	description,
	amount,
}: {
	title: string;
	description: string;
	amount: string;
}) {
	return (
		<Panel.Root padding="md" border="muted" radii="sm">
			<Panel.Content
				gap="md"
				orientation="h"
				justify="spread"
				alignment="center"
			>
				<Flex gap="sm" orientation="v">
					<Text size="lg" weight="semibold">
						{title}
					</Text>
					<Text size="md" contrast="lo">
						{description}
					</Text>
				</Flex>
				<Text size="xl" weight="bold">
					{amount}
				</Text>
			</Panel.Content>
		</Panel.Root>
	);
}
function PanelWithinPanel() {
	return (
		<Panel.Root padding="lg" prominence="muted" bg="app" shadow="sm" radii="md">
			<Panel.Header>
				<Flex orientation="v" gap="lg" className={atoms({ pl: "md" })}>
					<Text>Recursive panel spacing</Text>
					<Text size="md" weight="normal" em>
						Note that the borders on the inner panels here mean the heading text
						does not properly align with the panel text. Fix could be to create
						borders as box-shadow, or within an inner component absolutely
						positioned to the container.
					</Text>
				</Flex>
			</Panel.Header>
			<Panel.Content>
				<InnerPanel
					title="Tech"
					description="Spend on high tech sector"
					amount="£3000"
				/>
				<InnerPanel
					title="Education"
					description="Libraries, schools, universities, and more"
					amount="£5000"
				/>
				<InnerPanel
					title="Military"
					description="Spending for the military arm"
					amount="£2300"
				/>
			</Panel.Content>
		</Panel.Root>
	);
}
