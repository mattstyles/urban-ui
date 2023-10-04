'use client'

import type {VariantProps} from 'cva'
import type {AriaButtonProps} from '@react-aria/button'

import * as React from 'react'
import {useRef, forwardRef, useMemo} from 'react'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {useButton} from '@react-aria/button'
import {atoms} from '@urban-ui/theme/atoms'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import cx from 'clsx'
import {Slot} from '@radix-ui/react-slot'
import {base, components, shaping} from './button.css.ts'
import {
  solid,
  ghost,
  transparent,
  outline,
  foreground,
  sizes,
  effects,
  radii,
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
      primary: atoms({tone: 'primary'}),
      neutral: atoms({tone: 'neutral'}),
      critical: atoms({tone: 'critical'}),
      positive: '',
      caution: '',
    },
    size: {
      sm: sizes.small,
      md: sizes.standard,
      lg: sizes.large,
      fill: sizes.fill,
    },
    effect: {
      scale: effects.scale,
    },
    icon: {
      true: shaping.icon,
      false: shaping.normal,
    },
    fill: {
      true: sizes.fill,
    },
    radii: {
      sm: radii.sm,
      md: radii.md,
      lg: radii.lg,
      circular: radii.circular,
    },
  },
  defaultVariants: {
    radii: 'md',
    icon: false,
  },
})

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children'>,
    VariantProps<typeof variants>,
    React.PropsWithChildren {
  className?: string
  asChild?: boolean
  tabIndex?: number
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      effect = 'scale',
      variant,
      size,
      tone,
      radii,
      icon = false,
      fill = false,
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

    const Components: {Container: Slot | 'button'; passProps: PassPropsType} =
      useMemo(() => {
        if (asChild !== true) {
          return {
            Container: 'button',
            passProps: {children},
          }
        }

        return slot(children)
      }, [asChild, children])

    const Content = useMemo(() => {
      const content = Components.passProps.children

      if (typeof content === 'string') {
        return <Text>{content}</Text>
      }

      return content
    }, [Components])

    return (
      <Components.Container
        className={variants({
          variant,
          size,
          tone,
          effect,
          radii,
          icon,
          fill,
          className,
        })}
        {...mergeProps(
          buttonProps,
          hoverProps,
          focusProps,
          Components.passProps,
        )}
        ref={ref}
        tabIndex={props.tabIndex}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}>
        <span className={components.hover} />
        <span className={components.press} />
        <span className={components.border} />
        <span
          className={cx(
            icon ? components.foregroundIcon : components.foreground,
          )}>
          {Content}
        </span>
      </Components.Container>
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
  Container: Slot
  passProps: PassPropsType
} {
  const childArray = React.Children.toArray(children)
  const head = childArray[0]

  if (!React.isValidElement(head)) {
    throw new Error('Invalid component passed to Slot asChild')
  }

  return {
    // @ts-expect-error default exists for the type of component we should pass
    Container: head.type.default,
    passProps: head.props,
  }
}
