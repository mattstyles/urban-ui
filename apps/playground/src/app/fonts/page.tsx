import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import { fonts, tracking } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    padding: space[800],
  },
})

// 1. Create a theme
const eurostile = stylex.createTheme(fonts, {
  display: 'Eurostile',
  body: 'Eurostile',
  mono: 'monospace',
})

// 2. When you attach the new font theme also ensure that you attach a class with the font family set. This becomes the default for text. The same rule applies when changing any font theme (such as sizes)
// See @urban-ui/theme presets.body for font defaults.
const textStyles = stylex.create({
  body: {
    fontFamily: fonts.body,
  },
})

const gotham = stylex.createTheme(fonts, {
  display: 'Gotham Rounded SSm A, Gotham Rounded SSm B',
  body: 'Gotham Rounded SSm A, Gotham Rounded SSm B',
  mono: 'monospace',
})

const gothamTracking = stylex.createTheme(tracking, {
  xxs: '0em',
  xs: '0em',
  sm: '-0.03em',
  md: '-0.045em',
  lg: '-0.045em',
  xl: '-0.06em',
  xxl: '-0.08em',

  tighter: '-0.08em',
  tight: '-0.05em',
  normal: '-0.04em',
  wide: '0em',
  wider: '0.025em',
  widest: '0.08em',
})

// @TODO letter-spacing for gotham

export default function FontsPage() {
  return (
    <Flex
      direction="column"
      gap="400"
      style={[eurostile, styles.container, textStyles.body]}
    >
      <Text size="xl">Hello eurostile from typekit</Text>
      <Flex
        direction="column"
        gap="200"
        style={[gotham, gothamTracking, textStyles.body]}
      >
        <Text asChild>
          <p>Hello Gotham</p>
        </Text>
        <Text asChild size="sm">
          <p>From typography.com</p>
        </Text>
      </Flex>
    </Flex>
  )
}
