'use client'

import {
  useWrappedIndex,
  useGroupChildren,
  useSelectionH,
  useSelectionV,
  useFocusEffect,
} from './hooks.ts'
import {Flex} from '@urban-ui/flex'
import type {FlexProps} from '@urban-ui/flex'

export interface ButtonGroupProps
  extends React.PropsWithChildren,
    Pick<FlexProps, 'gap' | 'orientation'> {
  autoFocus?: boolean
}

export function ButtonGroup(props: ButtonGroupProps) {
  if (props.orientation === 'v') {
    return <VGroup {...props} />
  }

  return <HGroup {...props} />
}

function HGroup({children, gap = 'xs', autoFocus = false}: ButtonGroupProps) {
  const {currentIndex, next, prev} = useWrappedIndex({children})
  const onKeyDown = useSelectionH({next, prev})
  const {groupChildren, refs} = useGroupChildren({
    children,
    onKeyDown,
    currentIndex,
  })
  useFocusEffect({currentIndex, refs, autoFocus})

  return (
    <Flex orientation='h' gap={gap} role='toolbar'>
      {groupChildren}
    </Flex>
  )
}

function VGroup({children, gap = 'xs', autoFocus = false}: ButtonGroupProps) {
  const {currentIndex, next, prev} = useWrappedIndex({children})
  const onKeyDown = useSelectionV({next, prev})
  const {groupChildren, refs} = useGroupChildren({
    children,
    onKeyDown,
    currentIndex,
  })
  useFocusEffect({currentIndex, refs, autoFocus})

  return (
    <Flex orientation='v' gap={gap} role='toolbar'>
      {groupChildren}
    </Flex>
  )
}
