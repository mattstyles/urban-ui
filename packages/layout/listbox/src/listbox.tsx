'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

import { ListBoxProvider } from './listbox-context'

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

export interface ListBoxProps<T extends object>
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
 * ListBox displays a list of options and allows a user to select one or more of them.
 * Provides keyboard navigation, selection management, and accessibility via React Aria.
 *
 * @example
 * ```tsx
 * <ListBox aria-label="Animals" selectionMode="single">
 *   <ListBoxItem id="cat">Cat</ListBoxItem>
 *   <ListBoxItem id="dog">Dog</ListBoxItem>
 * </ListBox>
 * ```
 */
export function ListBox<T extends object>({
  size = 'md',
  style,
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <ListBoxProvider size={size}>
      <AriaListBox
        {...props}
        {...stylex.props(styles.base, sizeStyles[size], style)}
      >
        {children}
      </AriaListBox>
    </ListBoxProvider>
  )
}
ListBox.displayName = '@urban-ui/listbox'
