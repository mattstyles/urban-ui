import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  item: {
    padding: space.sm,
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    borderRadius: space.xs,
  },
})

export interface ItemProps extends React.PropsWithChildren {}

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { children } = props

  return (
    <div ref={ref} {...stylex.props(styles.item)}>
      {children}
    </div>
  )
})

Item.displayName = 'Item'
