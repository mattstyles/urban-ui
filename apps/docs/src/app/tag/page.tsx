import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Tag } from '@urban-ui/tag'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: tone.fgHi,
    marginBlockStart: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    color: tone.fgHi,
  },
  container: {
    padding: space[200],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: tone.fgHi,
    marginBlockEnd: space[200],
    marginBlockStart: space[400],
  },
  section: {
    backgroundColor: tone.surface,
    padding: space[300],
    borderRadius: '12px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    marginBlockEnd: space[400],
  },
  groupTitle: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginBlockEnd: space[100],
  },
  group: {
    marginBlockEnd: space[200],
  },
})

export default function TagPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <Text size="xl" weight="semibold">
        Tag
      </Text>
      <p {...stylex.props(styles.description)}>
        Tags are used to highlight status, categorize items, or display
        metadata. They use a hybrid approach combining CSS Custom Properties for
        theming with StyleX for static styles.
      </p>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Variants & Tones</h2>
        <p {...stylex.props(styles.description)}>
          Tags support solid and muted variants with primary and default tones,
          using theme tokens for consistent styling.
        </p>
        <Flex direction="v" gap="300">
          <div {...stylex.props(styles.group)}>
            <Text {...stylex.props(styles.groupTitle)}>Solid Variant</Text>
            <Flex gap="100" wrap="wrap">
              <Tag variant="solid">Default solid</Tag>
              <Tag tone="primary" variant="solid">
                Primary solid
              </Tag>
              <Tag tone="critical" variant="solid">
                Critical solid
              </Tag>
              <Tag tone="positive" variant="solid">
                Positive solid
              </Tag>
              <Tag tone="warning" variant="solid">
                Warning solid
              </Tag>
              <Tag tone="info" variant="solid">
                Info solid
              </Tag>
            </Flex>
          </div>

          <div {...stylex.props(styles.group)}>
            <Text {...stylex.props(styles.groupTitle)}>Muted Variant</Text>
            <Flex gap="100" wrap="wrap">
              <Tag variant="muted">Default muted</Tag>
              <Tag tone="primary" variant="muted">
                Primary muted
              </Tag>
              <Tag tone="critical" variant="muted">
                Critical muted
              </Tag>
              <Tag tone="positive" variant="muted">
                Positive muted
              </Tag>
              <Tag tone="warning" variant="muted">
                Warning muted
              </Tag>
              <Tag tone="info" variant="muted">
                Info muted
              </Tag>
            </Flex>
          </div>
        </Flex>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Size Variations</h2>
        <p {...stylex.props(styles.description)}>
          Each variant supports multiple sizes to accommodate different contexts
          and hierarchies.
        </p>
        <Flex direction="v" gap="200">
          <Tag size="lg" variant="muted">
            Large
          </Tag>
          <Tag size="md" variant="muted">
            Medium
          </Tag>
        </Flex>
      </section>
    </div>
  )
}
