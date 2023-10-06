import type {AriaCheckboxGroupItemProps} from '@react-aria/checkbox'
import type {CheckboxProps as RootCheckboxProps} from '@urban-ui/checkbox'

import {forwardRef, useRef, useMemo, useCallback} from 'react'
import {useObjectRef, mergeRefs} from '@react-aria/utils'
import {Checkbox as CheckboxPrimitive} from '@urban-ui/checkbox'
import {useCheckboxGroupItem} from '@react-aria/checkbox'
import {useCheckboxGroupContextState} from './context.tsx'

export interface CheckboxProps
  extends Omit<RootCheckboxProps, 'value'>,
    AriaCheckboxGroupItemProps {}
type ElementType = HTMLInputElement

export const Checkbox = forwardRef<ElementType, CheckboxProps>(
  (props, passRef) => {
    const innerRef = useRef<ElementType>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )
    const state = useCheckboxGroupContextState()
    const {isSelected, isDisabled} = useCheckboxGroupItem(props, state, ref)
    const onChange = useCallback(
      (isSelected: boolean) => {
        state.toggleValue(props.value)
      },
      [state, props.value],
    )

    return (
      <CheckboxPrimitive
        ref={passRef}
        {...props}
        isSelected={isSelected}
        isDisabled={isDisabled}
        onChange={onChange}
      />
    )
  },
)
