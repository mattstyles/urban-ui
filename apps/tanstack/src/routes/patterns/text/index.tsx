import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/text/')({
  component: TextPatterns,
})

const styles = stylex.create({
  page: {
    padding: space[600],
  },
  container: {
    padding: space[300],
    backgroundColor: base.white,
    color: tone.fgHi,
    borderRadius: radii.md,
  },
})

function TextPatterns() {
  return (
    <Flex direction="column" gap="200" style={[styles.page]}>
      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="xxl">Page Title</Text>
        <Text size="lg">Section heading</Text>
        <Text size="md">Body text</Text>
        <Text size="sm">Secondary info</Text>
      </Flex>
    </Flex>
  )
}
