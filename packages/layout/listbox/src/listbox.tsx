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

    // Remove all these (or apply as a convenience, see docs/dialog-trigger-patterns)
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
  },
})

export interface ListboxProps<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Listbox component for standalone list selection.
 * Provides a styled container for list items with keyboard navigation support.
 */
export function Listbox<T extends object>({
  children,
  style,
  ...props
}: ListboxProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaListBox>
  )
}
Listbox.displayName = '@urban-ui/listbox/Listbox'
