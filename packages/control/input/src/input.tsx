'use client'

import type {VariantProps} from 'cva'
import type {AriaTextFieldProps} from '@react-aria/textfield'

import {forwardRef, useRef, useMemo} from 'react'
import {tones} from '@urban-ui/theme'
import {Text} from '@urban-ui/text'
import {useTextField} from '@react-aria/textfield'
import {mergeProps, useObjectRef, mergeRefs} from '@react-aria/utils'
import {cva} from 'cva'
import {base} from './input.css.ts'

const variants = cva([base], {
  variants: {},
})

export interface InputProps
  extends Omit<AriaTextFieldProps, 'children'>,
    VariantProps<typeof variants> {
  className?: string
}

type ElementType = HTMLInputElement
export const Input = forwardRef<ElementType, InputProps>(
  ({className, ...props}, passRef) => {
    const innerRef = useRef<ElementType>(null)
    const ref = useObjectRef(
      useMemo(() => {
        return mergeRefs(passRef, innerRef)
      }, [passRef, innerRef]),
    )
    const {inputProps} = useTextField(props, ref)

    return <input className={variants({className})} {...inputProps} ref={ref} />
  },
)
Input.displayName = 'Input'
