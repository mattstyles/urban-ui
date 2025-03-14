import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { primary } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    borderRadius: radii.full,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: base.transparent,
  },
})

const sizeStyles = stylex.create({
  md: {
    paddingInline: space.sm,
    height: space.lg,
  },
  lg: {
    paddingInline: space.md,
    height: space.xl,
  },
})

const variants = stylex.create({
  solid: {
    backgroundColor: tone.elementEmphasisBase,
    color: tone.fgOnBlock,
    borderColor: tone.elementEmphasisBase,
  },
  muted: {
    backgroundColor: tone.elementMutedBase,
    color: tone.fgHi,
    borderColor: tone.borderBase,
  },
})

export interface TagProps extends React.PropsWithChildren {
  /**
   * Tonal colour scheme
   * @default 'tone'
   */
  tone?:
    | 'tone' // Unnecessary when we have more colours themes to work against
    | 'primary'

  /**
   * Visual variants
   */
  variant?: 'solid' | 'muted'

  /**
   * Size affects padding and text size
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    variant = 'solid',
    tone = 'tone',
    size = 'md',
    style,
    children,
  } = props

  const textSize = size === 'md' ? 'sm' : 'md'

  return (
    <Flex
      ref={ref}
      align="center"
      style={[
        styles.base,
        variants[variant],
        sizeStyles[size],
        tone === 'primary' && primary,
        style,
      ]}
    >
      <Text size={textSize} weight="medium" color="current">
        {children}
      </Text>
    </Flex>
  )
})
