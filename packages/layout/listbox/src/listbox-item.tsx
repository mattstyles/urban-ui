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
 * @example
 * ```tsx
 * <ListBoxItem id="cat">Cat</ListBoxItem>
 *
 * // With label and description slots
 * <ListBoxItem id="read" textValue="Read">
 *   <Text slot="label">Read</Text>
 *   <Text slot="description">View content only</Text>
 * </ListBoxItem>
 * ```
 */
export function ListBoxItem<T extends object>({
  size = 'md',
  style,
  children,
  ...props
}: ListBoxItemProps<T>) {
  const textSize = size === 'md' ? 'sm' : 'md'

  return (
    <AriaListBoxItem
      {...props}
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
ListBoxItem.displayName = '@urban-ui/listbox-item'
