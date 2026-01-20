import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@urban-ui/flex'
import {
  fontColors,
  sizes,
  styles as textStyles,
  weights,
} from '@urban-ui/styles/text'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
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

      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="xxl" weight="bold" asChild>
          <h1>Semantic Heading</h1>
        </Text>
        <Text size="md" asChild>
          <p>Paragraph with text styles applied to the p element.</p>
        </Text>
        <Text size="sm" color="lo" asChild>
          <a href="/">Link with text styles</a>
        </Text>
      </Flex>

      <Flex direction="h" gap="200">
        <Flex
          direction="v"
          gap="100"
          style={[styles.container, themes.critical]}
        >
          <Text size="md" weight="semibold" color="hi">
            Error
          </Text>
          <Text size="sm" color="lo">
            Something went wrong
          </Text>
        </Flex>
        <Flex
          direction="v"
          gap="100"
          style={[styles.container, themes.positive]}
        >
          <Text size="md" weight="semibold" color="hi">
            Success
          </Text>
          <Text size="sm" color="lo">
            Operation completed
          </Text>
        </Flex>
        <Flex
          direction="v"
          gap="100"
          style={[styles.container, themes.warning]}
        >
          <Text size="md" weight="semibold" color="hi">
            Warning
          </Text>
          <Text size="sm" color="lo">
            Please review
          </Text>
        </Flex>
      </Flex>

      <Flex direction="v" gap="200" style={[styles.container]}>
        <Text size="md">
          Build interfaces with{' '}
          <Text asChild color="hi" style={themes.accent}>
            <span>accessibility</span>
          </Text>{' '}
          built in.
        </Text>
        <Text size="md">
          This action is{' '}
          <Text asChild color="hi" style={themes.critical}>
            <strong>irreversible</strong>
          </Text>{' '}
          and cannot be undone.
        </Text>
      </Flex>

      <Flex direction="v" gap="200" style={[styles.container]}>
        <h1
          {...stylex.props(
            textStyles.base,
            sizes.xxl,
            weights.bold,
            fontColors.hi,
          )}
        >
          Manual styled heading
        </h1>
        <p {...stylex.props(textStyles.base, sizes.md, fontColors.hi)}>
          Paragraph styled directly with text style objects.
        </p>
        <span
          {...stylex.props(
            textStyles.base,
            sizes.sm,
            weights.semibold,
            fontColors.lo,
          )}
        >
          Secondary caption text
        </span>
      </Flex>
    </Flex>
  )
}
