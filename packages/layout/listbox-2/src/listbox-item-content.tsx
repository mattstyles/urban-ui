'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex, type FlexProps } from '@urban-ui/flex'
import { space } from '@urban-ui/theme/layout.stylex'

import type { ListBox2Size } from './listbox'
import { useListBox2Context } from './listbox'

const styles = stylex.create({
  sm: {
    padding: space[50],
  },
  md: {
    padding: space[100],
  },
  lg: {
    padding: space[150],
  },
})

const sizeStyles: Record<ListBox2Size, stylex.StyleXStyles> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

export interface ListBox2ItemContentProps extends FlexProps {
  /**
   * Size variant - overrides context size
   */
  size?: ListBox2Size
}

/**
 * Content wrapper for ListBox2Item with standard styling.
 * Provides consistent padding and layout for item content.
 * Built on Flex with column direction and gap defaults.
 * Use this for composing icon + text layouts within items.
 */
export function ListBox2ItemContent({
  children,
  size: sizeProp,
  direction = 'column',
  gap = '100',
  style,
  ...props
}: ListBox2ItemContentProps) {
  const { size: contextSize } = useListBox2Context()
  const size = sizeProp ?? contextSize

  return (
    <Flex
      direction={direction}
      gap={gap}
      style={[sizeStyles[size], ...(Array.isArray(style) ? style : [style])]}
      {...props}
    >
      {children}
    </Flex>
  )
}
ListBox2ItemContent.displayName = '@urban-ui/listbox-2/ListBox2ItemContent'
