import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
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

export function useWrappedIndex({children}: {children: React.ReactNode}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  return useMemo(() => {
    if (children == null) {
      return {
        currentIndex: currentIndex,
        next: () => {},
        prev: () => {},
        set: () => {},
      }
    }

    const length = Children.toArray(children).length

    return {
      currentIndex: currentIndex,
      next: () => {
        setCurrentIndex((currentIndex + 1) % length)
      },
      prev: () => {
        if (currentIndex === 0) {
          setCurrentIndex(length - 1)
          return
        }
        setCurrentIndex((currentIndex - 1) % length)
      },
      set: (index: number) => {
        setCurrentIndex(index % length)
      },
    }
  }, [children, currentIndex])
}

export function useFocusEffect({
  currentIndex,
  refs,
}: {
  currentIndex: number
  refs: ElementRefs
}) {
  useEffect(() => {
    const ref = refs[currentIndex]
    if (ref == null || ref.current == null) {
      return
    }

    ref.current.focus()
  }, [currentIndex, refs])
}
