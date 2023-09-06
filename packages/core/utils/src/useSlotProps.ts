import {useMemo, Children, cloneElement, isValidElement} from 'react'
import {mergeProps} from '@react-aria/utils'

export type Slot = 'field' | 'label' | 'description' | 'errorMessage'

type SlotTypes<T, U> = {
  [Property in keyof T]: U
}
/**
 * Do not use, typing needs some work.
 * What this should do is return a mapped type based on the found slot children.
 * It's not quite there, doesn't understand the return type of the function.
 */
export function useSlots<
  T extends Record<
    Slot,
    (
      child:
        | React.ReactElement<
            HTMLElement,
            string | React.JSXElementConstructor<unknown>
          >
        | React.ReactPortal,
    ) => U
  >,
  U,
>(children: React.ReactNode, slots: T): SlotTypes<T, U> {
  const output: object = {}
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return
    }

    if (child.props && child.props.slot) {
      const fn = slots[child.props.slot as Slot]

      if (fn == null) {
        return
      }

      // @ts-expect-error ignore this for now
      output[child.props.slot] = fn(child)
    }
  })

  return output as SlotTypes<T, U>
}

/**
 * Applies props to children with a slot property
 */
export function useSlotProps(
  children: React.ReactNode,
  props: Record<Slot, React.HTMLAttributes<HTMLElement>>,
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
