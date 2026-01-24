'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { Popover } from '@urban-ui/popover'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, critical, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'
import { ChevronDown } from 'lucide-react'
import type { SelectProps as AriaSelectProps } from 'react-aria-components'
import {
  Button as AriaButton,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components'

import { SelectListBox } from './select-listbox'
import { SelectSizeContext, type SelectSize } from './select-context'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[50],
    width: '100%',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[100],
    width: '100%',
    backgroundColor: base.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.md,
    outline: 'none',
    transition: 'border-color 0.15s, background-color 0.15s',
    color: tone.fgHi,
    ':is([data-hovered])': {
      borderColor: tone.fgLo,
    },
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
    },
    ':is([data-pressed])': {
      backgroundColor: tone.component,
    },
    ':is([data-disabled])': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ':is([data-invalid])': {
      borderColor: critical.border,
    },
  },
  selectValue: {
    flex: 1,
    textAlign: 'start',
    ':is([data-placeholder])': {
      color: tone.fgLo,
    },
  },
  popover: {
    minWidth: 'var(--trigger-width)',
  },
})

const sizeStyles = stylex.create({
  md: {
    minHeight: control.md,
    paddingBlock: space[50],
    paddingInline: space[150],
    fontSize: fontSizes.sm,
  },
  lg: {
    minHeight: control.lg,
    paddingBlock: space[100],
    paddingInline: space[200],
    fontSize: fontSizes.md,
  },
})

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'style' | 'className' | 'children'> {
  /**
   * The SelectItem children
   */
  children: React.ReactNode

  /**
   * Size variant affecting trigger and item heights
   * @default 'md'
   */
  size?: SelectSize

  /**
   * Additional styles to apply to the root element
   */
  style?: StyleXStyles

  /**
   * Additional styles to apply to the trigger button
   */
  triggerStyle?: StyleXStyles

  /**
   * Optional items to use for the Collection API
   */
  items?: Iterable<T>
}

/**
 * Select component for selecting a single value from a list of options.
 * Composes @urban-ui/popover internally.
 *
 * @example
 * ```tsx
 * <Select placeholder="Select an animal">
 *   <SelectItem>Aardvark</SelectItem>
 *   <SelectItem>Cat</SelectItem>
 *   <SelectItem>Dog</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object>({
  children,
  size = 'md',
  style,
  triggerStyle,
  items,
  ...props
}: SelectProps<T>) {
  const iconSize = size === 'lg' ? 'md' : 'sm'

  return (
    <SelectSizeContext value={size}>
      <AriaSelect {...props} {...stylex.props(styles.base, style)}>
        <AriaButton
          {...stylex.props(styles.trigger, sizeStyles[size], triggerStyle)}
        >
          <SelectValue {...stylex.props(styles.selectValue)} />
          <Icon size={iconSize} color="lo">
            <ChevronDown />
          </Icon>
        </AriaButton>
        <Popover style={styles.popover}>
          <SelectListBox items={items}>{children}</SelectListBox>
        </Popover>
      </AriaSelect>
    </SelectSizeContext>
  )
}
Select.displayName = '@urban-ui/select'
