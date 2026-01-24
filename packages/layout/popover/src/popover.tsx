'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'
import type { PopoverProps as AriaPopoverProps } from 'react-aria-components'
import { Popover as AriaPopover } from 'react-aria-components'

import { OverlayArrow } from './overlay-arrow'

const styles = stylex.create({
  base: {
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

    /**
     * Complex selectors to handle the arrow positioning based on placement.
     */
    ':is([data-placement="top"])': {
      '--origin': 'translateY(8px)',

      ':has([data-overlay-arrow])': {
        marginBottom: '6px',
      },
    },
    ':is([data-placement="bottom"])': {
      '--origin': 'translateY(-8px)',

      ':has([data-overlay-arrow])': {
        marginTop: '6px',
      },
    },
    ':is([data-placement="right"])': {
      '--origin': 'translateX(8px)',

      ':has([data-overlay-arrow])': {
        marginLeft: '6px',
      },
    },
    ':is([data-placement="left"])': {
      '--origin': 'translateX(-8px)',

      ':has([data-overlay-arrow])': {
        marginRight: '6px',
      },
    },
  },
})

const widthStyles = stylex.create({
  // Width matches trigger exactly
  trigger: {
    minWidth: 'var(--trigger-width)',
    maxWidth: 'var(--trigger-width)',
  },
  // Min width matches trigger, can grow wider
  'trigger-min': {
    minWidth: 'var(--trigger-width)',
  },
  // Max width matches trigger, can be narrower
  'trigger-max': {
    maxWidth: 'var(--trigger-width)',
  },
  // No width constraints (default)
  content: {},
})

// Triggers that should not show arrows (dropdown-style menus)
const noArrowTriggers = ['MenuTrigger', 'SubmenuTrigger']

export type PopoverWidth = 'trigger' | 'trigger-min' | 'trigger-max' | 'content'

export interface PopoverProps extends Omit<AriaPopoverProps, 'style'> {
  /**
   * How the popover width relates to the trigger width.
   * - `trigger`: Both min and max width match trigger
   * - `trigger-min`: Min width matches trigger, can grow wider
   * - `trigger-max`: Max width matches trigger, can be narrower
   * - `content`: No width constraints (default)
   * @default 'content'
   */
  width?: PopoverWidth

  /**
   * Whether to show the arrow indicator pointing to the trigger.
   * Automatically hidden for MenuTrigger and SubmenuTrigger.
   * @default false
   */
  showArrow?: boolean

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Additional styles to apply to the SVG arrow
   */
  arrowStyle?: StyleXStyles
}

/**
 * Popover component for positioning overlay content relative to a trigger.
 * Used as a foundation for tooltips, dropdowns, selects, and other overlay components.
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open</Button>
 *   <Popover showArrow>
 *     <Dialog>Content here</Dialog>
 *   </Popover>
 * </DialogTrigger>
 * ```
 */
export function Popover({
  children,
  style,
  arrowStyle,
  placement = 'bottom',
  width = 'content',
  showArrow = false,
  trigger,
  ...props
}: PopoverProps) {
  return (
    <AriaPopover
      placement={placement}
      trigger={trigger}
      {...props}
      {...stylex.props(styles.base, widthStyles[width], style)}
    >
      {(renderProps) => {
        // Determine if arrow should be shown based on trigger type
        const shouldShowArrow =
          showArrow && !noArrowTriggers.includes(trigger ?? '')

        return (
          <>
            {shouldShowArrow && <OverlayArrow svgStyle={arrowStyle} />}
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )
      }}
    </AriaPopover>
  )
}
Popover.displayName = '@urban-ui/popover'
