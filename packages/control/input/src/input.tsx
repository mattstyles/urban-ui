'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'
import type {Slot} from '@urban-ui/slot'

import {forwardRef, useRef, useMemo, useCallback} from 'react'
import {atoms} from '@urban-ui/theme/atoms'
import {useTextField} from '@react-aria/textfield'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import cx from 'clsx'
import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'
import {base, container, sizeBase, postfix} from './input.css.ts'
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

const sizeVariants = cva([sizeBase], {
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
  onClear?: (options?: {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    value?: string
  }) => void
  Postfix?: React.ReactNode
}

type ElementType = HTMLInputElement
export const Input = forwardRef<ElementType, InputProps>(
  (
    {
      className,
      size,
      background,
      muted,
      tone,
      Postfix: PostfixEl,
      clear = true,
      onClear,
      ...props
    },
    passRef,
  ) => {
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

    const PostEl = useMemo(() => {
      if (props.isDisabled) {
        return null
      }

      if (PostfixEl != null) {
        return PostfixEl
      }

      return clear === false ? null : (
        <Postfix
          size={size}
          onClear={onClear}
          inputRef={ref}
          value={props.value}
          onChange={props.onChange}
        />
      )
    }, [
      PostfixEl,
      onClear,
      clear,
      size,
      ref,
      props.value,
      props.onChange,
      props.isDisabled,
    ])

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
        {/* <Flex
          alignment='center'
          justify='center'
          gap='xs'
          className={cx(atoms({p: 'xs'}), sizeVariants({size}))}>
          <Button icon radii='circular' size='fill'>
            S
          </Button>
        </Flex> */}
        {PostEl}
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

interface PostfixProps
  extends Pick<VariantProps<typeof inputVariants>, 'size'>,
    Pick<InputProps, 'onClear'>,
    Pick<AriaTextFieldProps, 'value' | 'onChange'> {
  inputRef: React.MutableRefObject<HTMLInputElement>
}
function Postfix({size, onClear, value, onChange, inputRef}: PostfixProps) {
  const onClearPress = useCallback(() => {
    if (onChange != null) {
      onChange('')
    }

    if (onClear != null) {
      onClear({
        inputRef,
        value,
      })
      return
    }

    inputRef.current.value = ''
  }, [onClear, value, onChange, inputRef])

  const clearAvailable = useMemo(() => {
    return value != null ? value.length > 0 : true
  }, [value])

  return (
    <Flex
      alignment='center'
      justify='center'
      gap='xs'
      className={cx(atoms({p: 'xs'}), sizeVariants({size}))}>
      <Flex
        className={atoms({
          height: 'fill',
          opacity: clearAvailable ? '1' : '0',
          transition: 'opacity',
        })}>
        <Button
          icon
          radii='circular'
          size='fill'
          variant='ghost'
          onPress={onClearPress}
          className={atoms({
            // visibility: clearAvailable ? 'visible' : 'hidden',
            // opacity: clearAvailable ? '1' : '0',
            pointerEvents: clearAvailable ? 'auto' : 'none',
            // transition: 'opacity',
            // opacity: '1',
          })}>
          X
        </Button>
      </Flex>
    </Flex>
  )
}
