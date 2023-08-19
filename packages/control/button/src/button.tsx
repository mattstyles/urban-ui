'use client'

import type {VariantProps} from 'cva'
import type {AriaButtonProps} from '@react-aria/button'

import {useRef, forwardRef, useMemo} from 'react'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {useButton} from '@react-aria/button'
import {tones} from '@urban-ui/theme'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import {base, components} from './button.css.ts'
import {
  solid,
  ghost,
  transparent,
  outline,
  sizes,
  effects,
} from './variants.css.ts'

const variants = cva([base], {
  variants: {
    variant: {
      solid: solid,
      transparent: transparent,
      ghost: ghost,
      outline: outline,
    },
    tone: {
      primary: tones.primary,
      neutral: '',
      critical: '',
      positive: '',
      caution: '',
    },
    size: {
      sm: sizes.small,
      md: sizes.standard,
      lg: sizes.large,
    },
    effect: {
      scale: effects.scale,
    },
  },
})

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children'>,
    VariantProps<typeof variants>,
    React.PropsWithChildren {
  className?: string
  children: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      // variant = 'solid',
      // size = 'md',
      effect = 'scale',
      variant,
      size,
      tone,
      className,
      ...props
    },
    passRef,
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )

    const {buttonProps, isPressed} = useButton(props, ref)
    const {hoverProps, isHovered} = useHover(props)
    const {focusProps, isFocusVisible, isFocused} = useFocusRing(props)

    return (
      <button
        className={variants({variant, size, tone, effect, className})}
        {...mergeProps(buttonProps, hoverProps, focusProps, props)}
        ref={ref}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}>
        <span className={components.hover} />
        <span className={components.press} />
        <span className={components.border} />
        <span className={components.foreground}>
          <Text>{children}</Text>
        </span>
      </button>
    )
  },
)
Button.displayName = 'Urban-Button'
