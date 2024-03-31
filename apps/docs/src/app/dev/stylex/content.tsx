"use client";

import * as stylex from "@stylexjs/stylex";
import { Testx } from "@urban-ui/testx";

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
		</div>
	);
}
