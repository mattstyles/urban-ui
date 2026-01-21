'use client'

import type { ReactNode } from 'react'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'
import type {
  PopoverProps as AriaPopoverProps,
  PopoverRenderProps,
} from 'react-aria-components'
import {
  Popover as AriaPopover,
  OverlayArrow as AriaOverlayArrow,
} from 'react-aria-components'

const styles = stylex.create({
  base: {
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
    boxShadow: shadows.md,
    outline: 'none',
  },
})

const placements = stylex.create({
  top: {
    marginBottom: 4,
  },
  bottom: {
    marginTop: 4,
  },
  left: {
    marginRight: 4,
  },
  right: {
    marginLeft: 4,
  },
})

const arrowStyles = stylex.create({
  base: {
    display: 'block',
  },
  svg: {
    display: 'block',
    fill: tone.surface,
    stroke: tone.border,
    strokeWidth: 1,
  },
})

const arrowRotations = stylex.create({
  top: {
    transform: 'rotate(180deg)',
  },
  bottom: {
    transform: 'rotate(0deg)',
  },
  left: {
    transform: 'rotate(90deg)',
  },
  right: {
    transform: 'rotate(-90deg)',
  },
})

// Triggers that should not show arrows (dropdown-style menus)
const noArrowTriggers = ['MenuTrigger', 'SubmenuTrigger']

export interface PopoverProps extends Omit<AriaPopoverProps, 'style' | 'children'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Whether to show the arrow indicator pointing to the trigger.
   * Automatically hidden for MenuTrigger and SubmenuTrigger.
   * @default false
   */
  showArrow?: boolean

  /**
   * Width of the arrow in pixels
   * @default 12
   */
  arrowWidth?: number

  /**
   * Height of the arrow in pixels
   * @default 12
   */
  arrowHeight?: number

  /**
   * Content to render inside the popover.
   * Can be a render function receiving PopoverRenderProps.
   */
  children?: ReactNode | ((renderProps: PopoverRenderProps) => ReactNode)
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
  placement = 'bottom',
  showArrow = false,
  arrowWidth = 12,
  arrowHeight = 12,
  trigger,
  ...props
}: PopoverProps) {
  // Extract base placement direction for margin styles
  const basePlacement = placement.split(' ')[0] as keyof typeof placements

  // Determine if arrow should be shown based on trigger type
  const shouldShowArrow = showArrow && !noArrowTriggers.includes(trigger ?? '')

  return (
    <AriaPopover
      placement={placement}
      trigger={trigger}
      {...props}
      {...stylex.props([
        styles.base,
        basePlacement in placements && placements[basePlacement],
        style,
      ])}
    >
      {(renderProps) => {
        // Get the actual placement (may differ from requested due to flipping)
        // Fall back to the requested placement if not yet resolved
        const resolvedPlacement = renderProps.placement ?? placement
        const actualPlacement = resolvedPlacement.split(' ')[0] as keyof typeof arrowRotations

        return (
          <>
            {shouldShowArrow && (
              <AriaOverlayArrow {...stylex.props(arrowStyles.base)}>
                <svg
                  width={arrowWidth}
                  height={arrowHeight}
                  viewBox="0 0 12 12"
                  {...stylex.props([
                    arrowStyles.svg,
                    arrowRotations[actualPlacement],
                  ])}
                >
                  <path d="M0 0 L6 6 L12 0" />
                </svg>
              </AriaOverlayArrow>
            )}
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )
      }}
    </AriaPopover>
  )
}
Popover.displayName = '@urban-ui/popover'
