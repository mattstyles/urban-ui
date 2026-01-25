'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import { Header as AriaHeader } from 'react-aria-components'

import { useDropdownContext } from './dropdown-context'

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
    paddingBlockEnd: space['50'],
    minHeight: control.md,
  },
  lg: {
    paddingBlock: space['150'],
    paddingBlockEnd: space['100'],
    minHeight: control.lg,
  },
})

export interface DropdownHeaderProps
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
 * Visual label for a DropdownSection. Sets correct padding for alignment with items.
 *
 * @example
 * ```tsx
 * <DropdownSection>
 *   <DropdownHeader>Category Name</DropdownHeader>
 *   <DropdownItem>...</DropdownItem>
 * </DropdownSection>
 * ```
 */
export function DropdownHeader({
  size: sizeProp,
  style,
  children,
  ...props
}: DropdownHeaderProps) {
  const context = useDropdownContext()
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
DropdownHeader.displayName = '@urban-ui/dropdown-header'
