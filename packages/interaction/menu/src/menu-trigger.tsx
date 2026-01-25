'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import { Popover } from '@urban-ui/popover'
import { Children } from 'react'
import type { MenuTriggerProps as AriaMenuTriggerProps } from 'react-aria-components'
import { MenuTrigger as AriaMenuTrigger } from 'react-aria-components'

export interface MenuTriggerProps extends AriaMenuTriggerProps {
  /**
   * Additional styles to apply to the popover
   */
  popoverStyle?: StyleXStyles
}

/**
 * Manages the open/close state of the menu and connects the trigger element to the popover.
 * Automatically wraps the Menu child in a styled Popover.
 *
 * @example
 * ```tsx
 * <MenuTrigger>
 *   <Button>Actions</Button>
 *   <Menu>
 *     <MenuItem>Cut</MenuItem>
 *     <MenuItem>Copy</MenuItem>
 *   </Menu>
 * </MenuTrigger>
 * ```
 */
export function MenuTrigger({
  children,
  popoverStyle,
  ...props
}: MenuTriggerProps) {
  const childArray = Children.toArray(children)
  const trigger = childArray[0]
  const menu = childArray[1]

  return (
    <AriaMenuTrigger {...props}>
      {trigger}
      <Popover style={popoverStyle}>{menu}</Popover>
    </AriaMenuTrigger>
  )
}
MenuTrigger.displayName = '@urban-ui/menu-trigger'
