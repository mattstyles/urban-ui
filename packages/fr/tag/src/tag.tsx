import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { theme } from '@urban-ui/fr-theme/theme.stylex'

import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    background: theme.primary,
    // background: 'red',
    color: 'white',
  },
})

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    React.PropsWithChildren {
  // @TODO is this a good idea to override the html attribute?
  style?: StyleXStyles
  // asChild?: boolean
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  return (
    <div {...stylex.props(styles.container)} ref={ref}>
      {props.children}
    </div>
  )
})
