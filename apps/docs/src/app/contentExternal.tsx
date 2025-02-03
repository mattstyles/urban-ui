'use client'

import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { primary } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  p: {
    color: primary[500],
  },
})

export function ContentExternal() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content</h1>
      <p {...stylex.props(styles.p)}>
        Styled with external dependency and externally declared vars. Should be
        theme.primary colour.
      </p>
      <Text>Hello text</Text>
      <Flex>Hello flex</Flex>
    </div>
  )
}
