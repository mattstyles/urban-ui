import type {VariantProps} from 'cva'
import type {FlexProps} from '@urban-ui/flex'

import {forwardRef} from 'react'
import {cva} from 'cva'
import cx from 'clsx'
import {atoms} from '@urban-ui/theme/atoms'
import {Flex} from '@urban-ui/flex'
import {base} from './panel.css.ts'
import {padding} from './variants.css.ts'

const variants = cva([base], {
  variants: {
    padding: {
      sm: padding.sm,
      md: padding.md,
      lg: padding.lg,
    },
    bg: {
      app: null,
      surface: null,
      element: null,
    },
    prominence: {
      muted: null,
      base: null,
      subtle: null,
      emphasis: null,
    },
    tone: {
      primary: atoms({tone: 'primary'}),
      neutral: atoms({tone: 'neutral'}),
      critical: atoms({tone: 'critical'}),
    },
    fg: {
      current: atoms({fg: 'current'}),
      tone: atoms({fg: 'tone'}),
      app: atoms({fg: 'app'}),
      invert: atoms({fg: 'invert'}),
    },
    contrast: {
      hi: atoms({color: 'hi'}),
      lo: atoms({color: 'lo'}),
    },
    border: {
      muted: atoms({border: 'muted'}),
      base: atoms({border: 'base'}),
      subtle: atoms({border: 'subtle'}),
      emphasis: atoms({border: 'emphasis'}),
    },
    radii: {
      sm: atoms({radii: 'sm'}),
      md: atoms({radii: 'md'}),
      lg: atoms({radii: 'lg'}),
      circular: atoms({radii: 'circular'}),
    },
    width: {
      xs: atoms({content: 'xs'}),
      sm: atoms({content: 'sm'}),
      md: atoms({content: 'md'}),
      lg: atoms({content: 'lg'}),
      xl: atoms({content: 'xl'}),
    },
    shadow: {
      sm: atoms({shadow: 'sm'}),
      md: atoms({shadow: 'md'}),
      lg: atoms({shadow: 'lg'}),
      'inset-sm': atoms({shadow: 'inset-sm'}),
      'inset-md': atoms({shadow: 'inset-md'}),
      'inset-lg': atoms({shadow: 'inset-lg'}),
    },
  },
  compoundVariants: [
    {
      bg: 'app',
      prominence: 'muted',
      className: atoms({app: 'muted'}),
    },
    {
      bg: 'app',
      prominence: 'base',
      className: atoms({app: 'base'}),
    },
    {
      bg: 'app',
      prominence: 'subtle',
      className: atoms({app: 'subtle'}),
    },
    {
      bg: 'app',
      prominence: 'emphasis',
      className: atoms({app: 'emphasis'}),
    },
    {
      bg: 'surface',
      prominence: 'muted',
      className: atoms({surface: 'muted'}),
    },
    {
      bg: 'surface',
      prominence: 'base',
      className: atoms({surface: 'base'}),
    },
    {
      bg: 'surface',
      prominence: 'subtle',
      className: atoms({surface: 'subtle'}),
    },
    {
      bg: 'surface',
      prominence: 'emphasis',
      className: atoms({surface: 'emphasis'}),
    },
    {
      bg: 'element',
      prominence: 'muted',
      className: atoms({muted: 'base'}),
    },
    {
      bg: 'element',
      prominence: 'base',
      className: atoms({muted: 'selected'}),
    },
    {
      bg: 'element',
      prominence: 'subtle',
      className: atoms({strong: 'base'}),
    },
    {
      bg: 'element',
      prominence: 'emphasis',
      className: atoms({strong: 'selected'}),
    },
  ],
  defaultVariants: {
    prominence: 'base',
    contrast: 'hi',
  },
})

export interface RootProps
  extends VariantProps<typeof variants>,
    FlexProps,
    React.PropsWithChildren {
  className?: string
}
type ElementType = HTMLDivElement

export const Root = forwardRef<ElementType, RootProps>(
  (
    {
      bg,
      prominence,
      tone,
      fg,
      contrast,
      border,
      radii,
      width,
      padding,
      shadow,
      // Component props
      className,
      children,
      // Other (flex props)
      ...props
    },
    ref,
  ) => {
    return (
      <Flex
        asChild
        ref={ref}
        {...props}
        className={variants({
          bg,
          prominence,
          tone,
          fg,
          contrast,
          border,
          radii,
          width,
          padding,
          shadow,
          className,
        })}>
        <section>{children}</section>
      </Flex>
    )
  },
)
