'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { accent, base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

import { type ListBox2Size, useListBox2Context } from './listbox'
import { ListBox2ItemTextInline } from './listbox-item-text'

/**
 * Visual states for ListBox2Item:
 *
 * - isHovered: Mouse is over the item
 * - isPressed: Item is being pressed (mouse down or touch)
 * - isSelected: Item is currently selected (background color change only)
 * - isFocusVisible: Item has visible focus indicator (keyboard navigation)
 * - isDisabled: Item is not interactive
 *
 * State priority (highest to lowest):
 * 1. isDisabled - overrides all other states
 * 2. isSelected - shows selection state via background color
 * 3. isPressed/isActive - shows press feedback
 * 4. isFocusVisible - shows focus ring for keyboard navigation
 * 5. isHovered - shows hover highlight
 */
const styles = stylex.create({
  base: {
    display: 'flex',
    borderRadius: radii.md,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    transition: 'background 0.15s, color 0.15s',
    // Hover state (data-hovered or :hover)
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state - keyboard navigation (focus-visible or :focus-visible)
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
    // Pressed state (data-pressed or :active)
    ':is([data-pressed])': {
      backgroundColor: tone.solidActive,
    },
    // Selected state (data-selected) - background color only, no checkmark
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnBlock,
    },
    // Selected + hover (data-selected and data-hovered)
    ':is([data-selected][data-hovered])': {
      backgroundColor: accent.solidHover,
    },
    // Selected + pressed (data-selected and data-pressed)
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
  // Size variants for padding
  sm: {
    paddingBlock: space[50],
    paddingInline: space[100],
  },
  md: {
    paddingBlock: space[100],
    paddingInline: space[150],
  },
  lg: {
    paddingBlock: space[150],
    paddingInline: space[200],
  },
})

const sizeStyles: Record<ListBox2Size, stylex.StyleXStyles> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
}

export interface ListBox2ItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Size variant - overrides context size
   */
  size?: ListBox2Size
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * ListBox2Item component for use within ListBox2.
 * Provides styled items with hover, focus-visible, pressed, selected, and disabled states.
 * Selection is indicated by background color change only (no checkmark).
 *
 * Visual states are modeled using CSS :is() selectors to handle both
 * native CSS pseudo-classes and react-aria data attributes.
 */
export function ListBox2Item<T extends object>({
  children,
  size: sizeProp,
  style,
  ...props
}: ListBox2ItemProps<T>) {
  const { size: contextSize } = useListBox2Context()
  const size = sizeProp ?? contextSize

  return (
    <AriaListBoxItem
      {...props}
      {...stylex.props(styles.base, sizeStyles[size], style)}
    >
      {composeRenderProps(children, (children) =>
        typeof children === 'string' ? (
          <ListBox2ItemTextInline slot="label" size={size}>
            {children}
          </ListBox2ItemTextInline>
        ) : (
          children
        ),
      )}
    </AriaListBoxItem>
  )
}
ListBox2Item.displayName = '@urban-ui/listbox-2/ListBox2Item'
