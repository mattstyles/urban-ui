'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[50],
    padding: space[50],
    outline: 'none',
    overflow: 'auto',
  },
})

export interface DropdownListBoxProps<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * DropdownListBox component for use within Select and other dropdown components.
 * Provides a styled container for list items with keyboard navigation support.
 */
export function DropdownListBox<T extends object>({
  children,
  style,
  ...props
}: DropdownListBoxProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaListBox>
  )
}
DropdownListBox.displayName = '@urban-ui/listbox/DropdownListBox'
