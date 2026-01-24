'use client'

import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { accent, base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import { Check } from 'lucide-react'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'
import { useSelectSize } from './select-context'

const styles = stylex.create({
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: space[100],

    borderRadius: radii.md,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    transition: 'background 0.15s, color 0.15s',
    // Hover state - transparent in dialog/dropdown context
    ':is([data-hovered])': {
      backgroundColor: base.transparent,
    },
    // Focus visible state - keyboard navigation (primary indicator in dialogs)
    ':is([data-focus-visible])': {
      backgroundColor: accent.solidHover,
      color: accent.fgOnBlock,
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: tone.componentActive,
    },
    // Disabled state
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
  check: {
    marginInlineStart: 'auto',
    flexShrink: 0,
  },
})

const sizeStyles = stylex.create({
  md: {
    minHeight: control.md,
    paddingBlock: space[50],
    paddingInline: space[150],
  },
  lg: {
    minHeight: control.lg,
    paddingBlock: space[100],
    paddingInline: space[200],
  },
})

export type SelectItemProps<T extends object> = AriaListBoxItemProps<T>

export function SelectItem<T extends object>({
  children,
  style,
  ...props
}: SelectItemProps<T>) {
  const size = useSelectSize()
  const textSize = size === 'lg' ? 'md' : 'sm'
  const iconSize = size === 'lg' ? 'md' : 'sm'

  return (
    <AriaListBoxItem
      {...props}
      {...stylex.props(styles.item, sizeStyles[size])}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <Text slot="label" size={textSize}>
            {children}
          </Text>
          {isSelected && (
            <Icon size={iconSize} style={styles.check}>
              <Check />
            </Icon>
          )}
        </>
      ))}
    </AriaListBoxItem>
  )
}
