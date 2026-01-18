import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'

import { space } from '@urban-ui/theme/layout.stylex'
import { tone, surface } from '@urban-ui/theme/colors.stylex'
import { themes } from '@urban-ui/theme'

const styles = stylex.create({
  container: {
    paddingBlock: space.xs,
    paddingInline: space.md,
    backgroundColor: surface.subtle,
    color: tone.fgHi,
    borderRadius: space.xs,
  },
})

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

export interface Test2Props extends React.PropsWithChildren {
  /**
   * Color tone
   * @default 'neutral'
   */
  tone?: keyof typeof tones
}

export const Test2 = forwardRef<HTMLDivElement, Test2Props>((props, ref) => {
  const { children, tone = 'neutral' } = props

  return (
    <div ref={ref} {...stylex.props(styles.container, tones[tone])}>
      {children}
    </div>
  )
})

Test2.displayName = 'Test2'
