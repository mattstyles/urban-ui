'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { Description, FieldError, Label, formField } from '@urban-ui/form'
import { Input } from '@urban-ui/input'
import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components'
import { TextField as AriaTextField } from 'react-aria-components'

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, 'style' | 'children'> {
  /**
   * Label text for the field
   */
  label?: string

  /**
   * Description/helper text displayed below the input
   */
  description?: string

  /**
   * Error message to display when the field is invalid.
   * Can be a string or a function that receives validation state.
   */
  errorMessage?: string | ((validation: ValidationResult) => string)

  /**
   * Placeholder text for the input
   */
  placeholder?: string

  /**
   * Size of the input
   * @default 'md'
   */
  size?: 'sm' | 'md'

  /**
   * Additional styles to apply to the container
   */
  style?: StyleXStyles
}

/**
 * TextField component built on react-aria-components.
 * Composes Input with Label, Description, and FieldError for a complete form field.
 */
export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  size = 'md',
  style,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props} {...stylex.props(formField.base, style)}>
      {label && <Label>{label}</Label>}
      <Input placeholder={placeholder} size={size} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
TextField.displayName = '@urban-ui/textfield'
