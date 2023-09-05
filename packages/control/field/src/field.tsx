import type {FlexProps} from '@urban-ui/flex'

import * as React from 'react'
import {useField} from '@react-aria/label'
import {Flex} from '@urban-ui/flex'
import {useSlotProps} from '@urban-ui/utils'

export interface RootProps extends React.PropsWithChildren, FlexProps {}
export function Root({children, ...props}: RootProps) {
  const {labelProps, fieldProps, descriptionProps, errorMessageProps} =
    useField({
      ...props,
      label: 'label',
      description: 'description',
      errorMessage: 'error',
    })
  const computedChildren = useSlotProps(children, {
    label: labelProps,
    control: fieldProps,
    description: descriptionProps,
    errorMessage: errorMessageProps,
  })
  return <Flex {...props}>{computedChildren}</Flex>
}
