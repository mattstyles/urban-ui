'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { ToneBlock } from './tone'

const styles = stylex.create({
  container: {
    padding: '32px',
    maxWidth: '320px',
    margin: '0 auto',
    // backgroundColor: tone.fgLo,
    minHeight: '100vh',
  },
  description: {
    marginTop: '8px',
  },
})

export default function ColorsPage() {
  return (
    <Flex direction="column" gap="300">
      <Text size="xl" weight="semibold">
        Color Tokens
      </Text>
      <Text {...stylex.props(styles.description)} size="md" color="neutral">
        A comprehensive set of semantic color tokens used throughout the Urban
        UI design system.
      </Text>
      <Flex align="flex-start" direction="horizontal">
        <Flex direction="column" gap="300" style={styles.container}>
          <ToneBlock />
        </Flex>
      </Flex>
    </Flex>
  )
}
