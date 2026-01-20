'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import type { FormProps as AriaFormProps } from 'react-aria-components'
import { Form as AriaForm } from 'react-aria-components'

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export interface FormProps extends Omit<AriaFormProps, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Form component built on react-aria-components.
 * Provides a form wrapper with validation support.
 */
export function Form({ children, style, ...props }: FormProps) {
  return (
    <AriaForm {...props} {...stylex.props([styles.base, style])}>
      {children}
    </AriaForm>
  )
}
Form.displayName = '@urban-ui/form'
