'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import { Keyboard as AriaKeyboard } from 'react-aria-components'

const styles = stylex.create({
  keyboard: {
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: space['200'],
    boxSizing: 'content-box',
  },
})

export interface KeyboardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Displays a keyboard shortcut aligned to the right of a menu item.
 *
 * @example
 * ```tsx
 * <MenuItem textValue="Save">
 *   Save
 *   <Keyboard>⌘S</Keyboard>
 * </MenuItem>
 * ```
 */
export function Keyboard({ style, children, ...props }: KeyboardProps) {
  return (
    <AriaKeyboard {...props} {...stylex.props(styles.keyboard, style)}>
      {typeof children === 'string' ? (
        <Text size="sm" color="lo">
          {children}
        </Text>
      ) : (
        children
      )}
    </AriaKeyboard>
  )
}
Keyboard.displayName = '@urban-ui/keyboard'
