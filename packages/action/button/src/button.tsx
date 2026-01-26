'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  content,
  contentGap,
  shapes,
  sizes,
  styles,
  variants,
} from '@urban-ui/styles/button'
import { themes } from '@urban-ui/theme'
import { base } from '@urban-ui/theme/colors.stylex'
import { useMemo } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import {
  Button as AriaButton,
  composeRenderProps,
  ProgressBar,
} from 'react-aria-components'

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

const pendingStyles = stylex.create({
  pending: {
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
  },
  contentHidden: {
    // display: 'contents',
    opacity: 0,
  },
  spinnerContainer: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '1em',
    height: '1em',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: base.current,
    borderTopColor: base.transparent,
    borderRadius: '50%',
    animationName: stylex.keyframes({
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    }),
    animationDuration: '0.8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
})

export interface ButtonProps extends Omit<AriaButtonProps, 'style'> {
  /**
   * Visual variant
   * @default 'solid'
   */
  variant?: keyof typeof variants

  /**
   * Color tone
   * @default 'primary'
   */
  tone?: keyof typeof tones

  /**
   * Size
   * @default 'md'
   */
  size?: keyof typeof sizes

  /**
   * Shape
   * @default 'rounded'
   */
  shape?: keyof typeof shapes

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Whether the button is disabled (standard HTML attribute).
   * Alias for isDisabled.
   */
  disabled?: boolean
}

const sizeMap: Record<keyof typeof sizes, StyleXStyles> = {
  md: sizes.md,
  lg: sizes.lg,
  'md-equal': sizes['md-equal'],
  'lg-equal': sizes['lg-equal'],
}
const gapMap: Record<keyof typeof sizes, StyleXStyles> = {
  md: contentGap.md,
  lg: contentGap.lg,
  'md-equal': contentGap['md-equal'],
  'lg-equal': contentGap['lg-equal'],
}

/**
 * Button component built on react-aria-components.
 * Provides consistent styling with the Urban UI design system.
 */
export function Button({
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  shape = 'rounded',
  style,
  disabled,
  isDisabled,
  children,
  ...props
}: ButtonProps) {
  const [baseSize, gapSize] = useMemo(() => {
    return [sizeMap[size], gapMap[size]]
  }, [size])

  return (
    <AriaButton
      {...props}
      isDisabled={isDisabled ?? disabled}
      {...stylex.props(
        styles.base,
        baseSize,
        shapes[shape],
        variants[variant],
        tones[tone],
        styles.disabled,
        props.isPending && pendingStyles.pending,
        style,
      )}
    >
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          <span
            data-content=""
            {...stylex.props(
              content.base,
              gapSize,
              variant === 'clear' && contentGap.clear,
              isPending && content.hidden,
            )}
          >
            {children}
          </span>
          {isPending && (
            <ProgressBar aria-label="Loading" isIndeterminate>
              <span {...stylex.props(pendingStyles.spinnerContainer)}>
                <span {...stylex.props(pendingStyles.spinner)} />
              </span>
            </ProgressBar>
          )}
        </>
      ))}
    </AriaButton>
  )
}
Button.displayName = '@urban-ui/button'
