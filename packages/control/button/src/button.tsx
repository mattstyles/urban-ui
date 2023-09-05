'use client'

import type {VariantProps} from 'cva'
import type {AriaButtonProps} from '@react-aria/button'

import * as React from 'react'
import {useRef, forwardRef, useMemo} from 'react'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {useButton} from '@react-aria/button'
import {tones} from '@urban-ui/theme'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import {Slot} from '@radix-ui/react-slot'
import {base, components} from './button.css.ts'
import {
  solid,
  ghost,
  transparent,
  outline,
  foreground,
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
      foreground: foreground,
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
  asChild?: boolean
  children: React.ReactNode
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
      asChild,
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

    let Comp: Slot | 'button' = 'button'
    let passProps: {children?: React.ReactNode} = {}

    if (asChild === true) {
      const Slot = slot(children)
      if (Slot != null) {
        Comp = Slot.Comp
        passProps = Slot.passProps
      }
    }

    return (
      <Comp
        className={variants({variant, size, tone, effect, className})}
        {...mergeProps(buttonProps, hoverProps, focusProps, props, passProps)}
        ref={ref}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}>
        <span className={components.hover} />
        <span className={components.press} />
        <span className={components.border} />
        <span className={components.foreground}>
          <Text>{passProps?.children ?? children}</Text>
        </span>
      </Comp>
    )
  },
)
Button.displayName = 'Urban-Button'

type Slot = React.ForwardRefExoticComponent<
  React.PropsWithChildren & React.RefAttributes<HTMLElement>
>
type PassPropsType = {
  children?: React.ReactNode
}

function slot(children: React.ReactNode): {
  Comp: Slot
  passProps: PassPropsType
} | null {
  const childArray = React.Children.toArray(children)
  const head = childArray[0]

  if (!React.isValidElement(head)) {
    throw new Error('Invalid component passed to Slot asChild')
  }

  return {
    // @ts-expect-error default exists for the type of component we should pass
    Comp: head.type.default,
    passProps: head.props,
  }
}
