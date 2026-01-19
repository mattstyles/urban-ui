import { Item } from '@internal/item'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    padding: space.sm,
    backgroundColor: tone.surface,
    borderRadius: radii.md,
  },
})

export interface ContainerProps extends React.PropsWithChildren {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children } = props

    return (
      <div ref={ref} {...stylex.props(styles.container)}>
        <Item>Nested Item</Item>
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
