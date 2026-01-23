'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxSectionProps as AriaListBoxSectionProps } from 'react-aria-components'
import {
  Header as AriaHeader,
  ListBoxSection as AriaListBoxSection,
} from 'react-aria-components'

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
 *   <Header>Fruits</Header>
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

// Header styles
const headerStyles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingInline: space['100'],
    color: tone.fgLo,
  },
})

const headerSizeStyles = stylex.create({
  md: {
    paddingBlock: space['100'],
    minHeight: control.md,
  },
  lg: {
    paddingBlock: space['150'],
    minHeight: control.lg,
  },
})

export interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  /**
   * Size variant affects padding and height
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Visual label for a ListBoxSection. Sets correct padding for alignment with items.
 *
 * @example
 * ```tsx
 * <ListBoxSection>
 *   <ListBoxHeader>Category Name</ListBoxHeader>
 *   <ListBoxItem>...</ListBoxItem>
 * </ListBoxSection>
 * ```
 */
export function ListBoxHeader({
  size: sizeProp,
  style,
  children,
  ...props
}: HeaderProps) {
  const context = useListBoxContext()
  const size = sizeProp ?? context?.size ?? 'md'
  const textSize = size === 'md' ? 'xs' : 'sm'

  return (
    <AriaHeader
      {...props}
      {...stylex.props(headerStyles.header, headerSizeStyles[size], style)}
    >
      {typeof children === 'string' ? (
        <Text size={textSize} weight="semibold" tracking="wider" color="lo">
          {children}
        </Text>
      ) : (
        children
      )}
    </AriaHeader>
  )
}
ListBoxHeader.displayName = '@urban-ui/listbox-header'
