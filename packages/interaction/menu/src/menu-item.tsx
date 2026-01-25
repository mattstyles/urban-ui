'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import {
  accent,
  base,
  critical,
  disabled,
  positive,
  tone,
} from '@urban-ui/theme/colors.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import { Check, ChevronRight } from 'lucide-react'
import type { MenuItemProps as AriaMenuItemProps } from 'react-aria-components'
import { MenuItem as AriaMenuItem, composeRenderProps } from 'react-aria-components'

import { useMenuContext } from './menu-context'

const styles = stylex.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: space['100'],
    borderRadius: radii.md,
    outline: 'none',
    transition: 'background 0.15s, color 0.15s',
    // Default state
    backgroundColor: base.transparent,
    color: tone.fgHi,
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: tone.componentActive,
    },
    // Selected state
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnBlock,
    },
    // Focused state - highlighted background for mouse and keyboard interaction
    ':is([data-focused])': {
      backgroundColor: tone.componentHover,
    },
    // Selected + Hovered
    ':is([data-selected][data-hovered])': {
      backgroundColor: accent.solidHover,
    },
    // Selected + Pressed
    ':is([data-selected][data-pressed])': {
      backgroundColor: accent.solidActive,
    },
    // Selected + Focused
    ':is([data-selected][data-focused])': {
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
})

const variantStyles = stylex.create({
  default: {},
  destructive: {
    color: critical.fgHi,
    ':is([data-focused])': {
      backgroundColor: critical.componentHover,
      color: critical.fgHi,
    },
    ':is([data-pressed])': {
      backgroundColor: critical.componentActive,
      color: critical.fgHi,
    },
  },
  success: {
    color: positive.fgHi,
    ':is([data-focused])': {
      backgroundColor: positive.componentHover,
      color: positive.fgHi,
    },
    ':is([data-pressed])': {
      backgroundColor: positive.componentActive,
      color: positive.fgHi,
    },
  },
})

const sizeStyles = stylex.create({
  md: {
    paddingInline: space['100'],
    paddingBlock: space['100'],
    minHeight: control.md,
  },
  lg: {
    paddingInline: space['100'],
    paddingBlock: space['150'],
    minHeight: control.lg,
  },
})

const checkStyles = stylex.create({
  check: {
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: space['100'],
    boxSizing: 'content-box',
  },
})

const chevronStyles = stylex.create({
  chevron: {
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: space['100'],
    boxSizing: 'content-box',
  },
})

const textStyles = stylex.create({
  text: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'clip',
    flex: 1,
  },
})

export type MenuItemVariant = 'default' | 'destructive' | 'success'

export interface MenuItemProps<T extends object>
  extends Omit<AriaMenuItemProps<T>, 'style' | 'className'> {
  /**
   * Visual variant for semantic meaning
   * @default 'default'
   */
  variant?: MenuItemVariant

  /**
   * Size variant affects padding and text size
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Individual menu item that can trigger an action or be selected.
 *
 * Automatically derives textValue from string children for accessibility.
 * For non-string children, provide textValue explicitly.
 *
 * @example
 * ```tsx
 * // Simple action
 * <MenuItem onAction={() => console.log('clicked')}>Edit</MenuItem>
 *
 * // With keyboard shortcut
 * <MenuItem textValue="Save">
 *   Save
 *   <Keyboard>⌘S</Keyboard>
 * </MenuItem>
 *
 * // Destructive action
 * <MenuItem variant="destructive">Delete</MenuItem>
 * ```
 */
export function MenuItem<T extends object>({
  variant = 'default',
  size: sizeProp,
  style,
  children,
  textValue,
  ...props
}: MenuItemProps<T>) {
  const context = useMenuContext()
  const size = sizeProp ?? context?.size ?? 'md'
  const textSize = size === 'md' ? 'sm' : 'md'

  // Auto-derive textValue from string children if not provided
  const derivedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <AriaMenuItem
      {...props}
      textValue={derivedTextValue}
      {...stylex.props(
        styles.item,
        variantStyles[variant],
        sizeStyles[size],
        style
      )}
    >
      {composeRenderProps(children, (children, { isSelected, hasSubmenu }) => (
        <>
          {typeof children === 'string' ? (
            <Text slot="label" size={textSize} color="current" style={textStyles.text}>
              {children}
            </Text>
          ) : (
            children
          )}
          {isSelected && (
            <Icon size="md" style={checkStyles.check} color="current">
              <Check />
            </Icon>
          )}
          {hasSubmenu && (
            <Icon size="md" style={chevronStyles.chevron} color="current">
              <ChevronRight />
            </Icon>
          )}
        </>
      ))}
    </AriaMenuItem>
  )
}
MenuItem.displayName = '@urban-ui/menu-item'
