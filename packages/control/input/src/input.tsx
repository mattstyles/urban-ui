'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'
import type {Slot} from '@urban-ui/slot'

import {forwardRef, useState, useRef, useMemo, useCallback} from 'react'
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

export interface ClearProps {
  clear?: boolean
  onClear?: (options: {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    value?: string
  }) => void
}

export interface PasswordVisibilityProps {
  passwordToggle?: boolean
  onPasswordToggle?: (options?: {
    inputRef?: React.MutableRefObject<HTMLInputElement>
  }) => void
}

export interface InputProps
  extends Omit<AriaTextFieldProps, 'children'>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof containerVariants>,
    ClearProps,
    PasswordVisibilityProps {
  className?: string
  slot?: Extract<Slot, 'field'>
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
      passwordToggle = true,
      onPasswordToggle,
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

    const PostEl = usePostfix({
      size,
      Postfix: PostfixEl,
      clear,
      onClear,
      passwordToggle,
      onPasswordToggle,
      inputRef: ref,
      ...props,
    })

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

function usePostfix({
  size,
  Postfix,
  clear,
  onClear,
  passwordToggle,
  onPasswordToggle,
  value,
  onChange,
  isDisabled,
  type,
  inputRef,
}: InputProps & {
  inputRef: React.MutableRefObject<HTMLInputElement>
}) {
  const Controls = useMemo(() => {
    if (isDisabled === true || Postfix != null) {
      return null
    }

    const controls = []

    if (clear != null) {
      controls.push(
        <ClearControl
          key='clear'
          {...{clear, onClear, value, onChange, inputRef}}
        />,
      )
    }

    if (passwordToggle != null && type === 'password') {
      controls.push(
        <PasswordControl
          key='password'
          {...{passwordToggle, onPasswordToggle, inputRef}}
        />,
      )
    }

    return controls.length > 0 ? <>{controls}</> : null
  }, [
    isDisabled,
    Postfix,
    clear,
    onClear,
    passwordToggle,
    onPasswordToggle,
    inputRef,
    type,
    value,
    onChange,
  ])

  if (Controls == null) {
    return Postfix != null ? Postfix : null
  }

  return <ControlContainer size={size}>{Controls}</ControlContainer>
}

interface ControlContainerProps
  extends Pick<VariantProps<typeof inputVariants>, 'size'>,
    React.PropsWithChildren {}
function ControlContainer({children, size}: ControlContainerProps) {
  return (
    <Flex
      alignment='center'
      justify='center'
      gap='xs'
      className={cx(atoms({p: 'xs'}), sizeVariants({size}))}>
      {children}
    </Flex>
  )
}

function ClearControl({
  onClear,
  value,
  onChange,
  inputRef,
}: Pick<InputProps, 'clear' | 'onClear' | 'value' | 'onChange'> & {
  inputRef: React.MutableRefObject<HTMLInputElement>
}) {
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
          pointerEvents: clearAvailable ? 'auto' : 'none',
        })}>
        X
      </Button>
    </Flex>
  )
}

function PasswordControl({
  onPasswordToggle,
  inputRef,
}: Pick<InputProps, 'passwordToggle' | 'onPasswordToggle'> & {
  inputRef: React.MutableRefObject<HTMLInputElement>
}) {
  const [isVisible, setIsVisible] = useState(false)
  const onToggle = useCallback(() => {
    if (isVisible) {
      setIsVisible(false)
      inputRef.current.type = 'password'

      if (onPasswordToggle != null) {
        onPasswordToggle({
          inputRef,
        })
      }

      return
    }

    setIsVisible(true)
    inputRef.current.type = 'text'
    if (onPasswordToggle != null) {
      onPasswordToggle({
        inputRef,
      })
    }
  }, [isVisible, setIsVisible, inputRef, onPasswordToggle])

  return (
    <Flex
      className={atoms({
        height: 'fill',
      })}>
      <Button
        icon
        radii='circular'
        size='fill'
        variant='ghost'
        onPress={onToggle}>
        V
      </Button>
    </Flex>
  )
}
