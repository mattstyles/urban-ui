'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import { Popover } from '@urban-ui/popover'
import { Children, type ReactElement, type ReactNode } from 'react'
import type { SubmenuTriggerProps as AriaSubmenuTriggerProps } from 'react-aria-components'
import { SubmenuTrigger as AriaSubmenuTrigger } from 'react-aria-components'

export interface SubmenuTriggerProps
  extends Omit<AriaSubmenuTriggerProps, 'children'> {
  /**
   * The trigger MenuItem and Menu content
   */
  children: ReactNode

  /**
   * Additional styles to apply to the popover
   */
  popoverStyle?: StyleXStyles
}

/**
 * Wraps a MenuItem and Menu to create a nested submenu.
 * Automatically wraps the Menu child in a styled Popover positioned to the side.
 *
 * @example
 * ```tsx
 * <SubmenuTrigger>
 *   <MenuItem>Share</MenuItem>
 *   <Menu>
 *     <MenuItem>Email</MenuItem>
 *     <MenuItem>Message</MenuItem>
 *   </Menu>
 * </SubmenuTrigger>
 * ```
 */
export function SubmenuTrigger({
  children,
  popoverStyle,
  ...props
}: SubmenuTriggerProps) {
  const childArray = Children.toArray(children)
  const triggerItem = childArray[0] as ReactElement
  const menu = childArray[1]

  return (
    <AriaSubmenuTrigger {...props}>
      {triggerItem}
      <Popover placement="end top" style={popoverStyle}>
        {menu}
      </Popover>
    </AriaSubmenuTrigger>
  )
}
SubmenuTrigger.displayName = '@urban-ui/submenu-trigger'
