'use client'

import type {Validation, InputBase} from '@react-types/shared'
import type {FieldAria} from '@react-aria/label'
import type {FlexProps} from '@urban-ui/flex'

import * as React from 'react'
import {useField} from '@react-aria/label'
import {mergeProps} from '@react-aria/utils'
import {Flex} from '@urban-ui/flex'
import {useSlotProps} from '@urban-ui/utils'

export interface RootProps
  extends React.PropsWithChildren,
    FlexProps,
    Validation,
    InputBase {}
//{
//   isDisabled?: boolean
//   validationState?: 'invalid' | 'valid'
// }
export function Root({children, id, ...props}: RootProps) {
  // The actual content of the label does not seem to matter here, react-aria will generate a unique id anyway.
  // If an id is passed in then it will be used.
  const {labelProps, fieldProps, descriptionProps, errorMessageProps} =
    useField({
      ...props,
      id: id,
      label: 'label',

      // Not sure that we need these, seems to work fine without
      // description: 'description',
      // errorMessage: 'error',
    })

  const {isDisabled, validationState, isReadOnly, isRequired, ...rest} = props

  const computedChildren = useSlotProps(children, {
    label: labelProps,
    field: mergeFieldProps(fieldProps, {
      isDisabled,
      validationState,
      isReadOnly,
      isRequired,
    }),
    description: descriptionProps,
    errorMessage: errorMessageProps,
  })
  return <Flex {...rest}>{computedChildren}</Flex>
}

type FieldProps = Pick<
  RootProps,
  'isDisabled' | 'validationState' | 'isReadOnly' | 'isRequired'
>
function mergeFieldProps(
  fieldProps: FieldAria['fieldProps'],
  props: FieldProps,
) {
  return mergeProps(fieldProps, props)
}

// @TODO handle validation state
// stop rendering description and start rendering error message _if_ error message exists
