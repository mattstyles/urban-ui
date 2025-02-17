import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderStyles, borderWidths } from '@urban-ui/theme/borders.stylex'
import { background, border, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  title: {
    padding: space[200],
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
})

const backgrounds = stylex.create({
  neutral: {
    backgroundColor: background.neutral,
  },
  neutralFaded: {
    backgroundColor: background.neutralFaded,
  },
  accent: {
    backgroundColor: background.accent,
  },
  info: {
    backgroundColor: background.info,
  },
  positive: {
    backgroundColor: background.positive,
  },
  warning: {
    backgroundColor: background.warning,
  },
  danger: {
    backgroundColor: background.danger,
  },
})

const borders = stylex.create({
  base: {
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
  },
  neutral: {
    borderColor: border.neutral,
  },
  neutralFaded: {
    borderColor: border.neutralFaded,
  },
  accent: {
    borderColor: border.accent,
  },
  info: {
    borderColor: border.info,
  },
  positive: {
    borderColor: border.positive,
  },
  warning: {
    borderColor: border.warning,
  },
  danger: {
    borderColor: border.danger,
  },
})

const foregrounds = stylex.create({
  neutral: {
    color: foreground.neutral,
  },
  neutralFaded: {
    color: foreground.neutralFaded,
  },
  accent: {
    color: foreground.accent,
  },
  info: {
    color: foreground.info,
  },
  positive: {
    color: foreground.positive,
  },
  warning: {
    color: foreground.warning,
  },
  danger: {
    color: foreground.danger,
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
      <div {...stylex.props(styles.colorBlock)}>
        <div {...stylex.props(styles.swatch, backgrounds[theme])}>
          <Text>Background</Text>
        </div>
        <div {...stylex.props(styles.swatch, borders.base, borders[theme])}>
          <Text>Border</Text>
        </div>
        <div {...stylex.props(styles.swatch, foregrounds[theme])}>
          <Flex direction="h" justify="space-between">
            <Text>Foreground</Text>
            <div style={{ display: 'flex', flexGrow: 1 }} />
            <div {...stylex.props([])} />
          </Flex>
        </div>
      </div>
    </div>
  )
}
