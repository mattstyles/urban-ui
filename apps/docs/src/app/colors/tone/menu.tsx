'use client'

import type { Theme } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { useState } from 'react'

const styles = stylex.create({
  container: {
    borderRadius: radii.md,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    paddingLeft: space[400],
    paddingRight: space[400],
    paddingTop: space[100],
    paddingBottom: space[100],
  },
  menuItem: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    borderColor: base.transparent,
    paddingTop: space[100],
    paddingBottom: space[100],
    paddingLeft: space[600],
    paddingRight: space[600],
    transition: 'color 150ms ease-out, background-color 150ms ease-out',

    ':hover': {
      backgroundColor: tone.solidHover,
      color: tone.fgOnBlock,
    },
    ':active': {
      backgroundColor: tone.solidActive,
      color: tone.fgOnBlock,
    },
  },
  menuItemSelected: {
    color: tone.fgOnBlock,
    backgroundColor: tone.solid,

    ':hover': {
      backgroundColor: tone.solid,
      color: tone.fgOnBlock,
    },
    ':active': {
      backgroundColor: tone.solid,
      color: tone.fgOnBlock,
    },
  },
  block: {
    backgroundColor: tone.solid,
    paddingLeft: space[400],
    paddingRight: space[400],
    paddingTop: space[200],
    paddingBottom: space[200],
    borderRadius: radii.sm,
  },
})

const fadedStyles = stylex.create({
  menuItemFaded: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    borderColor: base.transparent,
    paddingTop: space[100],
    paddingBottom: space[100],
    paddingLeft: space[600],
    paddingRight: space[600],
    transition: 'color 150ms ease-out, background-color 150ms ease-out',

    ':hover': {
      backgroundColor: tone.componentHover,
      color: tone.fgHi,
    },
    ':active': {
      backgroundColor: tone.componentActive,
      color: tone.fgHi,
    },
  },
  menuItemFadedSelected: {
    color: tone.fgHi,
    backgroundColor: tone.component,

    ':hover': {
      backgroundColor: tone.component,
      color: tone.fgHi,
    },
    ':active': {
      backgroundColor: tone.component,
      color: tone.fgHi,
    },
  },
})

export function MenuExample() {
  return (
    <Flex direction="v" gap="200">
      <Flex direction="v" gap="400">
        <Text size="lg" weight="semibold">
          Block colour examples
        </Text>
      </Flex>
      <MenuContrast theme={themes.neutral} />
      <MenuContrast theme={themes.primary} />
      <MenuContrast theme={themes.critical} />
      <MenuContrast theme={themes.warning} />
      <MenuContrast theme={themes.positive} />
      <MenuContrast theme={themes.info} />
      <MenuContrast theme={themes.accent} />
    </Flex>
  )
}

function MenuContrast({
  theme = themes.neutral,
}: {
  theme?: Theme<typeof tone>
}) {
  const [selected, setSelected] = useState(0)
  return (
    <Flex direction="h" gap="400" style={[styles.container, theme]}>
      <Flex direction="v" gap="0">
        <MenuItem isSelected={selected === 0} onPress={() => setSelected(0)}>
          First item
        </MenuItem>
        <MenuItem isSelected={selected === 1} onPress={() => setSelected(1)}>
          Second item{' '}
        </MenuItem>
        <MenuItem isSelected={selected === 2} onPress={() => setSelected(2)}>
          Third item{' '}
        </MenuItem>
      </Flex>
      <Flex direction="v" gap="0">
        <MenuItemFaded
          isSelected={selected === 0}
          onPress={() => setSelected(0)}
        >
          First item
        </MenuItemFaded>
        <MenuItemFaded
          isSelected={selected === 1}
          onPress={() => setSelected(1)}
        >
          Second item{' '}
        </MenuItemFaded>
        <MenuItemFaded
          isSelected={selected === 2}
          onPress={() => setSelected(2)}
        >
          Third item{' '}
        </MenuItemFaded>
      </Flex>
    </Flex>
  )
}

function MenuItem({
  onPress,
  isSelected,
  children,
}: React.PropsWithChildren<{ onPress: () => void; isSelected: boolean }>) {
  return (
    <button
      {...stylex.props(styles.menuItem, isSelected && styles.menuItemSelected)}
      onClick={onPress}
    >
      {children}
    </button>
  )
}

function MenuItemFaded({
  onPress,
  isSelected,
  children,
}: React.PropsWithChildren<{ onPress: () => void; isSelected: boolean }>) {
  return (
    <button
      {...stylex.props(
        fadedStyles.menuItemFaded,
        isSelected && fadedStyles.menuItemFadedSelected,
      )}
      onClick={onPress}
    >
      {children}
    </button>
  )
}
