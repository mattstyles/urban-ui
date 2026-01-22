'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex, type FlexProps } from '@urban-ui/flex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  base: {
    padding: space[150],
  },
})

export interface DropdownItemContentProps extends FlexProps {}

/**
 * Content wrapper for DropdownItem with standard dropdown styling.
 * Provides consistent padding and layout for dropdown item content.
 * Built on Flex with column direction and gap defaults.
 */
export function DropdownItemContent({
  children,
  direction = 'column',
  gap = '100',
  style,
  ...props
}: DropdownItemContentProps) {
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
DropdownItemContent.displayName = '@urban-ui/listbox/DropdownItemContent'
