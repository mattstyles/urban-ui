'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import type { OverlayArrowProps as AriaOverlayArrowProps } from 'react-aria-components'
import { OverlayArrow as AriaOverlayArrow } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'block',
  },
  svg: {
    maxWidth: 'unset',
    display: 'block',
    fill: tone.surface,
    stroke: tone.border,
    strokeWidth: 1,
  },
})

const rotations = stylex.create({
  top: {
    transform: 'rotate(0deg)',
  },
  bottom: {
    transform: 'rotate(180deg)',
  },
  left: {
    transform: 'rotate(-90deg)',
  },
  right: {
    transform: 'rotate(90deg)',
  },
  center: {
    transform: 'rotate(0deg)',
  },
})

export interface OverlayArrowProps
  extends Omit<AriaOverlayArrowProps, 'style'> {
  /**
   * Width of the arrow in pixels
   * @default 12
   */
  width?: number

  /**
   * Height of the arrow in pixels
   * @default 12
   */
  height?: number

  /**
   * Additional styles to apply to the container
   */
  style?: StyleXStyles

  /**
   * Additional styles to apply to the SVG
   */
  svgStyle?: StyleXStyles
}

/**
 * Internal arrow indicator for Popover components.
 * Renders an SVG arrow that points to the trigger element.
 */
export function OverlayArrow({
  width = 12,
  height = 12,
  style,
  svgStyle,
  ...props
}: OverlayArrowProps) {
  return (
    <AriaOverlayArrow {...props} {...stylex.props([styles.base, style])}>
      {({ placement }) => {
        return (
          <svg
            aria-hidden="true"
            width={width}
            height={height}
            viewBox="0 0 12 12"
            {...stylex.props([
              styles.svg,
              placement && rotations[placement],
              svgStyle,
            ])}
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        )
      }}
    </AriaOverlayArrow>
  )
}
