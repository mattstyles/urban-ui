'use client'

import type {VariantProps} from 'cva'
import type {AriaButtonProps} from '@react-aria/button'

import {useRef, forwardRef, useMemo} from 'react'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {useButton} from '@react-aria/button'
import {cva} from 'cva'
import {base} from './button.css.ts'
import {solid, ghost, transparent, outline} from './variants.css.ts'
import {tones} from '@urban-ui/theme'

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
  },
})

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children'>,
    VariantProps<typeof variants>,
    React.PropsWithChildren {
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, variant = 'solid', tone, className, ...props}, passRef) => {
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
        className={variants({variant, tone, className})}
        {...mergeProps(buttonProps, hoverProps, focusProps, props)}
        ref={ref}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Urban-Button'
