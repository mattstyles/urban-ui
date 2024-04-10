import stylex from "@stylexjs/stylex";
import { Flex } from "@urban-ui/flex";
import { Spacer } from "@urban-ui/spacer";
import { spacing } from "@urban-ui/theme/spacing.stylex";

const styles = stylex.create({
	block: {
		backgroundColor: "hotpink",
		width: spacing.xl,
		height: spacing.xl,
	},
});

function Block() {
	return <div {...stylex.props(styles.block)} />;
}

export default function SpacerPage() {
	return (
		<>
			<h1>Spacer</h1>
			<p>Orientation: h</p>
			<Flex orientation="h">
				<Block />
				<Spacer />
				<Block />
				<Spacer />
				<Block />
				<Spacer />
			</Flex>
			<p>Orientation: v</p>
			<Flex orientation="v">
				<Block />
				<Spacer orientation="v" />
				<Block />
				<Spacer orientation="v" />
				<Block />
				<Spacer orientation="v" />
			</Flex>
		</>
	);
}
