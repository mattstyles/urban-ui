'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { MenuSectionProps as AriaMenuSectionProps } from 'react-aria-components'
import { MenuSection as AriaMenuSection } from 'react-aria-components'

import { useMenuContext } from './menu-context'

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

export interface MenuSectionProps<T extends object>
  extends Omit<AriaMenuSectionProps<T>, 'style' | 'className'> {
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
 * Groups related MenuItems with an optional header.
 *
 * @example
 * ```tsx
 * <MenuSection>
 *   <MenuHeader>Actions</MenuHeader>
 *   <MenuItem id="edit">Edit</MenuItem>
 *   <MenuItem id="delete">Delete</MenuItem>
 * </MenuSection>
 * ```
 */
export function MenuSection<T extends object>({
  size: sizeProp,
  style,
  children,
  ...props
}: MenuSectionProps<T>) {
  const context = useMenuContext()
  const size = sizeProp ?? context?.size ?? 'md'

  return (
    <AriaMenuSection
      {...props}
      {...stylex.props(sectionStyles.section, sectionSizeStyles[size], style)}
    >
      {children}
    </AriaMenuSection>
  )
}
MenuSection.displayName = '@urban-ui/menu-section'
