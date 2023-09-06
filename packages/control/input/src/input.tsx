'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'
import type {Slot} from '@urban-ui/utils'

import {forwardRef, useRef, useMemo} from 'react'
import {tones} from '@urban-ui/theme'
import {useTextField} from '@react-aria/textfield'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import {base} from './input.css.ts'
import {sizes, colors} from './variants.css.ts'

const variants = cva([base], {
  variants: {
    background: {
      app: colors.app,
      surface: colors.surface,
      emphasis: colors.emphasis,
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
  },
  defaultVariants: {
    background: 'app',
  },
})

export interface InputProps
  extends Omit<AriaTextFieldProps, 'children'>,
    VariantProps<typeof variants> {
  className?: string
  slot?: Extract<Slot, 'field'>
}

type ElementType = HTMLInputElement
export const Input = forwardRef<ElementType, InputProps>(
  ({className, size, background, ...props}, passRef) => {
    const innerRef = useRef<ElementType>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )

    const {inputProps} = useTextField(props, ref)
    const {hoverProps, isHovered} = useHover(props)
    const {focusProps, isFocusVisible, isFocused} = useFocusRing(
      mergeProps(props, {
        isTextInput: true,
      }),
    )

    return (
      <input
        className={variants({size, background, className})}
        {...mergeProps(inputProps, hoverProps, focusProps)}
        ref={ref}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}
      />
    )
  },
)
Input.displayName = 'Input'

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({className, size, background, ...props}, passRef) => {
    const innerRef = useRef<HTMLTextAreaElement>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )

    const {inputProps} = useTextField(
      {...props, inputElementType: 'textarea'},
      ref,
    )
    const {hoverProps, isHovered} = useHover(props)
    const {focusProps, isFocusVisible, isFocused} = useFocusRing(
      mergeProps(props, {
        isTextInput: true,
      }),
    )

    return (
      <textarea
        className={variants({size, background, className})}
        {...mergeProps(inputProps, hoverProps, focusProps)}
        ref={ref}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}
      />
    )
  },
)
TextArea.displayName = 'TextArea'
