'use client'

import type {AriaButtonProps} from '@react-aria/button'

import {useHover} from '@react-aria/interactions'
import {useFocusRing} from '@react-aria/focus'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {useButton} from '@react-aria/button'
import {useRef, forwardRef, useMemo} from 'react'
import * as styles from './button.css'

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children'>,
    React.PropsWithChildren {
  defaultTest?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, defaultTest = true, ...props}, passRef) => {
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
        className={styles.base}
        {...mergeProps(buttonProps, hoverProps, focusProps)}
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
