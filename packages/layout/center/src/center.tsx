import type { StyleXStyles, Theme, VarGroup } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import type { PropsWithChildren } from 'react'

// @ts-expect-error typing for var group prefers a known object for its keys, we want a generic object and let the compiler work it out
type GenericTheme = Theme<VarGroup<unknown>> | Array<Theme<VarGroup<unknown>>>

export interface CenterProps extends PropsWithChildren {
  /**
   * StyleX style overrides
   */
  style?: StyleXStyles | GenericTheme | Array<StyleXStyles | GenericTheme>
}

export function Center({ children, style }: CenterProps) {
  return (
    <Flex align="center" justify="center" style={style}>
      {children}
    </Flex>
  )
}
