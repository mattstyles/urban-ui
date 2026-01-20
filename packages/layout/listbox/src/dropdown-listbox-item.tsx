'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import { ListBoxItem as AriaListBoxItem } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: space[100],
    paddingInline: space[150],
    borderRadius: radii.md,
    cursor: 'pointer',
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
  },
  hover: {
    backgroundColor: tone.surfaceMuted,
  },
  focus: {
    backgroundColor: tone.surfaceMuted,
    outlineColor: focusVars.outlineColor,
    outlineOffset: focusVars.outlineOffset,
    outlineStyle: focusVars.outlineStyle,
    outlineWidth: focusVars.outlineSize,
  },
  selected: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
  },
  disabled: {
    backgroundColor: disabled.background,
    color: disabled.fg,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
})

export interface DropdownListBoxItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * DropdownListBoxItem component for use within DropdownListBox.
 * Provides styled items with hover, focus, selected, and disabled states.
 */
export function DropdownListBoxItem<T extends object>({
  children,
  style,
  ...props
}: DropdownListBoxItemProps<T>) {
  return (
    <AriaListBoxItem
      {...props}
      className={({ isFocused, isHovered, isSelected, isDisabled }) =>
        stylex.props(
          styles.base,
          isHovered && !isSelected && !isDisabled && styles.hover,
          isFocused && !isSelected && !isDisabled && styles.focus,
          isSelected && !isDisabled && styles.selected,
          isDisabled && styles.disabled,
          style,
        ).className ?? ''
      }
      style={({ isFocused, isHovered, isSelected, isDisabled }) =>
        stylex.props(
          styles.base,
          isHovered && !isSelected && !isDisabled && styles.hover,
          isFocused && !isSelected && !isDisabled && styles.focus,
          isSelected && !isDisabled && styles.selected,
          isDisabled && styles.disabled,
          style,
        ).style
      }
    >
      {children}
    </AriaListBoxItem>
  )
}
DropdownListBoxItem.displayName = '@urban-ui/listbox/DropdownListBoxItem'
