"use client";

import stylex from "@stylexjs/stylex";
import { Flex } from "@urban-ui/flex";
// import { spacing } from "@urban-ui/theme/morespaces.stylex";
import { spacing } from "@urban-ui/theme/spacing.stylex";

const styles = stylex.create({
	block: {
		backgroundColor: "red",
		width: spacing.xxl,
		height: spacing.xxl,
	},
});

// Note that spacing.xxl will be transpiled into var(--xxx) so can be used to populate a style declaration. neat.
function Block() {
	return (
		<div
			{...stylex.props(styles.block)}
			// style={{
			// 	backgroundColor: "red",
			// 	width: spacing.xxl,
			// 	height: spacing.xxl,
			// }}
		/>
	);
}

export function Content() {
	return (
		<div>
			<h2>Client component</h2>
			<Flex>
				<Block />
				<Block />
				<Block />
			</Flex>
		</div>
	);
}
