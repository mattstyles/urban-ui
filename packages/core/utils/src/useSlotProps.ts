import React, {useMemo, Children, cloneElement, isValidElement} from 'react'
import {mergeProps} from '@react-aria/utils'

export type Slot = 'field' | 'label' | 'description' | 'errorMessage'

type SlotTypes<T, U = React.ReactElement> = Partial<{
  [Property in keyof T]: U
}>

/**
 * Mapper over slots.
 * Finds each child with a slot property and runs the supplied mapper on it.
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
export function useSlots<
  T extends Partial<
    Record<Slot, (child: React.ReactElement) => React.ReactElement>
  >,
>(children: React.ReactNode, slots: T): SlotTypes<T> {
  const output: Partial<SlotTypes<T>> = {}
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

  return output as SlotTypes<T>
}

/**
 * Applies props to children with a slot property
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
