'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxSectionProps as AriaListBoxSectionProps } from 'react-aria-components'
import {
  Header as AriaHeader,
  ListBoxSection as AriaListBoxSection,
} from 'react-aria-components'

const sectionStyles = stylex.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: space['100'],
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
 *   <Header>Fruits</Header>
 *   <ListBoxItem id="apple">Apple</ListBoxItem>
 *   <ListBoxItem id="banana">Banana</ListBoxItem>
 * </ListBoxSection>
 * ```
 */
export function ListBoxSection<T extends object>({
  size = 'md',
  style,
  children,
  ...props
}: ListBoxSectionProps<T>) {
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

// Header styles
const headerStyles = stylex.create({
  header: {
    paddingInline: space['200'],
    paddingBlock: space['100'],
    color: tone.fgLo,
  },
})

const headerSizeStyles = stylex.create({
  md: {
    paddingInline: space['200'],
  },
  lg: {
    paddingInline: space['300'],
  },
})

export interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  /**
   * Size variant affects padding to align with items
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Visual label for a ListBoxSection.
 *
 * @example
 * ```tsx
 * <ListBoxSection>
 *   <Header>Category Name</Header>
 *   <ListBoxItem>...</ListBoxItem>
 * </ListBoxSection>
 * ```
 */
export function Header({
  size = 'md',
  style,
  children,
  ...props
}: HeaderProps) {
  const textSize = size === 'md' ? 'sm' : 'md'

  return (
    <AriaHeader
      {...props}
      {...stylex.props(headerStyles.header, headerSizeStyles[size], style)}
    >
      {typeof children === 'string' ? (
        <Text size={textSize} weight="medium" color="current">
          {children}
        </Text>
      ) : (
        children
      )}
    </AriaHeader>
  )
}
Header.displayName = '@urban-ui/listbox-header'
