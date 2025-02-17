import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { Tag } from '@urban-ui/tag'
import { background, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'
import { TagExamples } from './tagExamples'

const styles = stylex.create({
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: foreground.neutral,
    marginBlockStart: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    color: foreground.neutral,
  },
  container: {
    padding: space[200],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: foreground.neutral,
    marginBlockEnd: space[200],
    marginBlockStart: space[400],
  },
  section: {
    backgroundColor: background.pageFaded,
    padding: space[300],
    borderRadius: '12px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: background.neutralFaded,
    marginBlockEnd: space[400],
  },
})

export default function TagPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <Text size="xl" weight="semibold">
        Tag
      </Text>
      <p {...stylex.props(styles.description)}>
        Tags are used to highlight status, categorize items, or display metadata.
        They come in different variants and sizes to suit various use cases.
      </p>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Variants</h2>
        <p {...stylex.props(styles.description)}>
          Tags come in several variants to convey different types of information.
          Each variant maps to a specific semantic meaning and color scheme.
        </p>
        <Flex direction="v" gap="200">
          <Flex gap="100" wrap="wrap">
            <Tag>Neutral</Tag>
            <Tag variant="accent">Accent</Tag>
            <Tag variant="positive">Positive</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="danger">Danger</Tag>
            <Tag variant="info">Info</Tag>
          </Flex>
        </Flex>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Sizes</h2>
        <p {...stylex.props(styles.description)}>
          Tags are available in three sizes to accommodate different contexts and
          hierarchies.
        </p>
        <Flex direction="v" gap="200">
          {(['neutral', 'accent', 'positive', 'warning', 'danger', 'info'] as const).map(
            (variant) => (
              <Flex key={variant} gap="100" align="center">
                <Tag variant={variant} size="sm">
                  Small
                </Tag>
                <Tag variant={variant} size="md">
                  Medium
                </Tag>
                <Tag variant={variant} size="lg">
                  Large
                </Tag>
              </Flex>
            )
          )}
        </Flex>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Usage Examples</h2>
        <p {...stylex.props(styles.description)}>
          Tags can be used in various contexts to provide visual cues and metadata.
        </p>
        <TagExamples />
      </section>
    </div>
  )
}
