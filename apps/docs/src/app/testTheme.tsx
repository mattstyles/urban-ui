import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'

import { theme, vars } from './testTheme.stylex'

const styles = stylex.create({
  container: {
    background: vars.bg,
    color: 'rebeccapurple',
  },
  more: {
    padding: 20,
  },
})

export interface TestProps extends React.PropsWithChildren {}

export const TestTheme = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  const { children } = props

  return (
    <div ref={ref} {...stylex.props(theme, styles.container, styles.more)}>
      {children}
    </div>
  )
})

TestTheme.displayName = 'Test'
