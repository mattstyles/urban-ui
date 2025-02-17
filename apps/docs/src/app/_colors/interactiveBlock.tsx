import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { interactive } from '@urban-ui/theme'
import {
  accent,
  danger,
  info,
  // interactive,
  neutral,
  neutralFaded,
  positive,
  tokens,
  warning,
} from '@urban-ui/theme/_colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {},
  title: {
    padding: space[200],
  },
  block: {
    background: tokens.background,
    userSelect: 'none',
    padding: space[200],
    borderRadius: '4px',
    position: 'relative',
    // ':hover': {
    //   // background: interactive.hover,
    //   background: `oklch(from ${tokens.background} calc(l * 0.95) c h)`,
    // },
    // ':hover:active': {
    //   // background: interactive.active,
    // },
  },
})

type ThemeName =
  | 'neutral'
  | 'neutralFaded'
  | 'accent'
  | 'info'
  | 'positive'
  | 'warning'
  | 'danger'

type Props = {
  title: string
  theme: ThemeName
}

export function InteractiveBlock({ title, theme }: Props) {
  return (
    <div
      {...stylex.props(
        styles.container,
        theme === 'neutral' && neutral,
        theme === 'neutralFaded' && neutralFaded,
        theme === 'accent' && accent,
        theme === 'info' && info,
        theme === 'positive' && positive,
        theme === 'warning' && warning,
        theme === 'danger' && danger,
      )}
    >
      <div {...stylex.props(styles.title)}>
        <Text size="md" weight="medium" color="neutral">
          {title}
        </Text>
      </div>
      <Flex direction="v" gap="200">
        <div
          {...stylex.props(styles.block, interactive.hover, interactive.active)}
        >
          <Text color="contrast">Background</Text>
        </div>
      </Flex>
    </div>
  )
}
