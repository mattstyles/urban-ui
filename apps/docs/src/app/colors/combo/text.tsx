'use client'

import * as stylex from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
// import { critical, neutral, primary, success, warning } from '@urban-ui/theme'
import { themes } from '@urban-ui/theme'
import { base, surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { wcagContrast } from 'culori'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const styles = stylex.create({
  block: {
    width: 64,
    height: 64,
  },
  inset: {
    margin: space[100],
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
  pageMuted: {
    backgroundColor: surface.muted,
  },
  page: {
    backgroundColor: surface.base,
  },
  pageSubtle: {
    backgroundColor: surface.subtle,
  },
  pageEmphasis: {
    backgroundColor: surface.emphasis,
  },
})

export function TextCombo() {
  return (
    <Flex direction="v" gap="400">
      <Text size="lg">Contrast</Text>
      <Flex direction="v" gap="200">
        <Text size="md">4.5:1 - AA (normal text)</Text>
        <Text size="md">3:1 - AA (large text)</Text>
        <Text size="md">7:1 - AAA (normal text)</Text>
        <Text size="md">4.5:1 - AAA (large text)</Text>
      </Flex>
      <Text>
        Smaller boxes denote interactive states. These are lower priority for
        full compliance, however, they should still be considered, particularly
        active states as those can be used for selected states.
      </Text>
      <ContrastGroup theme={themes.neutral} />
      <ContrastGroup theme={themes.primary} />
      <ContrastGroup theme={themes.critical} />
      <ContrastGroup theme={themes.warning} />
      <ContrastGroup theme={themes.positive} />
      <ExampleCopy />
    </Flex>
  )
}

function ContrastGroup({ theme }: { theme: Theme<typeof tone> }) {
  return (
    <Flex gap="400" style={theme} wrap="wrap">
      <Flex direction="v" gap="200">
        <Text weight="semibold">High contrast</Text>
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
        <Text weight="semibold">Low contrast</Text>
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
        <Text weight="semibold">Block contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="onBlock" background="solid" />
          <ContrastBlock foreground="onBlock" background="solidHover" />
          <ContrastBlock foreground="onBlock" background="solidActive" />
        </Flex>
      </Flex>
      <Flex direction="v" gap="200">
        <Text weight="semibold">Page high contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="hi" background="pageMuted" />
          <ContrastBlock foreground="hi" background="page" />
          <ContrastBlock foreground="hi" background="pageSubtle" />
          <ContrastBlock foreground="hi" background="pageEmphasis" />
        </Flex>
      </Flex>
      <Flex direction="v" gap="200">
        <Text weight="semibold">Page low contrast</Text>
        <Flex direction="h" gap="0">
          <ContrastBlock foreground="lo" background="pageMuted" />
          <ContrastBlock foreground="lo" background="page" />
          <ContrastBlock foreground="lo" background="pageSubtle" />
          <ContrastBlock foreground="lo" background="pageEmphasis" />
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
    | 'pageMuted'
    | 'page'
    | 'pageSubtle'
    | 'pageEmphasis'
}) {
  const [value, setValue] = useState(0)
  const [fg, setFg] = useState<string>('')
  const [bg, setBg] = useState<string>('')

  const backgroundRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setBg(window.getComputedStyle(node).backgroundColor)
    }
  }, [])

  const foregroundRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setFg(window.getComputedStyle(node).color)
    }
  }, [])

  useLayoutEffect(() => {
    setValue(contrastRatio(fg, bg))
  }, [fg, bg])

  const isLowPriority = useCallback(() => {
    return (
      background === 'componentHover' ||
      background === 'componentActive' ||
      background === 'solidHover' ||
      background === 'solidActive'
    )
  }, [background])

  return (
    <Flex style={styles.block}>
      <Flex
        ref={backgroundRef}
        align="center"
        justify="center"
        flex="1"
        style={[backgrounds[background], isLowPriority() && styles.inset]}
      >
        <Text
          ref={foregroundRef}
          color={foreground}
          size="md"
          weight="semibold"
        >
          {value.toFixed(1)}
        </Text>
      </Flex>
    </Flex>
  )
}

/**
 * Calculate contrast ratio between foreground and background colors
 * Following WCAG guidelines:
 * - 4.5:1 minimum for normal text
 * - 3:1 minimum for large text
 * - 7:1 for enhanced contrast
 */
function contrastRatio(fg: string, bg: string): number {
  if (!fg || !bg) return 0

  return wcagContrast(fg, bg)
}

function ExampleCopy() {
  return (
    <Flex direction="v" gap="200">
      <Flex gap="100" style={themes.neutral}>
        <Text color="lo">Low contrast with</Text>
        <Text color="hi">High contrast text.</Text>
      </Flex>
      <Flex gap="100" style={themes.primary}>
        <Text color="lo">Low contrast with</Text>
        <Text color="hi">High contrast text.</Text>
      </Flex>
      <Flex gap="100" style={themes.critical}>
        <Text>Critical</Text>
      </Flex>
      <Flex gap="100" style={themes.positive}>
        <Text>Positive</Text>
      </Flex>
      <Flex gap="100" style={themes.warning}>
        <Text color="lo">Low contrast with</Text>
        <Text color="hi">High contrast text.</Text>
      </Flex>
    </Flex>
  )
}
