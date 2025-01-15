"use client";

import { useState } from "react";

import { Flex } from "@urban-ui/flex";
import { Text } from "@urban-ui/text";
import { atoms } from "@urban-ui/theme/atoms";
import { Panel } from "@urban-ui/panel";
import { Spacer } from "@urban-ui/spacer";
import { Button } from "@urban-ui/button";
import { HideEyeIcon, ShowEyeIcon } from "@urban-ui/icons";

export function FloatingPanelExample() {
	const [toggleState, setToggleState] = useState(false);

	return (
		<Flex orientation="v" gap="md">
			<Flex orientation="h" alignment="center" gap="sm">
				<Text size="lg" weight="semibold">
					Floating panel
				</Text>
				<Button
					icon
					variant="ghost"
					size="sm"
					radii="circular"
					onPress={() => setToggleState(!toggleState)}
				>
					{toggleState ? <ShowEyeIcon size="lg" /> : <HideEyeIcon size="lg" />}
				</Button>
			</Flex>
			<VisibilityToggle isShowing={toggleState} />
		</Flex>
	);
}

function VisibilityToggle({ isShowing }: { isShowing: boolean }) {
	if (isShowing === false) {
		return null;
	}

	return (
		<Flex
			className={atoms({
				position: "fixed",
				topRight: "md",
			})}
		>
			<Panel.Root bg="app" prominence="muted" border="subtle" radii="md">
				<Panel.Content>
					<Flex orientation="v" gap="md">
						<Text weight="semibold">Floating panel</Text>
						<Text>More stuff in the panel</Text>
					</Flex>
				</Panel.Content>
			</Panel.Root>
		</Flex>
	);
}
