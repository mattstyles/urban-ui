'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { accent, base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

import { useDropdownContext } from './dropdown-context'

const styles = stylex.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: space['100'],
    borderRadius: radii.md,
    outline: 'none',
    transition: 'background 0.15s, color 0.15s',
    userSelect: 'none',
    // Default state
    backgroundColor: base.transparent,
    color: tone.fgHi,
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: tone.componentActive,
    },
    // Selected state
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnBlock,
    },
    // Focused state - highlighted background for mouse and keyboard interaction
    ':is([data-focused])': {
      backgroundColor: tone.componentHover,
    },
    // Selected + Hovered
    ':is([data-selected][data-hovered])': {
      backgroundColor: accent.solidHover,
    },
    // Selected + Pressed
    ':is([data-selected][data-pressed])': {
      backgroundColor: accent.solidActive,
    },
    // Selected + Focused
    ':is([data-selected][data-focused])': {
      backgroundColor: accent.solidActive,
    },
    // Disabled state
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
})

const sizeStyles = stylex.create({
  md: {
    paddingInline: space['100'],
    paddingBlock: space['25'],
    minHeight: control.md,
  },
  lg: {
    paddingInline: space['100'],
    paddingBlock: space['50'],
    minHeight: control.lg,
  },
})

export interface DropdownItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Size variant affects padding and text size
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Individual selectable option within a Dropdown.
 *
 * Automatically derives textValue from string children for accessibility.
 * For non-string children, provide textValue explicitly.
 *
 * @example
 * ```tsx
 * // Simple - textValue auto-derived from string
 * <DropdownItem id="edit">Edit</DropdownItem>
 *
 * // With label and description - textValue required
 * <DropdownItem id="read" textValue="Read">
 *   <Text slot="label">Read</Text>
 *   <Text slot="description">View content only</Text>
 * </DropdownItem>
 * ```
 */
export function DropdownItem<T extends object>({
  size: sizeProp,
  style,
  children,
  textValue,
  ...props
}: DropdownItemProps<T>) {
  const context = useDropdownContext()
  const size = sizeProp ?? context?.size ?? 'md'
  const textSize = size === 'md' ? 'sm' : 'md'

  // Auto-derive textValue from string children if not provided
  const derivedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <AriaListBoxItem
      {...props}
      textValue={derivedTextValue}
      {...stylex.props(styles.item, sizeStyles[size], style)}
    >
      {composeRenderProps(children, (children) => {
        // If children is a string, wrap in Text
        if (typeof children === 'string') {
          return (
            <Text slot="label" size={textSize} color="current">
              {children}
            </Text>
          )
        }
        // Otherwise render children directly (slotted or custom content)
        return children
      })}
    </AriaListBoxItem>
  )
}
DropdownItem.displayName = '@urban-ui/dropdown-item'
