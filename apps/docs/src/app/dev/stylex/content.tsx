"use client";

import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { Flex } from "@urban-ui/flex";
import { Testx } from "@urban-ui/testx";
import { Block } from "./block";

const styles = stylex.create({
	container: {
		backgroundColor: "cornsilk",
		paddingTop: 32,
		paddingBottom: 32,
	},
});

export function Content() {
	return (
		<div {...stylex.props(styles.container)}>
			<Testx>Client components</Testx>
			<Testx size="sm" tone="critical">
				Client components
			</Testx>
			<Flex>
				<Block />
				<Block />
				<Block />
			</Flex>
			<Flex gap="md">
				<Block />
				<Block />
				<Block />
			</Flex>
		</div>
	);
}
