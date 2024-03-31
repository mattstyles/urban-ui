import cx from "clsx";
import { Flex } from "@urban-ui/flex";
import { atoms } from "@urban-ui/theme/atoms";

import * as styles from "./styles.css.ts";

export default function ColorPage() {
	return (
		<Flex
			orientation="v"
			gap="xl"
			className={cx(atoms({ p: "md" }), styles.primary)}
		>
			<Flex style={{ width: 240 }} orientation="v" gap="md">
				<button className={cx(styles.button, styles.buttonSolid)}>
					Solid strong colour button
				</button>
				<button className={cx(styles.button, styles.buttonGhost)}>
					ghost muted colour button
				</button>
				<button className={cx(styles.button, styles.buttonText)}>
					Text only button
				</button>
				<button className={cx(styles.button, styles.buttonOutlineElement)}>
					Outline element
				</button>
				<button className={cx(styles.button, styles.buttonOutlineElementGhost)}>
					Outline element ghost (static border)
				</button>
				<button className={cx(styles.button, styles.buttonOutlineEmphasis)}>
					Outline element ghost (static border emphasis)
				</button>
				<Flex gap="sm">
					<div className={styles.badge}>Badge</div>
					<div className={styles.badge}>Badge</div>
				</Flex>
			</Flex>

			<Flex orientation="h" gap="md" style={{ flexWrap: "wrap" }}>
				<Flex
					className={cx(styles.card, styles.cardMuted)}
					orientation="v"
					gap="md"
				>
					<div>Surface muted</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
				</Flex>

				<Flex className={styles.card} orientation="v" gap="md">
					<div>Surface background colour</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
					<button className={cx(styles.button, styles.buttonGhost)}>
						Solid strong colour button
					</button>
					<button className={cx(styles.button, styles.buttonText)}>
						Text only button
					</button>
					<button
						className={cx(styles.button, styles.buttonOutlineElementGhost)}
					>
						Outline
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardSubtle)}
					orientation="v"
					gap="md"
				>
					<div>Surface subtle</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardSubtle)}
					orientation="v"
					gap="md"
				>
					<div>Surface emphasis</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
					<Flex gap="sm">
						<div className={styles.badge}>Badge</div>
						<div className={styles.badge}>Badge</div>
					</Flex>
					<button className={cx(styles.button, styles.buttonGhost)}>
						Solid strong colour button
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardBackground)}
					orientation="v"
					gap="md"
				>
					<div>
						Element colours should not be used for backgrounds like this, which
						are background elements.
					</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
					<button className={cx(styles.button, styles.buttonGhost)}>
						ghost muted colour button
					</button>
					<button className={cx(styles.button, styles.buttonText)}>
						Text only button
					</button>
					<button
						className={cx(styles.button, styles.buttonOutlineElementGhost)}
					>
						Outline
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardBorderMuted)}
					orientation="v"
					gap="md"
				>
					<div>Border-muted card</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardBorder)}
					orientation="v"
					gap="md"
				>
					<div>Bordered card</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
					<button className={cx(styles.button, styles.buttonGhost)}>
						Solid strong colour button
					</button>
					<button className={cx(styles.button, styles.buttonText)}>
						Text only button
					</button>
					<button
						className={cx(styles.button, styles.buttonOutlineElementGhost)}
					>
						Outline
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardBorderSubtle)}
					orientation="v"
					gap="md"
				>
					<div>Border-subtle card</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
				</Flex>

				<Flex
					className={cx(styles.card, styles.cardBorderEmphasis)}
					orientation="v"
					gap="md"
				>
					<div>Border-emphasis card</div>
					<button className={cx(styles.button, styles.buttonSolid)}>
						Solid strong colour button
					</button>
				</Flex>
			</Flex>
		</Flex>
	);
}
