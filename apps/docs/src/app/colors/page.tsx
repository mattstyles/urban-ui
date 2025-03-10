'use client'

import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { ToneBlock } from './tone'
import { Text } from '@urban-ui/text'
import { Flex } from '@urban-ui/flex'

const styles = stylex.create({
  container: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: tone.surfaceBase,
    minHeight: '100vh',
  },
  description: {
    marginTop: '8px',
  }
})

export default function ColorsPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <Flex direction="column" gap="300">
        <div>
          <Text size="xl" weight="semibold">Color Tokens</Text>
          <Text {...stylex.props(styles.description)} size="md" color="neutral">A comprehensive set of semantic color tokens used throughout the Urban UI design system.</Text>
        </div>
        <ToneBlock />
      </Flex>
    </div>
  )
}
