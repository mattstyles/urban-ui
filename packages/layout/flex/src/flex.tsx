// import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import stylex from '@stylexjs/stylex'
import { theme } from '@urban-ui/theme/theme.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  border: {
    borderColor: theme.primary,
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
