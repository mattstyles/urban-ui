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

export interface SelectListBoxProps<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * SelectListBox component for use within Select popover.
 * Provides a styled container for SelectItem components with keyboard navigation support.
 */
export function SelectListBox<T extends object>({
  children,
  style,
  ...props
}: SelectListBoxProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaListBox>
  )
}
SelectListBox.displayName = '@urban-ui/select/SelectListBox'
