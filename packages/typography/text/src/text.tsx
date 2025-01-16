import stylex from '@stylexjs/stylex'
import { theme } from '@urban-ui/theme/theme.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    backgroundColor: 'cornsilk',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  text: {
    color: theme.primary,
  },
})

export interface TextProps extends React.PropsWithChildren {}

export const text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return (
    <span ref={ref} {...stylex.props(styles.container, styles.text)}>
      {props.children}
    </span>
  )
})
