import stylex from '@stylexjs/stylex'
// import { theme } from '@urban-ui/theme/theme.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    backgroundColor: 'cornsilk',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 4,
  },
  // text: {
  //   color: theme.primary,
  // },
})

export interface TextProps extends React.PropsWithChildren {}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return (
    <span ref={ref} {...stylex.props(styles.container)}>
      {props.children}
    </span>
  )
})
