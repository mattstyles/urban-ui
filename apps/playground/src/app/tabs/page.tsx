import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

import { Button } from '@urban-ui/button'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { borderWidths, radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { AnimatedTabs } from './animatedTabs'

const styles = stylex.create({
  page: {
    padding: space[800],
  },
  container: {
    padding: space[200],
    backgroundColor: tone.surface,
    borderRadius: radii.lg,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
  },
})

export default function TabsPage() {
  return (
    <Flex direction="v" gap="600" asChild style={styles.page}>
      <main>
        <Text asChild size="xl" weight="semibold">
          <h1>Tabs</h1>
        </Text>

        <Flex
          direction="h"
          gap="400"
          align="center"
          style={styles.container}
          asChild
        >
          <section>
            <AnimatedTabs />
          </section>
        </Flex>
      </main>
    </Flex>
  )
}
