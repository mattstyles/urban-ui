'use client'

import * as stylex from '@stylexjs/stylex'

import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

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

export default function ButtonPage() {
  return (
    <Flex direction="v" gap="500" style={styles.container}>
      <Flex direction="v" gap="400">
        <Text size="xl" weight="semibold">
          Button
        </Text>
        <Text asChild>
          <p>
            Buttons are interactive elements that trigger actions. Built on top
            of react-aria-components for robust accessibility, they support
            multiple variants and semantic color tones to communicate purpose
            and hierarchy.
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
              Buttons come in three variants: solid, muted, and outline. Each
              variant can be combined with any of the semantic color tones to
              communicate different purposes.
            </p>
          </Text>

          <Flex direction="v" gap="300">
            <Flex gap="200" wrap="wrap">
              <Button variant="solid" tone="neutral">
                Neutral
              </Button>
              <Button variant="solid" tone="primary">
                Primary
              </Button>
              <Button variant="solid" tone="accent">
                Accent
              </Button>
              <Button variant="solid" tone="positive">
                Positive
              </Button>
              <Button variant="solid" tone="warning">
                Warning
              </Button>
              <Button variant="solid" tone="critical">
                Critical
              </Button>
              <Button variant="solid" tone="info">
                Info
              </Button>
            </Flex>

            <Flex gap="200" wrap="wrap">
              <Button variant="muted" tone="neutral">
                Neutral
              </Button>
              <Button variant="muted" tone="primary">
                Primary
              </Button>
              <Button variant="muted" tone="accent">
                Accent
              </Button>
              <Button variant="muted" tone="positive">
                Positive
              </Button>
              <Button variant="muted" tone="warning">
                Warning
              </Button>
              <Button variant="muted" tone="critical">
                Critical
              </Button>
              <Button variant="muted" tone="info">
                Info
              </Button>
            </Flex>

            <Flex gap="200" wrap="wrap">
              <Button variant="outline" tone="neutral">
                Neutral
              </Button>
              <Button variant="outline" tone="primary">
                Primary
              </Button>
              <Button variant="outline" tone="accent">
                Accent
              </Button>
              <Button variant="outline" tone="positive">
                Positive
              </Button>
              <Button variant="outline" tone="warning">
                Warning
              </Button>
              <Button variant="outline" tone="critical">
                Critical
              </Button>
              <Button variant="outline" tone="info">
                Info
              </Button>
            </Flex>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>States</h2>
          </Text>
          <Text asChild>
            <p>
              Buttons respond to user interaction with hover and active states,
              and can be disabled when actions are unavailable.
            </p>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Button variant="solid">Default</Button>
            <Button variant="solid" isDisabled>
              Disabled
            </Button>
          </Flex>

          <Flex direction="v" gap="200">
            <Text asChild>
              <p>
                Buttons will flex to full width when used in a flex container.
              </p>
            </Text>
            <Button>Default</Button>
          </Flex>
        </section>
      </Flex>
    </Flex>
  )
}
