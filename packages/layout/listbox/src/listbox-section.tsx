'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxSectionProps as AriaListBoxSectionProps } from 'react-aria-components'
import { ListBoxSection as AriaListBoxSection } from 'react-aria-components'

import { useListBoxContext } from './listbox-context'

const sectionStyles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingBlockEnd: {
      default: space['150'],
      ':last-of-type': 0,
    },
  },
})

const sectionSizeStyles = stylex.create({
  md: {
    gap: space['50'],
  },
  lg: {
    gap: space['100'],
  },
})

export interface ListBoxSectionProps<T extends object>
  extends Omit<AriaListBoxSectionProps<T>, 'style' | 'className'> {
  /**
   * Size variant affects spacing
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Groups related ListBoxItems with an optional header.
 *
 * @example
 * ```tsx
 * <ListBoxSection>
 *   <ListBoxHeader>Fruits</ListBoxHeader>
 *   <ListBoxItem id="apple">Apple</ListBoxItem>
 *   <ListBoxItem id="banana">Banana</ListBoxItem>
 * </ListBoxSection>
 * ```
 */
export function ListBoxSection<T extends object>({
  size: sizeProp,
  style,
  children,
  ...props
}: ListBoxSectionProps<T>) {
  const context = useListBoxContext()
  const size = sizeProp ?? context?.size ?? 'md'

  return (
    <AriaListBoxSection
      {...props}
      {...stylex.props(sectionStyles.section, sectionSizeStyles[size], style)}
    >
      {children}
    </AriaListBoxSection>
  )
}
ListBoxSection.displayName = '@urban-ui/listbox-section'
