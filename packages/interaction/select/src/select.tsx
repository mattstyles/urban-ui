'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'
import type { SelectProps as AriaSelectProps } from 'react-aria-components'
import {
  Button,
  Label,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[50],
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[100],
    paddingBlock: space[100],
    paddingInline: space[150],
    minWidth: 200,
    backgroundColor: base.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.md,
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.15s, background-color 0.15s',
    color: tone.fgHi,
    ':is([data-hovered], :hover)': {
      borderColor: tone.fgLo,
    },
    ':is([data-focus-visible], :focus-visible)': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.component,
    },
    ':is([data-disabled])': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  selectValue: {
    flex: 1,
    textAlign: 'start',
  },
  placeholder: {
    color: tone.fgLo,
  },
  chevron: {
    width: 16,
    height: 16,
    flexShrink: 0,
    transition: 'transform 0.2s',
    color: tone.fgLo,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  popover: {
    backgroundColor: {
      default: base.white,
      '@media (prefers-color-scheme: dark)': tone.surfaceMuted,
    },
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
    boxShadow: shadows.md,
    outline: 'none',
    overflow: 'hidden',
    minWidth: 'var(--trigger-width)',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: space[50],
    outline: 'none',
    overflow: 'auto',
    maxHeight: 300,
  },
})

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'style' | 'className' | 'children'> {
  /**
   * Label text for the select field
   */
  label?: string

  /**
   * The SelectItem children
   */
  children: React.ReactNode

  /**
   * Additional styles to apply to the root element
   */
  style?: StyleXStyles

  /**
   * Additional styles to apply to the trigger button
   */
  triggerStyle?: StyleXStyles
}

/**
 * Chevron icon that rotates when the select is open
 */
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      {...stylex.props(styles.chevron, isOpen && styles.chevronOpen)}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Select component for selecting a single value from a list of options.
 * Provides a simple, opinionated API with built-in styling.
 *
 * @example
 * ```tsx
 * <Select label="Favorite Animal">
 *   <SelectItem>Aardvark</SelectItem>
 *   <SelectItem>Cat</SelectItem>
 *   <SelectItem>Dog</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object>({
  label,
  children,
  style,
  triggerStyle,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} {...stylex.props(styles.base, style)}>
      {({ isOpen }) => (
        <>
          {label && (
            <Text asChild size="sm" weight="medium">
              <Label>{label}</Label>
            </Text>
          )}
          <Button {...stylex.props(styles.trigger, triggerStyle)}>
            <SelectValue {...stylex.props(styles.selectValue)} />
            <ChevronIcon isOpen={isOpen} />
          </Button>
          <Popover {...stylex.props(styles.popover)}>
            <ListBox {...stylex.props(styles.listbox)}>{children}</ListBox>
          </Popover>
        </>
      )}
    </AriaSelect>
  )
}
Select.displayName = '@urban-ui/select'
