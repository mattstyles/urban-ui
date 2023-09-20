'use client'

import React, {useMemo, Children, cloneElement, isValidElement} from 'react'

export type Slot =
  | 'field'
  | 'label'
  | 'description'
  | 'errorMessage'
  | 'requiredLabel'

type SlottedElements<T, U = React.ReactElement | null> = Partial<{
  [Property in keyof T]: U
}>

/**
 * Runs the mapper over slotted children anywhere in the tree.
 * Note that this runs a clone element on most children in the tree.
 * Returns all children.
 */
export function useSlots<
  T extends Partial<
    Record<Slot, (child: React.ReactElement) => React.ReactElement | null>
  >,
>(children: React.ReactNode, slots: T) {
  const mapped = useMemo(() => {
    return mapAllChildren(children, (child) => {
      const slot = child.props.slot as Slot
      const fn = slots[slot]

      if (fn == null) {
        return child
      }

      return fn(child)
    })
  }, [children, slots])
  return mapped
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
// export function useSlotProps(
//   children: React.ReactNode,
//   props: Partial<Record<Slot, React.HTMLAttributes<HTMLElement>>>,
// ) {
//   return useMemo(
//     () =>
//       Children.map(children, (child) => {
//         if (!isValidElement(child)) {
//           return child
//         }

//         if (child.props && child.props.slot) {
//           const p = props[child.props.slot as Slot]

//           if (p == null) {
//             return child
//           }

//           return cloneElement(child, mergeProps(child.props, p, {slot: null}))
//         }

//         return child
//       }),
//     [children, props],
//   )
// }

export function mapAllChildren(
  children: React.ReactNode,
  fn: (child: React.ReactElement) => React.ReactElement | null,
): React.ReactNode {
  if (typeof children === 'function') {
    return children
  }

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child
    }

    // We use asChild to denote a slotted child and use radix-ui/slot to do this, something about the clone here nukes the slot, so we will run the passed function against a child like this, but not muck with its children.
    if (child.props.children && child.props.asChild == null) {
      const mapped = fn(child)

      if (mapped === null) {
        return mapped
      }

      return cloneElement(
        mapped,
        mapped.props,
        mapAllChildren(child.props.children, fn),
      )
    }

    return fn(child)
  })
}
