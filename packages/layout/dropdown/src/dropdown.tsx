'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

import { DropdownProvider } from './dropdown-context'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: space['100'],
    paddingBlock: space['100'],
    outline: 'none',
  },
})

const sizeStyles = stylex.create({
  md: {
    gap: space['50'],
  },
  lg: {
    gap: space['100'],
  },
})

export interface DropdownProps<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style' | 'className'> {
  /**
   * Size variant affects item padding and text size
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Dropdown displays a list of options within a dialog context (popover, menu, modal).
 * Provides keyboard navigation, selection management, and accessibility via React Aria.
 *
 * For inline lists in the page, use ListBox instead.
 *
 * @example
 * ```tsx
 * <Dropdown aria-label="Options" selectionMode="single">
 *   <DropdownItem id="edit">Edit</DropdownItem>
 *   <DropdownItem id="delete">Delete</DropdownItem>
 * </Dropdown>
 * ```
 */
export function Dropdown<T extends object>({
  size = 'md',
  style,
  children,
  ...props
}: DropdownProps<T>) {
  return (
    <DropdownProvider size={size}>
      <AriaListBox
        {...props}
        {...stylex.props(styles.base, sizeStyles[size], style)}
      >
        {children}
      </AriaListBox>
    </DropdownProvider>
  )
}
Dropdown.displayName = '@urban-ui/dropdown'
