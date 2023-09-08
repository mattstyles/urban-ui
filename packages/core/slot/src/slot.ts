'use client'

import React, {useMemo, Children, cloneElement, isValidElement} from 'react'
import {mergeProps} from '@react-aria/utils'

export type Slot = 'field' | 'label' | 'description' | 'errorMessage'

type SlottedElements<T, U = React.ReactElement | null> = Partial<{
  [Property in keyof T]: U
}>

/**
 * Runs the mapper over slotted children.
 * Returns all children.
 */
export function useSlots<
  T extends Partial<
    Record<Slot, (child: React.ReactElement) => React.ReactElement | null>
  >,
>(children: React.ReactNode, slots: T) {
  return useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child
      }

      if (child.props && child.props.slot) {
        const slot = child.props.slot as Slot
        const fn = slots[slot]

        if (fn == null) {
          return child
        }

        return fn(child)
      }

      return child
    })
  }, [children, slots])
}

/**
 * Mapper over slots.
 * Finds each child with a slot property and runs the supplied mapper on it.
 * Returns only slot children.
 *
 * @example
 * ```
 * function Foo({children}: React.PropsWithChildren) {
 *   const {label} = useSlots({
 *     label: (child) => <label>{child}</label>
 *   })
 *
 *   return (
 *     <Field>
 *       {label}
 *       <Input ... />
 *     </Field>
 *   )
 * }
 *
 * // Example render function
 * return (
 *   <Foo>
 *     <Text slot='label'>Label</Text>
 *   </Foo>
 * )
 * ```
 */
export function useGetSlots<
  T extends Partial<
    Record<Slot, (child: React.ReactElement) => React.ReactElement | null>
  >,
>(children: React.ReactNode, slots: T): SlottedElements<T> {
  return useMemo(() => {
    const output: Partial<SlottedElements<T>> = {}
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        return
      }

      if (child.props && child.props.slot) {
        const slot = child.props.slot as Slot
        const fn = slots[slot]

        if (fn == null) {
          return
        }

        output[slot] = fn(child)
      }
    })

    return output as SlottedElements<T>
  }, [children, slots])
}

/**
 * Applies props to children with a slot property
 * Returns all children
 */
export function useSlotProps(
  children: React.ReactNode,
  props: Partial<Record<Slot, React.HTMLAttributes<HTMLElement>>>,
) {
  return useMemo(
    () =>
      Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child
        }

        if (child.props && child.props.slot) {
          const p = props[child.props.slot as Slot]

          if (p == null) {
            return child
          }

          return cloneElement(child, mergeProps(child.props, p, {slot: null}))
        }

        return child
      }),
    [children, props],
  )
}
