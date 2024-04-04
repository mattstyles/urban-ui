import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";

import { colors } from "@stylexjs/open-props/lib/colors.stylex";
import { spacing } from "@urban-ui/theme/spacing.stylex";

const styles = stylex.create({
	block: {
		width: spacing.xl,
		height: spacing.xl,
		backgroundColor: colors.purple10,
	},
});

export function Block({ style }: { style?: StyleXStyles }) {
	return <div {...stylex.props(styles.block, style)} />;
}
