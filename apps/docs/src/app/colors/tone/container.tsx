import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    backgroundColor: tone.surface,
    padding: space[300],
    borderRadius: radii.lg,
    borderWidth: borderWidths.md,
    // borderStyle: borderStyles.solid,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export function Container(props: React.PropsWithChildren) {
  return (
    <Flex style={styles.container} gap="200">
      {props.children}
    </Flex>
  )
}
