'use client'

import type {InputProps} from '@urban-ui/input'

import {forwardRef, useState, useCallback} from 'react'
import {mergeProps} from '@react-aria/utils'
import {Field} from '@urban-ui/field'
import {Text} from '@urban-ui/text'
import {Input} from '@urban-ui/input'

type Validation = (value: string) => boolean

export interface TextFieldProps extends InputProps {
  label: string
  description?: string
  errorMessage?: string
  validation?: Validation
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({label, description, errorMessage, validation, ...props}, ref) => {
    const inputValidationProps = useValidation(validation, props.defaultValue)
    const inputProps = mergeProps(inputValidationProps, props)

    console.log(inputProps.validationState)

    return (
      <Field.Root
        orientation='v'
        gap='sm'
        alignment='start'
        validationState={inputProps.validationState}>
        <Text asChild slot='label'>
          <label>{label}</label>
        </Text>
        <Input {...inputProps} ref={ref} slot='field' />
        {description && <Text slot='description'>{description}</Text>}
        {errorMessage && <Text slot='errorMessage'>{errorMessage}</Text>}
      </Field.Root>
    )
  },
)
TextField.displayName = 'TextField'

function useValidation(fn?: Validation, defaultValue?: string) {
  const [validationState, setValidationState] =
    useState<InputProps['validationState']>('valid')
  const [value, setValue] = useState<string>(defaultValue ?? '')
  const onChange = useCallback(
    (value: string) => {
      if (fn != null) {
        setValidationState(fn(value) ? 'valid' : 'invalid')
      }
      setValue(value)
    },
    [fn],
  )

  return {
    value,
    onChange,
    validationState,
  }
}
