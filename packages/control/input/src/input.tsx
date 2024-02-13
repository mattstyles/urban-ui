'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'
import type {Slot} from '@urban-ui/slot'

import {
  forwardRef,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useReducer,
} from 'react'
import {atoms} from '@urban-ui/theme/atoms'
import {useTextField} from '@react-aria/textfield'
import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import cx from 'clsx'
import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'
import {CloseIcon, HideEyeIcon, ShowEyeIcon} from '@urban-ui/icons'
import {base, container, sizeBase} from './input.css.ts'
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

const paddingVariants = cva([], {
  variants: {
    before: {
      true: atoms({pl: 'md'}),
    },
    after: {
      true: atoms({pr: 'md'}),
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
  Prefix?: React.ReactNode
  PrefixContent?: React.ReactNode
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
      Prefix: PrefixEl,
      PrefixContent,
      Postfix: PostfixEl,
      clear = true,
      onClear,
      passwordToggle = true,
      onPasswordToggle,
      type,
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

    // @TODO use a reducer here to manage internal state
    // Password visibility should be set here because we have to manage the dom element type and it will be reset on hover events as the component re-renders and will get the type passed in her instead of the side effect of using the dom state so we need to internally control the visibility state. the passwordControl button state should be controlled by it, and the type of the input i.e. text or password (if a type other than password is passed then the password state is unchangeable, currently, anyways)
    const [inputType, setInputType] = useState(type)
    const internalState = useReducer()

    const {inputProps} = useTextField({...props, type: inputType}, ref)
    const {hoverProps, isHovered} = useHover(props)
    const {focusProps, isFocusVisible, isFocused} = useFocusRing(
      mergeProps(props, {
        isTextInput: true,
      }),
    )

    const PreEl = usePrefix({
      Prefix: PrefixEl,
      PrefixContent,
      size,
      inputRef: ref,
      ...props,
    })
    const PostEl = usePostfix({
      Postfix: PostfixEl,
      size,
      clear,
      onClear,
      passwordToggle,
      onPasswordToggle,
      setInputType,
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
        {PreEl}
        <input
          className={cx(
            inputVariants({size, className}),
            paddingVariants({
              before: PreEl == null,
              after: PostEl == null,
            }),
          )}
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
  ({className, size, background, muted, tone, ...props}, passRef) => {
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
      <Flex
        className={cx(containerVariants({background, muted, tone}), container)}
        data-hovered={isHovered}
        data-focused={isFocused}
        data-focus-visible={isFocusVisible}
        data-disabled={props.isDisabled}>
        <textarea
          className={cx(
            inputVariants({size, className}),
            containerVariants({background}),
            paddingVariants({before: true, after: true}),
          )}
          {...mergeProps(inputProps, hoverProps, focusProps)}
          ref={ref}
          data-hovered={isHovered}
          data-focused={isFocused}
          data-focus-visible={isFocusVisible}
        />
      </Flex>
    )
  },
)
TextArea.displayName = 'TextArea'

function usePrefix({
  Prefix,
  PrefixContent,
  size,
}: InputProps & {
  inputRef: React.MutableRefObject<HTMLInputElement>
}) {
  const Pre = useMemo(() => {
    if (Prefix != null) {
      return Prefix
    }

    if (PrefixContent == null) {
      return null
    }

    return <ControlContainer size={size}>{PrefixContent}</ControlContainer>
  }, [Prefix, PrefixContent, size])

  return Pre
}

function usePostfix({
  Postfix,
  size,
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
    if (Postfix != null) {
      return Postfix
    }

    if (isDisabled === true) {
      return null
    }

    const controls = []

    if (clear === true) {
      controls.push(
        <ClearControl
          key='clear'
          {...{clear, onClear, value, onChange, inputRef}}
        />,
      )
    }

    if (passwordToggle === true && type === 'password') {
      controls.push(
        <PasswordControl
          key='password'
          {...{passwordToggle, onPasswordToggle, inputRef}}
        />,
      )
    }

    return controls.length > 0 ? (
      <ControlContainer size={size}>{controls}</ControlContainer>
    ) : null
  }, [
    size,
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

  return Controls
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
  const [isVisible, setIsVisible] = useState(false)
  const onClearPress = useCallback(() => {
    setIsVisible(false)

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

  useMemo(() => {
    if (value != null) {
      setIsVisible(value.length > 0)
    }
  }, [value])

  const onInputChange = useCallback(() => {
    setIsVisible(inputRef.current.value.length > 0)
  }, [inputRef])

  useEffect(() => {
    if (value != null) {
      return
    }

    const el = inputRef.current
    el.addEventListener('input', onInputChange)
    return () => {
      el.removeEventListener('input', onInputChange)
    }
  })

  return (
    <Flex
      className={atoms({
        height: 'fill',
        opacity: isVisible ? '1' : '0',
        transition: 'opacity',
      })}>
      <Button
        icon
        aria-label='Clear field'
        radii='circular'
        size='fill'
        variant='ghost'
        onPress={onClearPress}
        tabIndex={isVisible ? undefined : -1}
        className={atoms({
          pointerEvents: isVisible ? 'auto' : 'none',
        })}>
        <CloseIcon size='lg' />
      </Button>
    </Flex>
  )
}

function PasswordControl({
  onPasswordToggle,
  inputRef,
}: Pick<InputProps, 'passwordToggle' | 'onPasswordToggle' | 'type'> & {
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
        {isVisible ? <HideEyeIcon size='lg' /> : <ShowEyeIcon size='lg' />}
      </Button>
    </Flex>
  )
}
