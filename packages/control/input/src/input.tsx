'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'
import type {Slot} from '@urban-ui/slot'

import {forwardRef, useRef, useMemo} from 'react'
import {atoms} from '@urban-ui/theme/atoms'
import {useTextField} from '@react-aria/textfield'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import cx from 'clsx'
import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'
import {base, container, postfix} from './input.css.ts'
import {sizes, colors, critical} from './variants.css.ts'

const containerVariants = cva([container], {
  variants: {
    background: {
      app: {},
      surface: {},
    },
    muted: {true: null, false: null},
    tone: {
      primary: atoms({tone: 'primary'}),
      neutral: atoms({tone: 'neutral'}),
      critical: [atoms({tone: 'critical'}), critical],
      positive: '',
      caution: '',
    },
  },
  compoundVariants: [
    {
      background: 'app',
      muted: true,
      className: colors.app.muted,
    },
    {
      background: 'app',
      muted: false,
      className: colors.app.base,
    },
    {
      background: 'surface',
      muted: true,
      className: colors.surface.muted,
    },
    {
      background: 'surface',
      muted: false,
      className: colors.surface.base,
    },
  ],
  defaultVariants: {
    background: 'app',
    muted: true,
  },
})

const inputVariants = cva([base], {
  variants: {
    size: {
      sm: sizes.small,
      md: sizes.standard,
      lg: sizes.large,
    },
  },
})

export interface InputProps
  extends Omit<AriaTextFieldProps, 'children'>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof containerVariants> {
  className?: string
  slot?: Extract<Slot, 'field'>
  clear?: boolean
  onClear?: () => void
}

type ElementType = HTMLInputElement
export const Input = forwardRef<ElementType, InputProps>(
  ({className, size, background, muted, tone, ...props}, passRef) => {
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
      <Flex
        className={cx(containerVariants({background, muted, tone}), container)}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}
        data-disabled={props.isDisabled}>
        <input
          className={inputVariants({size, className})}
          {...mergeProps(inputProps, hoverProps, focusProps)}
          ref={ref}
          data-hovered={isHovered}
          data-focused={isFocused}
          data-focus-visible={isFocusVisible}
        />
        <Flex alignment='center' justify='center' className={atoms({p: 'xs'})}>
          <Flex alignment='center' justify='center' className={postfix}>
            <div>A</div>
          </Flex>
          {/* <Button icon radii='circular' size='fit'>
            S
          </Button> */}
        </Flex>
      </Flex>
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
        className={cx(
          inputVariants({size, className}),
          containerVariants({background}),
        )}
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
