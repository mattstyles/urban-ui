'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { borderWidths } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import React from 'react'
import { PopperExample } from './popperExample'

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

export default function TextAnimationPage() {
  return (
    <Flex direction="v" gap="400" align="flex-start" style={styles.page}>
      <Text asChild size="xl" weight="semibold">
        <h1>Popper Resizing Demo</h1>
      </Text>
      <PopperExample />
    </Flex>
  )
}
