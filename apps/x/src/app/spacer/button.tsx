
import stylex from '@stylexjs/stylex'
import {useRef} from 'react'
import type {AriaButtonProps} from 'react-aria'
import {mergeProps,useButton, useFocusRing } from 'react-aria'

const styles = stylex.create({
  button: {
    padding: '3px 18px',
    fontSize: 16,
    fontWeight: 600,
    background: 'rebeccapurple',
    color: 'white',
    transition: 'background 300ms ease-in-out'
  },
  isPressed: {
    background: 'hotpink' 
  },
  isFocusVisible: {
    outline: '2px solid black'
  }
})

export interface ButtonProps extends AriaButtonProps {}

export function Button(props: ButtonProps) {
  const ref = useRef(null)
  const {buttonProps, isPressed} = useButton(props, ref)
  const {focusProps, isFocusVisible} = useFocusRing()

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      className={stylex(styles.button, isPressed && styles.isPressed, isFocusVisible && styles.isFocusVisible)}
    >{props.children}</button>
  )
}