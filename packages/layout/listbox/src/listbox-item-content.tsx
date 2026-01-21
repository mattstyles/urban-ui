'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex, type FlexProps } from '@urban-ui/flex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  base: {
    padding: space[150],
  },
})

export interface ListboxItemContentProps extends FlexProps {}

/**
 * Content wrapper for ListboxItem with standard listbox styling.
 * Provides consistent padding and layout for listbox item content.
 * Built on Flex with column direction and gap defaults.
 */
export function ListboxItemContent({
  children,
  direction = 'column',
  gap = '100',
  style,
  ...props
}: ListboxItemContentProps) {
  return (
    <Flex
      direction={direction}
      gap={gap}
      style={[styles.base, ...(Array.isArray(style) ? style : [style])]}
      {...props}
    >
      {children}
    </Flex>
  )
}
ListboxItemContent.displayName = '@urban-ui/listbox/ListboxItemContent'
