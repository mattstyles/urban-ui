import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { Content } from '@urban-ui/content'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

export const Route = createFileRoute('/patterns/layout/content/')({
  component: ContentPatterns,
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
  demoContainer: {
    backgroundColor: tone.surfaceMuted,
    borderRadius: radii.md,
    padding: space[200],
  },
  contentBlock: {
    backgroundColor: tone.solid,
    color: base.white,
    borderRadius: radii.sm,
    padding: space[200],
  },
  fullWidth: {
    width: '100%',
  },
})

function ContentPatterns() {
  return (
    <Flex direction="column" gap="400" style={styles.page}>
      <Text size="xxl" weight="bold">
        Content Patterns
      </Text>

      {/* Width Constraints */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Width Constraints
        </Text>
        <Text size="sm" color="lo">
          Content can constrain its max-width to standard content sizes.
        </Text>
        <Flex direction="v" gap="200" style={styles.demoContainer}>
          <Content width="wide" style={styles.contentBlock}>
            <Text>Wide content (48rem max-width)</Text>
          </Content>
          <Content width="narrow" style={styles.contentBlock}>
            <Text>Narrow content (32rem max-width)</Text>
          </Content>
        </Flex>
      </Flex>

      {/* Edge Padding */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Edge Padding
        </Text>
        <Text size="sm" color="lo">
          Use edgeBlock and edgeInline to add padding around content.
        </Text>
        <Flex direction="v" gap="200" style={styles.demoContainer}>
          <Content edgeBlock="md" edgeInline="lg" style={styles.contentBlock}>
            <Text>
              Content with medium block padding (16px) and large inline padding
              (24px)
            </Text>
          </Content>
        </Flex>
      </Flex>

      {/* Combined Usage */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Combined Usage
        </Text>
        <Text size="sm" color="lo">
          Combine width constraints with edge padding for common layout
          patterns.
        </Text>
        <Flex direction="v" gap="200" style={styles.demoContainer}>
          <Content
            width="narrow"
            edgeBlock="lg"
            edgeInline="md"
            style={styles.contentBlock}
          >
            <Text>
              Narrow content with large block padding and medium inline padding.
              This is useful for article-style layouts where you want
              comfortable reading widths.
            </Text>
          </Content>
        </Flex>
      </Flex>

      {/* Page Layout Example */}
      <Flex direction="v" gap="200" style={styles.container}>
        <Text size="lg" weight="semibold">
          Page Layout Example
        </Text>
        <Text size="sm" color="lo">
          A typical page layout using Content for main content area.
        </Text>
        <Flex direction="v" style={[styles.demoContainer, styles.fullWidth]}>
          <Content
            width="wide"
            edgeBlock="xl"
            edgeInline="md"
            style={styles.contentBlock}
          >
            <Flex direction="v" gap="200">
              <Text weight="semibold">Page Title</Text>
              <Text size="sm">
                This demonstrates how Content can be used to create a centered,
                width-constrained page layout with comfortable edge spacing.
              </Text>
            </Flex>
          </Content>
        </Flex>
      </Flex>
    </Flex>
  )
}
