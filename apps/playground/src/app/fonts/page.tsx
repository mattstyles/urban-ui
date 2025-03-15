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

const eurostile = stylex.createTheme(fonts, {
  display: 'Eurostile',
  body: 'Eurostile',
  mono: 'monospace',
})

const gotham = stylex.createTheme(fonts, {
  display: 'Gotham Rounded SSm A, Gotham Rounded SSm B',
  body: 'Gotham Rounded SSm A, Gotham Rounded SSm B',
  mono: 'monospace',
})

const gothamTracking = stylex.createTheme(tracking, {
  xxs: 'em',
  xs: '0em',
  sm: '-0.03em',
  md: '-0.045em',
  lg: '-0.045em',
  xl: '-0.06em',
  xxl: '-0.08em',

  tighter: '0em',
  tight: '0em',
  normal: '0em',
  wide: '0em',
  wider: '0em',
  widest: '0em',
})

// @TODO letter-spacing for gotham

export default function FontsPage() {
  return (
    <Flex direction="column" gap="400" style={[eurostile, styles.container]}>
      <Text size="xl">Hello eurostile from typekit</Text>
      <Flex direction="column" gap="200" style={[gotham, gothamTracking]}>
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
