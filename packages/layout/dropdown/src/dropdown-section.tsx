'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxSectionProps as AriaListBoxSectionProps } from 'react-aria-components'
import { ListBoxSection as AriaListBoxSection } from 'react-aria-components'

import { useDropdownContext } from './dropdown-context'

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

export interface DropdownSectionProps<T extends object>
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
 * Groups related DropdownItems with an optional header.
 *
 * @example
 * ```tsx
 * <DropdownSection>
 *   <DropdownHeader>Actions</DropdownHeader>
 *   <DropdownItem id="edit">Edit</DropdownItem>
 *   <DropdownItem id="delete">Delete</DropdownItem>
 * </DropdownSection>
 * ```
 */
export function DropdownSection<T extends object>({
  size: sizeProp,
  style,
  children,
  ...props
}: DropdownSectionProps<T>) {
  const context = useDropdownContext()
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
DropdownSection.displayName = '@urban-ui/dropdown-section'
