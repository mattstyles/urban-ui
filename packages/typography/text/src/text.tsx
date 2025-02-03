import stylex from '@stylexjs/stylex'
import { primary } from '@urban-ui/theme/colors.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    backgroundColor: 'cornsilk',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 4,
  },
  text: {
    color: primary[500],
  },
})

export interface TextProps extends React.PropsWithChildren {}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return (
    <span ref={ref} {...stylex.props(styles.container, styles.text)}>
      {props.children}
    </span>
  )
})
