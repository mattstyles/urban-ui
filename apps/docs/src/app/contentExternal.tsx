'use client'

import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Test } from '@urban-ui/test'
import { Text } from '@urban-ui/text'
import { grays, primary } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

import { TestInternal } from './testInternal'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    backgroundColor: grays[100],
    color: grays[900],
    margin: space[200],
  },
  p: {
    color: primary[500],
    fontSize: fontSizes.md,
    padding: space[300],
  },
})

const variants = stylex.create({
  violet: {
    backgroundColor: {
      default: 'blueviolet',
      ':hover': 'darkviolet',
    },
  },
  gray: {
    backgroundColor: {
      default: 'gainsboro',
      ':hover': 'lightgray',
    },
  },
  // ... more variants here ...
})

type ContentExternalProps = { variant?: 'violet' | 'gray' }
export function ContentExternal({ variant = 'violet' }: ContentExternalProps) {
  // const variant = 'violet'

  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content external</h1>
      <p {...stylex.props(styles.p)}>
        Styled with external dependency and externally declared vars. Should be
        theme.primary colour.
      </p>
      <Flex gap="200" direction="h">
        <Text>Hello text</Text>
      </Flex>
      <Flex>Hello flex</Flex>
      <Test variant="violet">Test component</Test>
      <div style={{ padding: 20 }} />
      <p {...stylex.props(variants[variant])}>Test variant</p>
      <TestInternal variant="violet">Hello world</TestInternal>
    </div>
  )
}
