'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { createContext, useContext } from 'react'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

export type ListBox2Size = 'sm' | 'md' | 'lg'

interface ListBox2ContextValue {
  size: ListBox2Size
}

const ListBox2Context = createContext<ListBox2ContextValue>({ size: 'md' })

export function useListBox2Context() {
  return useContext(ListBox2Context)
}

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: space[50],
    outline: 'none',
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
  },
})

export interface ListBox2Props<T extends object>
  extends Omit<AriaListBoxProps<T>, 'style'> {
  /**
   * Size variant for items
   * @default 'md'
   */
  size?: ListBox2Size
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * ListBox2 component - a standalone selection list.
 * Provides a styled container for list items with keyboard navigation support.
 * Size is passed to child items via context.
 */
export function ListBox2<T extends object>({
  children,
  size = 'md',
  style,
  ...props
}: ListBox2Props<T>) {
  return (
    <ListBox2Context.Provider value={{ size }}>
      <AriaListBox {...props} {...stylex.props([styles.base, style])}>
        {children}
      </AriaListBox>
    </ListBox2Context.Provider>
  )
}
ListBox2.displayName = '@urban-ui/listbox-2/ListBox2'
