'use client'

import React, {forwardRef, useMemo} from 'react'
import {
  useSelectIndex,
  useGroupChildren,
  // useSelectionH,
  // useSelectionV,
  useFocusEffect,
  useKeys,
} from './hooks.ts'
import {Flex} from '@urban-ui/flex'
import type {FlexProps} from '@urban-ui/flex'

export interface ButtonGroupProps
  extends React.PropsWithChildren,
    Pick<FlexProps, 'gap' | 'orientation'> {
  autoFocus?: boolean
  isWrap?: boolean
  isTabbable?: boolean
}

// export function ButtonGroup(props: ButtonGroupProps) {
//   if (props.orientation === 'v') {
//     return <VGroup {...props} />
//   }

//   return <HGroup {...props} />
// }
export const ButtonGroup = forwardRef<
  React.ElementRef<typeof Flex>,
  ButtonGroupProps
>(
  (
    {
      children,
      orientation = 'h',
      gap = 'xs',
      autoFocus = false,
      isWrap = false,
      isTabbable = false,
      ...props
    },
    ref,
  ) => {
    const {currentIndex, next, prev, set} = useSelectIndex({children, isWrap})
    const onKeyDown = useKeys(orientation, {next, prev})
    const ariaOrientation = useMemo(() => {
      return orientation === 'v' ? 'vertical' : 'horizontal'
    }, [orientation])
    const {groupChildren, refs} = useGroupChildren({
      children,
      onKeyDown,
      isTabbable,
      currentIndex,
      setIndex: set,
    })
    useFocusEffect({currentIndex, refs, autoFocus})

    return (
      <Flex
        ref={ref}
        orientation={orientation}
        gap={gap}
        role='toolbar'
        aria-orientation={ariaOrientation}
        {...props}>
        {groupChildren}
      </Flex>
    )
  },
)
ButtonGroup.displayName = 'Urban-ButtonGroup'

// function HGroup({
//   children,
//   gap = 'xs',
//   autoFocus = false,
//   isWrap = false,
//   isTabbable = false,
// }: ButtonGroupProps) {
//   const {currentIndex, next, prev, set} = useSelectIndex({children, isWrap})
//   const onKeyDown = useSelectionH({next, prev})
//   const {groupChildren, refs} = useGroupChildren({
//     children,
//     onKeyDown,
//     isTabbable,
//     currentIndex,
//     setIndex: set,
//   })
//   useFocusEffect({currentIndex, refs, autoFocus})

//   return (
//     <Flex orientation='h' gap={gap} role='toolbar'>
//       {groupChildren}
//     </Flex>
//   )
// }

// function VGroup({
//   children,
//   gap = 'xs',
//   autoFocus = false,
//   isWrap = false,
//   isTabbable = false,
// }: ButtonGroupProps) {
//   const {currentIndex, next, prev, set} = useSelectIndex({children, isWrap})
//   const onKeyDown = useSelectionV({next, prev})
//   const {groupChildren, refs} = useGroupChildren({
//     children,
//     onKeyDown,
//     isTabbable,
//     currentIndex,
//     setIndex: set,
//   })
//   useFocusEffect({currentIndex, refs, autoFocus})

//   return (
//     <Flex orientation='v' gap={gap} role='toolbar'>
//       {groupChildren}
//     </Flex>
//   )
// }
