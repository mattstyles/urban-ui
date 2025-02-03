import stylex from '@stylexjs/stylex'
import { primary } from '@urban-ui/theme/colors.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  border: {
    borderColor: primary[500],
    borderWidth: 1,
    borderStyle: 'solid',
  },
})

export interface FlexProps extends React.PropsWithChildren {}

export const Flex = forwardRef<HTMLSpanElement, FlexProps>((props, ref) => {
  return (
    <span ref={ref} {...stylex.props(styles.border)}>
      {props.children}
    </span>
  )
})
