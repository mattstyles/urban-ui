'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: space[50],
    outline: 'none',
    overflow: 'auto',
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
  },
})

export interface DropdownProps<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Dropdown component for use within Select and other dropdown components.
 * Provides a styled container for list items with keyboard navigation support.
 */
export function Dropdown<T extends object>({
  children,
  style,
  ...props
}: DropdownProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaListBox>
  )
}
Dropdown.displayName = '@urban-ui/listbox/Dropdown'

// Backwards compatibility alias
export const DropdownListBox = Dropdown
export type DropdownListBoxProps<T extends object> = DropdownProps<T>
