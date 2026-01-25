'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { accent, base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

import { useListBoxContext } from './listbox-context'

const styles = stylex.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: space['100'],
    borderRadius: radii.md,
    outline: 'none',
    transition: 'background 0.15s, color 0.15s',
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
    // Selected + Hovered
    ':is([data-selected][data-hovered])': {
      backgroundColor: accent.solidHover,
    },
    // Selected + Pressed
    ':is([data-selected][data-pressed])': {
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

// Variant-specific styles for hover and focus states
const variantStyles = stylex.create({
  // Inline variant: standard hover/focus for items in the page
  inline: {
    // Hovered state
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state - keyboard navigation
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
  },
  // Dialog variant: focus highlight for items within dialogs (popovers, dropdowns)
  // Uses data-focused which is applied on both mouse hover and keyboard navigation
  dialog: {
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
  },
})

const sizeStyles = stylex.create({
  md: {
    paddingInline: space['100'],
    paddingBlock: space['100'],
    minHeight: control.md,
  },
  lg: {
    paddingInline: space['100'],
    paddingBlock: space['150'],
    minHeight: control.lg,
  },
})

export interface ListBoxItemProps<T extends object>
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
 * Individual selectable option within a ListBox.
 *
 * Automatically derives textValue from string children for accessibility.
 * For non-string children, provide textValue explicitly.
 *
 * @example
 * ```tsx
 * // Simple - textValue auto-derived from string
 * <ListBoxItem id="cat">Cat</ListBoxItem>
 *
 * // With label and description - textValue required
 * <ListBoxItem id="read" textValue="Read">
 *   <Text slot="label">Read</Text>
 *   <Text slot="description">View content only</Text>
 * </ListBoxItem>
 * ```
 */
export function ListBoxItem<T extends object>({
  size: sizeProp,
  style,
  children,
  textValue,
  ...props
}: ListBoxItemProps<T>) {
  const context = useListBoxContext()
  const size = sizeProp ?? context?.size ?? 'md'
  const variant = context?.variant ?? 'inline'
  const textSize = size === 'md' ? 'sm' : 'md'

  // Auto-derive textValue from string children if not provided
  const derivedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <AriaListBoxItem
      {...props}
      textValue={derivedTextValue}
      {...stylex.props(
        styles.item,
        variantStyles[variant],
        sizeStyles[size],
        style,
      )}
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
ListBoxItem.displayName = '@urban-ui/listbox-item'
