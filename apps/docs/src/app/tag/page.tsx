import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Tag } from '@urban-ui/tag'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    padding: space[200],
  },
  section: {
    backgroundColor: tone.surface,
    padding: space[300],
    borderRadius: radii['2xl'],
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export default function TagPage() {
  return (
    <Flex direction="v" gap="500" style={styles.container}>
      <Flex direction="v" gap="200">
        <Text size="xl" weight="semibold">
          Tag
        </Text>
        <Text asChild>
          <p>
            Tags are used to highlight status, categorize items, or display
            metadata. They use a hybrid approach combining CSS Custom Properties
            for theming with StyleX for static styles.
          </p>
        </Text>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Variants & Tones</h2>
          </Text>
          <Text asChild>
            <p>
              Tags support solid and muted variants with primary and default
              tones, using theme tokens for consistent styling.
            </p>
          </Text>
          <Flex direction="v" gap="200">
            <Text size="sm" color="lo">
              Solid Variant
            </Text>
            <Flex gap="100" wrap="wrap">
              <Tag variant="solid">Default solid</Tag>
              <Tag tone="neutral" variant="solid">
                Neutral solid
              </Tag>
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
              <Tag tone="accent" variant="solid">
                Accent solid
              </Tag>
            </Flex>
          </Flex>
          <Flex direction="v" gap="200">
            <Text size="sm" color="lo">
              Muted Variant
            </Text>
            <Flex gap="100" wrap="wrap">
              <Tag variant="muted">Default muted</Tag>
              <Tag tone="neutral" variant="muted">
                Neutral muted
              </Tag>
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
              <Tag tone="accent" variant="muted">
                Accent muted
              </Tag>
            </Flex>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Size variations</h2>
          </Text>
          <Text asChild>
            <p>
              Each variant supports multiple sizes to accommodate different
              contexts and hierarchies.
            </p>
          </Text>
          <Flex direction="h" align="center" gap="200">
            <Tag size="lg" variant="solid" tone="primary">
              Large
            </Tag>
            <Tag size="md" variant="solid" tone="primary">
              Medium
            </Tag>
          </Flex>
        </section>
      </Flex>
    </Flex>
  )
}
