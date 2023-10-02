import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  Children,
  cloneElement,
  isValidElement,
  createRef,
} from 'react'

type ElementRefs = Array<React.RefObject<HTMLElement> | null>

type SelectionActions = {
  next: () => void
  prev: () => void
}
// Default is prevented to avoid window scrolling on arrow keys
export function useSelectionH(actions: SelectionActions) {
  return useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          actions.next()
          break
        case 'ArrowLeft':
          event.preventDefault()
          actions.prev()
          break
      }
    },
    [actions],
  )
}
export function useSelectionV(actions: SelectionActions) {
  return useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          actions.next()
          break
        case 'ArrowUp':
          event.preventDefault()
          actions.prev()
          break
      }
    },
    [actions],
  )
}

export type GroupChildrenProps = {
  children: React.ReactNode
  onKeyDown: (event: KeyboardEvent) => void
  currentIndex: number
}
export function useGroupChildren({
  children,
  onKeyDown,
  currentIndex,
}: GroupChildrenProps) {
  return useMemo(() => {
    if (typeof children === 'function') {
      return children
    }

    const refs: ElementRefs = []

    const groupChildren = Children.map(children, (child, idx) => {
      if (!isValidElement(child)) {
        refs.push(null)
        return child
      }

      const ref = createRef<HTMLElement>()
      refs.push(ref)
      return cloneElement(child, {
        ref: ref,
        onKeyDown: onKeyDown,
        tabIndex: idx === currentIndex ? 0 : -1,
        ...child.props,
      })
    })

    return {
      groupChildren,
      refs,
    }
  }, [children, onKeyDown, currentIndex])
}

export function useSelectIndex({
  children,
  isWrap = false,
}: {
  children: React.ReactNode
  isWrap?: boolean
}) {
  const length = useMemo(() => Children.toArray(children).length, [children])
  const [currentIndex, setCurrentIndex] = useState(0)
  return useMemo(() => {
    if (length <= 1) {
      return {
        currentIndex: currentIndex,
        next: () => {},
        prev: () => {},
        set: () => {},
      }
    }

    return {
      currentIndex: currentIndex,
      next: () => {
        if (isWrap) {
          setCurrentIndex((currentIndex + 1) % length)
          return
        }

        setCurrentIndex(Math.min(currentIndex + 1, length - 1))
      },
      prev: () => {
        if (isWrap) {
          if (currentIndex === 0) {
            setCurrentIndex(length - 1)
            return
          }

          setCurrentIndex((currentIndex - 1) % length)
          return
        }

        setCurrentIndex(Math.max(currentIndex - 1, 0))
      },
      // @TODO no clamp checks or wrap checks here, we currently just trust the consumer
      set: (idx: number) => {
        setCurrentIndex(idx)
      },
    }
  }, [length, currentIndex, isWrap])
}

// export function useWrappedIndex({children}: {children: React.ReactNode}) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   return useMemo(() => {
//     if (children == null) {
//       return {
//         currentIndex: currentIndex,
//         next: () => {},
//         prev: () => {},
//         set: () => {},
//       }
//     }

//     const length = Children.toArray(children).length

//     return {
//       currentIndex: currentIndex,
//       next: () => {
//         setCurrentIndex((currentIndex + 1) % length)
//       },
//       prev: () => {
//         if (currentIndex === 0) {
//           setCurrentIndex(length - 1)
//           return
//         }
//         setCurrentIndex((currentIndex - 1) % length)
//       },
//       set: (index: number) => {
//         setCurrentIndex(index % length)
//       },
//     }
//   }, [children, currentIndex])
// }

type FocusEffectProps = {
  currentIndex: number
  refs: ElementRefs
  autoFocus?: boolean
}
export function useFocusEffect({
  currentIndex,
  refs,
  autoFocus = false,
}: FocusEffectProps) {
  const prev = useRef<number | null>(null)
  useEffect(() => {
    if (currentIndex === prev.current) {
      return
    }

    const ref = refs[currentIndex]
    if (ref == null || ref.current == null) {
      prev.current = null
      return
    }

    if (prev.current == null && autoFocus === false) {
      prev.current = currentIndex
      return
    }

    prev.current = currentIndex
    ref.current.focus()
  }, [currentIndex, refs, autoFocus])
}
