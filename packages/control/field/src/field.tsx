import type {FlexProps} from '@urban-ui/flex'

import * as React from 'react'
import {useField} from '@react-aria/label'
import {Flex} from '@urban-ui/flex'
import {useSlotProps} from '@urban-ui/utils'

export interface RootProps extends React.PropsWithChildren, FlexProps {}
export function Root({children, ...props}: RootProps) {
  // The actual content of the label does not seem to matter here, react-aria will generate a unique id anyway.
  // If an id is passed in then it will be used.
  const {labelProps, fieldProps, descriptionProps, errorMessageProps} =
    useField({
      ...props,
      label: 'label',
      description: 'description',
      errorMessage: 'error',
    })
  const computedChildren = useSlotProps(children, {
    label: labelProps,
    field: fieldProps,
    description: descriptionProps,
    errorMessage: errorMessageProps,
  })
  return <Flex {...props}>{computedChildren}</Flex>
}
