'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const styles = stylex.create({
  block: {
    width: 64,
    height: 64,
  },
})

const backgrounds = stylex.create({
  white: {
    backgroundColor: base.white,
  },
  surfaceMuted: {
    backgroundColor: tone.surfaceMuted,
  },
  surface: {
    backgroundColor: tone.surface,
  },
  component: {
    backgroundColor: tone.component,
  },
  componentHover: {
    backgroundColor: tone.componentHover,
  },
  componentActive: {
    backgroundColor: tone.componentActive,
  },
  solid: {
    backgroundColor: tone.solid,
  },
  solidHover: {
    backgroundColor: tone.solidHover,
  },
  solidActive: {
    backgroundColor: tone.solidActive,
  },
})

export function TextCombo() {
  return (
    <Flex direction="v" gap="400">
      <Flex direction="v" gap="200">
        <Text>High contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="hi" background="white" />
          <ContrastBlock foreground="hi" background="surfaceMuted" />
          <ContrastBlock foreground="hi" background="surface" />
          <ContrastBlock foreground="hi" background="component" />
          <ContrastBlock foreground="hi" background="componentHover" />
          <ContrastBlock foreground="hi" background="componentActive" />
        </Flex>
      </Flex>
      <Flex direction="v" gap="200">
        <Text>Low contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="lo" background="white" />
          <ContrastBlock foreground="lo" background="surfaceMuted" />
          <ContrastBlock foreground="lo" background="surface" />
          <ContrastBlock foreground="lo" background="component" />
          <ContrastBlock foreground="lo" background="componentHover" />
          <ContrastBlock foreground="lo" background="componentActive" />
        </Flex>
      </Flex>
      <Flex direction="v" gap="200">
        <Text>Block contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="onBlock" background="solid" />
          <ContrastBlock foreground="onBlock" background="solidHover" />
          <ContrastBlock foreground="onBlock" background="solidActive" />
        </Flex>
      </Flex>
    </Flex>
  )
}

function ContrastBlock({
  foreground,
  background,
}: {
  foreground: 'hi' | 'lo' | 'onBlock'
  background:
    | 'white'
    | 'surfaceMuted'
    | 'surface'
    | 'component'
    | 'componentHover'
    | 'componentActive'
    | 'solid'
    | 'solidHover'
    | 'solidActive'
}) {
  const [value, setValue] = useState(0)

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      console.log(node.getBoundingClientRect())
    }
  }, [])

  return (
    <Flex
      ref={measuredRef}
      align="center"
      justify="center"
      style={[backgrounds[background], styles.block]}
    >
      <Text color={foreground} size="md" weight="semibold">
        0.0
      </Text>
    </Flex>
  )
}
