import type {FlexProps} from '@urban-ui/flex'

import * as React from 'react'
import {useField} from '@react-aria/label'
import {Flex} from '@urban-ui/flex'
import {useSlotProps, useSlots} from '@urban-ui/utils'

export interface RootProps extends React.PropsWithChildren, FlexProps {}
export function Root({children, id, ...props}: RootProps) {
  // The actual content of the label does not seem to matter here, react-aria will generate a unique id anyway.
  // If an id is passed in then it will be used.
  const {labelProps, fieldProps, descriptionProps, errorMessageProps} =
    useField({
      ...props,
      id: id,
      label: 'label',
      description: 'description',
      errorMessage: 'error',
    })
  // @TODO create a bounded set of possible slots, to give typescript autocomplete for available slot names and apply to each component that can receive a slot, rather than slot=string
  const computedChildren = useSlotProps(children, {
    label: labelProps,
    field: fieldProps,
    description: descriptionProps,
    errorMessage: errorMessageProps,
  })
  return <Flex {...props}>{computedChildren}</Flex>
}
