'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { SectionProps as AriaSectionProps } from 'react-aria-components'
import { Header, Section as AriaSection } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
  },
})

export interface ListBox2SectionProps<T extends object>
  extends Omit<AriaSectionProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * ListBox2Section component for grouping related items.
 * Wraps React Aria Section with consistent styling.
 * Use with Header component for section titles.
 */
export function ListBox2Section<T extends object>({
  children,
  style,
  ...props
}: ListBox2SectionProps<T>) {
  return (
    <AriaSection {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaSection>
  )
}
ListBox2Section.displayName = '@urban-ui/listbox-2/ListBox2Section'

// Re-export Header from react-aria-components for convenience
export { Header as ListBox2Header }
