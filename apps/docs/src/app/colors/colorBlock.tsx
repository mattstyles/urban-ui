import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import {
  accent,
  danger,
  info,
  neutral,
  neutralFaded,
  positive,
  tokens,
  warning,
} from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  title: {
    padding: space[200],
    backgroundColor: tokens.background,
    color: tokens.foreground,
    borderBottom: '1px solid',
    borderColor: tokens.border,
  },
  colorBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[200],
  },
  swatch: {
    padding: space[200],
    borderRadius: '4px',
    position: 'relative',
  },
  background: {
    background: tokens.background,
  },
  border: {
    borderColor: tokens.border,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  foreground: {
    color: tokens.foreground,
  },
  fgSwatch: {
    aspectRatio: '1 / 1',
    height: space[200],
    backgroundColor: tokens.foreground,
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

export function ColorBlock({ title, theme }: Props) {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.title)}>
        <Text size="md" weight="medium">
          {title}
        </Text>
      </div>
      <div
        {...stylex.props(
          styles.colorBlock,
          theme === 'neutral' && neutral,
          theme === 'neutralFaded' && neutralFaded,
          theme === 'accent' && accent,
          theme === 'info' && info,
          theme === 'positive' && positive,
          theme === 'warning' && warning,
          theme === 'danger' && danger,
        )}
      >
        <div {...stylex.props(styles.swatch, styles.background)}>
          <Text color="contrast">Background</Text>
        </div>
        <div {...stylex.props(styles.swatch, styles.border)}>
          <Text>Border</Text>
        </div>
        <div {...stylex.props(styles.swatch, styles.foreground)}>
          <Flex direction="h" justify="space-between">
            <Text>Foreground</Text>
            <div style={{ display: 'flex', flexGrow: 1 }} />
            <div {...stylex.props(styles.fgSwatch)} />
          </Flex>
        </div>
      </div>
    </div>
  )
}
