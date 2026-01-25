'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { MenuProps as AriaMenuProps } from 'react-aria-components'
import { Menu as AriaMenu } from 'react-aria-components'

import { MenuProvider, type MenuSize } from './menu-context'

const styles = stylex.create({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
  },
})

const sizeStyles = stylex.create({
  md: {
    gap: space['50'],
    padding: space['50'],
  },
  lg: {
    gap: space['100'],
    padding: space['100'],
  },
})

export interface MenuProps<T extends object>
  extends Omit<AriaMenuProps<T>, 'style' | 'className'> {
  /**
   * Size for all menu items (passed via context)
   * @default 'md'
   */
  size?: MenuSize

  /**
   * Additional styles to apply to the menu
   */
  style?: StyleXStyles
}

/**
 * Menu container for items, selection, and keyboard navigation.
 * Place inside a Popover within MenuTrigger or SubmenuTrigger.
 *
 * @example
 * ```tsx
 * <MenuTrigger>
 *   <Button>Actions</Button>
 *   <Menu>
 *     <MenuItem onAction={() => console.log('cut')}>Cut</MenuItem>
 *     <MenuItem onAction={() => console.log('copy')}>Copy</MenuItem>
 *   </Menu>
 * </MenuTrigger>
 * ```
 */
export function Menu<T extends object>({
  size = 'md',
  style,
  children,
  ...props
}: MenuProps<T>) {
  return (
    <MenuProvider size={size}>
      <AriaMenu
        {...props}
        {...stylex.props(styles.menu, sizeStyles[size], style)}
      >
        {children}
      </AriaMenu>
    </MenuProvider>
  )
}
Menu.displayName = '@urban-ui/menu'
