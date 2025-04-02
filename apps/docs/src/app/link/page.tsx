'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Link } from '@urban-ui/link'
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

export default function LinkPage() {
  return (
    <Flex direction="v" gap="400" style={styles.container}>
      <Flex direction="v" gap="200">
        <Text size="xl" weight="medium" asChild>
          <h1>Link</h1>
        </Text>
        <Text asChild>
          <p>
            Links are used to navigate between pages or to external resources.
            They follow the Urban UI design system and provide consistent
            styling with other interactive elements.
          </p>
        </Text>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Basic usage</h2>
          </Text>
          <Text asChild>
            <p>Links can be used with internal or external URLs.</p>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Link href="#basic-usage">Internal link</Link>
            <Link href="https://example.com" target="_blank">
              External link
            </Link>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Tones</h2>
          </Text>
          <Text asChild>
            <p>
              Links can be styled with different tones to match your content.
            </p>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Link href="#tones" variant="solid">
              Primary
            </Link>
            <Link href="#tones" tone="critical" variant="solid">
              Critical
            </Link>
            <Link href="#tones" tone="warning" variant="solid">
              Warning
            </Link>
            <Link href="#tones" tone="positive" variant="solid">
              Positive
            </Link>
            <Link href="#tones" tone="info" variant="solid">
              Info
            </Link>
            <Text>Not a link</Text>
            <Text>
              <Link href="#tones">Link inside text</Link>
            </Text>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Disabled state</h2>
          </Text>
          <Text asChild>
            <p>Links can be disabled to prevent interaction.</p>
          </Text>

          <Flex gap="200" wrap="wrap">
            <Link href="#disabled" isDisabled>
              Disabled link
            </Link>
          </Flex>
        </section>
      </Flex>

      <Flex direction="v" gap="400" asChild style={styles.section}>
        <section>
          <Text size="lg" weight="medium" asChild>
            <h2>Focus styling</h2>
          </Text>
          <Text asChild>
            <p>Links show a focus ring when focused via keyboard navigation.</p>
          </Text>

          <Flex gap="0" wrap="wrap">
            <Link href="#focus">Focus me</Link>
            <Link href="#focus" tone="info">
              Info focus
            </Link>
          </Flex>

          <Text>
            Here is some text with <Link href="#focus">a link</Link> in it.
          </Text>
        </section>
      </Flex>
    </Flex>
  )
}
