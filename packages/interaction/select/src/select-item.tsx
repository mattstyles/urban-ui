'use client'

import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, disabled, info, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { edge } from '@urban-ui/theme/layout.stylex'
import { Check } from 'lucide-react'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

const styles = stylex.create({
  item: {
    paddingInline: edge.sm,
    paddingBlock: edge.sm,

    display: 'flex',
    alignItems: 'center',

    borderRadius: radii.lg,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    transition: 'background 0.15s, color 0.15s',
    // Hover state
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state - keyboard navigation
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: info.solid,
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
    transition: 'opacity 0.15s',
    opacity: {
      default: 0,
      [stylex.when.ancestor(':is([data-selected])')]: '1',
    },
  },
})

export type SelectItemProps<T extends object> = AriaListBoxItemProps<T>

export function SelectItem<T extends object>({
  children,
  style,
  ...props
}: SelectItemProps<T>) {
  return (
    <AriaListBoxItem
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.item)}
    >
      {composeRenderProps(children, (children) => {
        return (
          <>
            <Text slot="label" size="md">
              {children}
            </Text>
            <Icon size="md" style={styles.check}>
              <Check />
            </Icon>
          </>
        )
      })}
    </AriaListBoxItem>
  )
}
