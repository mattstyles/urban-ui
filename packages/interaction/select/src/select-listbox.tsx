'use client'

import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

const styles = stylex.create({
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: space[50],
    outline: 'none',
  },
})

export function SelectListBox<T extends object>({
  children,
  style,
  ...props
}: AriaListBoxProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props(styles.listbox)}>
      {children}
    </AriaListBox>
  )
}
