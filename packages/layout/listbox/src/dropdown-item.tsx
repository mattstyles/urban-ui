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
  Text as AriaText,
  composeRenderProps,
} from 'react-aria-components'

/**
 * Visual states for DropdownItem:
 *
 * - isHovered: Mouse is over the item
 * - isPressed: Item is being pressed (mouse down or touch)
 * - isSelected: Item is currently selected
 * - isFocusVisible: Item has visible focus indicator (keyboard navigation)
 * - isDisabled: Item is not interactive
 *
 * State priority (highest to lowest):
 * 1. isDisabled - overrides all other states
 * 2. isSelected - shows selection state
 * 3. isPressed/isActive - shows press feedback
 * 4. isFocusVisible - shows focus ring for keyboard navigation
 * 5. isHovered - shows hover highlight
 */
const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[200],
    paddingBlock: space[100],
    paddingInline: space[150],
    borderRadius: radii.md,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    transition: 'background 0.15s, color 0.15s',
  },
  /**
   * Hover state - mouse over the item
   * Uses :is() to handle both CSS hover and data attribute from react-aria
   */
  hover: {
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
  },
  /**
   * Focus visible state - shows focus ring for keyboard navigation
   * Only appears for keyboard navigation, not mouse clicks
   */
  focusVisible: {
    ':is([data-focus-visible], :focus-visible)': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
  },
  /**
   * Pressed/Active state - item is being pressed
   * Uses :is() to handle both CSS active and data attribute from react-aria
   */
  pressed: {
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
  /**
   * Selected state - item is currently selected
   * Uses accent colors for selection indication
   */
  selected: {
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnBlock,
    },
  },
  /**
   * Selected + hover - subtle feedback when hovering selected item
   */
  selectedHover: {
    ':is([data-selected][data-hovered], [data-selected]:hover)': {
      backgroundColor: accent.solidHover,
    },
  },
  /**
   * Selected + pressed - feedback when pressing selected item
   */
  selectedPressed: {
    ':is([data-selected][data-pressed], [data-selected]:active)': {
      backgroundColor: accent.solidActive,
    },
  },
  /**
   * Disabled state - item cannot be interacted with
   * Uses data attribute from react-aria
   */
  disabled: {
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
})

export interface DropdownItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * DropdownItem component for use within DropdownListBox.
 * Provides styled items with hover, focus-visible, pressed, selected, and disabled states.
 *
 * Visual states are modeled using CSS :is() selectors to handle both
 * native CSS pseudo-classes and react-aria data attributes.
 */
export function DropdownItem<T extends object>({
  children,
  style,
  ...props
}: DropdownItemProps<T>) {
  return (
    <AriaListBoxItem
      {...props}
      {...stylex.props(
        styles.base,
        styles.hover,
        styles.focusVisible,
        styles.pressed,
        styles.selected,
        styles.selectedHover,
        styles.selectedPressed,
        styles.disabled,
        style,
      )}
    >
      {composeRenderProps(children, (children) =>
        typeof children === 'string' ? (
          <AriaText slot="label">{children}</AriaText>
        ) : (
          children
        ),
      )}
    </AriaListBoxItem>
  )
}
DropdownItem.displayName = '@urban-ui/listbox/DropdownItem'
