import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { themes } from '@urban-ui/theme'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const tones = {
  neutral: themes.neutral,
  primary: themes.primary,
  accent: themes.accent,
  positive: themes.positive,
  warning: themes.warning,
  critical: themes.critical,
  info: themes.info,
}

const styles = stylex.create({
  base: {
    color: tone.fgHi,
  },
})

const sizes = stylex.create({
  xxs: {
    width: fontSizes.xxs,
    height: fontSizes.xxs,
  },
  xs: {
    width: fontSizes.xs,
    height: fontSizes.xs,
  },
  sm: {
    width: fontSizes.sm,
    height: fontSizes.sm,
  },
  md: {
    width: fontSizes.md,
    height: fontSizes.md,
  },
  lg: {
    width: fontSizes.lg,
    height: fontSizes.lg,
  },
  xl: {
    width: fontSizes.xl,
    height: fontSizes.xl,
  },
  xxl: {
    width: fontSizes.xxl,
    height: fontSizes.xxl,
  },
  fit: {
    width: '100%',
    height: '100%',
  },
})

const colors = stylex.create({
  current: {
    color: base.current,
  },
  hi: {
    color: tone.fgHi,
  },
  lo: {
    color: tone.fgLo,
  },
  onBlock: {
    color: tone.fgOnBlock,
  },
})

export interface IconProps
  extends React.PropsWithChildren,
    React.RefAttributes<HTMLElement> {
  /**
   * Color tone
   * @default 'neutral'
   */
  tone?: keyof typeof tones

  /**
   * Size of the icon
   * @default 'md'
   */
  size?: keyof typeof sizes

  /**
   * Color
   * @default 'current'
   */
  color?: keyof typeof colors

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

export const Icon = ({
  tone,
  size = 'md',
  color = 'current',
  style,
  children,
  ...props
}: IconProps) => {
  return (
    <Slot
      {...props}
      {...stylex.props([
        styles.base,
        tone && tones[tone],
        colors[color],
        sizes[size],
        style,
      ])}
    >
      {children}
    </Slot>
  )
}
