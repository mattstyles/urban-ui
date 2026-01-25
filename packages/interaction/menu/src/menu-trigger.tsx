'use client'

import type { MenuTriggerProps as AriaMenuTriggerProps } from 'react-aria-components'
import { MenuTrigger as AriaMenuTrigger } from 'react-aria-components'

export interface MenuTriggerProps extends AriaMenuTriggerProps {}

/**
 * Manages the open/close state of the menu and connects the trigger element to the popover.
 *
 * @example
 * ```tsx
 * <MenuTrigger>
 *   <Button>Actions</Button>
 *   <Popover>
 *     <Menu>
 *       <MenuItem>Cut</MenuItem>
 *       <MenuItem>Copy</MenuItem>
 *     </Menu>
 *   </Popover>
 * </MenuTrigger>
 * ```
 */
export function MenuTrigger({ children, ...props }: MenuTriggerProps) {
  return <AriaMenuTrigger {...props}>{children}</AriaMenuTrigger>
}
MenuTrigger.displayName = '@urban-ui/menu-trigger'
