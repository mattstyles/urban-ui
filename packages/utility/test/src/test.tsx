import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { colorsHSL } from '@stylexjs/open-props/lib/colorsHSL.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  container: {
    fontSize: fonts.size3,
    background: colorsHSL.blue7,
    padding: sizes.spacing3,
  },
  box: {
    background: colors.blue3,
  },
  p: {
    fontSize: '1rem',
  },
})

const variants = stylex.create({
  violet: {
    backgroundColor: {
      default: 'blueviolet',
      ':hover': 'darkviolet',
    },
    // color: colors.cyan7,
  },
  gray: {
    backgroundColor: {
      default: 'gainsboro',
      ':hover': 'lightgray',
    },
  },
  // ... more variants here ...
})

export interface TestProps extends React.PropsWithChildren {
  variant: 'violet' | 'gray'
}

export const Test = forwardRef<HTMLDivElement, TestProps>((props, ref) => {
  const { children, variant = 'violet' } = props

  // const { children } = props
  // const variant = 'violet'

  return (
    <div ref={ref} {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.box, styles.p, variants[variant])}>
        {children}
      </div>
    </div>
  )
})

Test.displayName = 'Test'
