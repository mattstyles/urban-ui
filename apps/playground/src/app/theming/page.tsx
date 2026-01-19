'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { radii } from '@urban-ui/theme/borders.stylex'
import { primary, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  page: {
    padding: space.xl,
  },
  block: {
    backgroundColor: primary.fgHi,
    width: 128,
    height: 128,
  },
  tonalTag: {
    backgroundColor: primary.solid,
    paddingBlock: space[300],
    paddingInline: space[100],
    borderRadius: radii.full,
  },
})

const DARK = '@media (prefers-color-scheme: dark)'
const customTheme = stylex.createTheme(primary, {
  fgHi: {
    default: 'hotpink',
    [DARK]: 'aqua',
  },
  fgOnBlock: {
    default: 'red',
    [DARK]: 'green',
  },
  solid: {
    default: 'aqua',
    [DARK]: 'gainsboro',
  },
})

function TonalTag({ children }: React.PropsWithChildren) {
  return (
    <div {...stylex.props(styles.tonalTag)}>
      <Text size="lg" weight="semibold" color="onBlock">
        {children} <Text tone="primary">with primary text</Text>
      </Text>
    </div>
  )
}

function Block() {
  return <div {...stylex.props(styles.block)} />
}

export default function Page() {
  return (
    <Flex direction="v" gap="400" style={styles.page}>
      <Text size="xl" asChild>
        <h1>Theming</h1>
      </Text>
      <Text size="lg" asChild>
        <h2>Custom themes</h2>
      </Text>
      <Text asChild>
        <p>
          Variables and even themes from urban-ui can be changed using
          additional themes.
        </p>
      </Text>
      <Flex gap="400">
        <Block />
        <div {...stylex.props(customTheme)}>
          <Block />
        </div>
        <div {...stylex.props(customTheme)}>
          <div {...stylex.props(themes.primary)}>
            <Block />
          </div>
        </div>
      </Flex>
      <Flex gap="400">
        <TonalTag>Default</TonalTag>
        <div {...stylex.props(customTheme)}>
          <TonalTag>Custom</TonalTag>
        </div>
        <div {...stylex.props(customTheme)}>
          <div {...stylex.props(themes.primary)}>
            <TonalTag>Primary</TonalTag>
          </div>
        </div>
      </Flex>
    </Flex>
  )
}
