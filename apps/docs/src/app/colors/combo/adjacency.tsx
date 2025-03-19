'use client'

import * as stylex from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { critical, neutral, primary, success, warning } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, surface, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { wcagContrast } from 'culori'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const styles = stylex.create({
  tag: {
    backgroundColor: tone.component,
    color: tone.fgHi,
    borderRadius: radii.full,
    borderWidth: borderWidths.md,
    borderStyle: 'solid',
    borderColor: tone.border,
    paddingTop: space[200],
    paddingBottom: space[200],
    paddingLeft: space[300],
    paddingRight: space[300],
  },
  tagNoBorder: {
    borderColor: base.transparent,
  },
  panel: {
    backgroundColor: tone.surface,
    borderRadius: radii.lg,
    borderWidth: borderWidths.md,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    padding: space[400],
  },
  panelMuted: {
    background: tone.surfaceMuted,
  },
  panelNoBorder: {
    borderColor: base.transparent,
  },
  solid: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    borderRadius: radii.lg,
    paddingTop: space[200],
    paddingBottom: space[200],
    paddingLeft: space[300],
    paddingRight: space[300],
  },
  solidBorder: {
    backgroundColor: base.transparent,
    borderRadius: radii.lg,
    borderWidth: borderWidths.md,
    borderStyle: 'solid',
    borderColor: tone.solid,
    color: tone.fgHi,
    paddingTop: space[200],
    paddingBottom: space[200],
    paddingLeft: space[300],
    paddingRight: space[300],
  },
  border: {
    backgroundColor: base.transparent,
    borderRadius: radii.lg,
    borderWidth: borderWidths.md,
    borderStyle: 'solid',
    borderColor: tone.border,
    color: tone.fgHi,
    paddingTop: space[200],
    paddingBottom: space[200],
    paddingLeft: space[300],
    paddingRight: space[300],
  },
})

const page = stylex.create({
  block: {
    padding: space[400],
  },
  muted: {
    backgroundColor: surface.muted,
  },
  base: {
    backgroundColor: surface.base,
  },
  subtle: {
    backgroundColor: surface.subtle,
  },
  emphasis: {
    backgroundColor: surface.emphasis,
  },
})

export function Adjacency() {
  return (
    <Flex direction="v" gap="400">
      <Text size="lg">Adjacency</Text>
      <Flex direction="v" gap="200">
        <Text size="md" asChild>
          <p>There are no guidelines for adjacency contrasts.</p>
        </Text>
      </Flex>
      <Flex direction="v" gap="600">
        <Block theme={neutral} />
        <Block theme={primary} />
        <Block theme={critical} />
        <Block theme={success} />
        <Block theme={warning} />
      </Flex>
    </Flex>
  )
}

function Block({ theme }: { theme?: Theme<typeof tone> }) {
  return (
    <Flex direction="v" gap="400" style={theme}>
      <Flex direction="h" gap="400" wrap="wrap" align="center">
        <Flex style={styles.tag}>
          <Text size="sm">Border and component</Text>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[styles.panel, styles.panelMuted]}
        >
          <Text size="sm">Border muted and surface muted</Text>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex direction="v" gap="200" align="flex-start" style={[styles.panel]}>
          <Text size="sm">Border muted and surface</Text>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex direction="v" gap="200" align="flex-start">
          <Flex style={styles.solid}>
            <Text size="sm" weight="semibold">
              Solid background
            </Text>
          </Flex>
          {/* <Flex style={styles.solidBorder}>
            <Text size="md" weight="semibold">
              Solid border, selected. No.
            </Text>
          </Flex> */}
          <Flex style={styles.border}>
            <Text size="sm" weight="medium">
              Border, selected
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="h" gap="400" wrap="wrap" align="center">
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.muted]}
        >
          <Flex
            direction="v"
            style={[styles.panel, styles.panelNoBorder, styles.panelMuted]}
          >
            <Text size="sm">Surface muted on page muted</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.base]}
        >
          <Flex
            direction="v"
            style={[styles.panel, styles.panelNoBorder, styles.panelMuted]}
          >
            <Text size="sm">Surface muted on page base</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.subtle]}
        >
          <Flex
            direction="v"
            style={[styles.panel, styles.panelNoBorder, styles.panelMuted]}
          >
            <Text size="sm">Surface muted on page subtle</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.emphasis]}
        >
          <Flex
            direction="v"
            style={[styles.panel, styles.panelNoBorder, styles.panelMuted]}
          >
            <Text size="sm">Surface muted on page emphasis</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="h" gap="400" wrap="wrap" align="center">
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.muted]}
        >
          <Flex direction="v" style={[styles.panel, styles.panelNoBorder]}>
            <Text size="sm">Surface on page muted</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.base]}
        >
          <Flex direction="v" style={[styles.panel, styles.panelNoBorder]}>
            <Text size="sm">Surface on page base</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.subtle]}
        >
          <Flex direction="v" style={[styles.panel, styles.panelNoBorder]}>
            <Text size="sm">Surface on page subtle</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
        <Flex
          direction="v"
          gap="200"
          align="flex-start"
          style={[page.block, page.emphasis]}
        >
          <Flex direction="v" style={[styles.panel, styles.panelNoBorder]}>
            <Text size="sm">Surface on page emphasis</Text>
          </Flex>
          <Flex style={[styles.tag, styles.tagNoBorder]}>
            <Text size="sm">Component</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
