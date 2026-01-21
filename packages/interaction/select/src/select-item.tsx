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

/**
 * Visual states for SelectItem:
 *
 * - isHovered: Mouse is over the item
 * - isPressed: Item is being pressed (mouse down or touch)
 * - isSelected: Item is currently selected (shows checkmark)
 * - isFocusVisible: Item has visible focus indicator (keyboard navigation)
 * - isDisabled: Item is not interactive
 *
 * State priority (highest to lowest):
 * 1. isDisabled - overrides all other states
 * 2. isSelected - shows checkmark indicator
 * 3. isPressed/isActive - shows press feedback
 * 4. isFocusVisible - shows focus ring for keyboard navigation
 * 5. isHovered - shows hover highlight
 */
const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: space[100],
    paddingBlock: space[100],
    paddingInline: space[150],
    borderRadius: radii.md,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
    // Hover state
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state - keyboard navigation
    ':is([data-focus-visible], :focus-visible)': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
    // Pressed state
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
    // Selected state - subtle highlight
    ':is([data-selected])': {
      backgroundColor: accent.component,
      color: accent.fgHi,
    },
    // Selected + hover
    ':is([data-selected][data-hovered], [data-selected]:hover)': {
      backgroundColor: accent.componentHover,
    },
    // Selected + pressed
    ':is([data-selected][data-pressed], [data-selected]:active)': {
      backgroundColor: accent.componentActive,
    },
    // Disabled state
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
  content: {
    flex: 1,
  },
  checkmark: {
    width: 16,
    height: 16,
    flexShrink: 0,
    opacity: 0,
    color: accent.solid,
    transition: 'opacity 0.15s',
  },
  checkmarkVisible: {
    opacity: 1,
  },
})

export interface SelectItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Checkmark icon SVG component
 */
function CheckmarkIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      {...stylex.props(styles.checkmark, visible && styles.checkmarkVisible)}
    >
      <path
        d="M13.5 4.5L6 12L2.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * SelectItem component for use within SelectListBox.
 * Provides styled items with hover, focus-visible, pressed, selected, and disabled states.
 * Selected items display a checkmark indicator.
 */
export function SelectItem<T extends object>({
  children,
  style,
  ...props
}: SelectItemProps<T>) {
  return (
    <AriaListBoxItem {...props} {...stylex.props(styles.base, style)}>
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <CheckmarkIcon visible={isSelected ?? false} />
          <span {...stylex.props(styles.content)}>{children}</span>
        </>
      ))}
    </AriaListBoxItem>
  )
}
SelectItem.displayName = '@urban-ui/select/SelectItem'
