'use client'

import * as stylex from '@stylexjs/stylex'
import { Button } from '@urban-ui/button'
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

export function ButtonExample() {
  return (
    <Flex direction="v" gap="400" asChild style={styles.section}>
      <section id="button">
        <Text size="lg" weight="medium" asChild>
          <h2>display as button</h2>
        </Text>
        <Text asChild>
          <p>
            Variants are available to style the link as a button, but it will
            still semantically be a link.
          </p>
        </Text>

        <Flex gap="200" wrap="wrap">
          <Link href="#button" display="button" variant="outline" tone="info">
            Link
          </Link>
          <Button variant="outline" tone="info">
            Button
          </Button>
        </Flex>
      </section>
    </Flex>
  )
}
