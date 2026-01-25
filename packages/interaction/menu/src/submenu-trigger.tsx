'use client'

import type { SubmenuTriggerProps as AriaSubmenuTriggerProps } from 'react-aria-components'
import { SubmenuTrigger as AriaSubmenuTrigger } from 'react-aria-components'

export interface SubmenuTriggerProps extends AriaSubmenuTriggerProps {}

/**
 * Wraps a MenuItem and Popover to create a nested submenu.
 *
 * @example
 * ```tsx
 * <SubmenuTrigger>
 *   <MenuItem>Share</MenuItem>
 *   <Popover>
 *     <Menu>
 *       <MenuItem>Email</MenuItem>
 *       <MenuItem>Message</MenuItem>
 *     </Menu>
 *   </Popover>
 * </SubmenuTrigger>
 * ```
 */
export function SubmenuTrigger({ children, ...props }: SubmenuTriggerProps) {
  return <AriaSubmenuTrigger {...props}>{children}</AriaSubmenuTrigger>
}
SubmenuTrigger.displayName = '@urban-ui/submenu-trigger'
