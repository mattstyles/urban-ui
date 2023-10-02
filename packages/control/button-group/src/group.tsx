'use client'

import {
  useWrappedIndex,
  useGroupChildren,
  useSelectionH,
  useSelectionV,
  useFocusEffect,
} from './hooks.ts'
import {Flex} from '@urban-ui/flex'

export interface ButtonGroupProps extends React.PropsWithChildren {
  orientation?: 'h' | 'v'
}

export function ButtonGroup({children, orientation = 'h'}: ButtonGroupProps) {
  if (orientation === 'v') {
    return <VGroup>{children}</VGroup>
  }

  return <HGroup>{children}</HGroup>
}

function HGroup({children}: React.PropsWithChildren) {
  const {currentIndex, next, prev} = useWrappedIndex({children})
  const onKeyDown = useSelectionH({next, prev})
  const {groupChildren, refs} = useGroupChildren({
    children,
    onKeyDown,
    currentIndex,
  })
  useFocusEffect({currentIndex, refs})

  return (
    <Flex orientation='h' gap='xs' role='toolbar'>
      {groupChildren}
    </Flex>
  )
}

function VGroup({children}: React.PropsWithChildren) {
  const {currentIndex, next, prev} = useWrappedIndex({children})
  const onKeyDown = useSelectionV({next, prev})
  const {groupChildren, refs} = useGroupChildren({
    children,
    onKeyDown,
    currentIndex,
  })
  useFocusEffect({currentIndex, refs})

  return (
    <Flex orientation='v' gap='xs' role='toolbar'>
      {groupChildren}
    </Flex>
  )
}
