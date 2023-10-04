import type {VariantProps} from 'cva'

import {forwardRef} from 'react'
import {cva} from 'cva'
import cx from 'clsx'
import {atoms} from '@urban-ui/theme/atoms'
import {Flex} from '@urban-ui/flex'
import {base} from './panel.css.ts'
// import {sizes} from './variants.css.ts'

const variants = cva([base], {
  variants: {
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
    // @TODO width
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
    React.PropsWithChildren {
  className?: string
}
type ElementType = HTMLDivElement

export const Root = forwardRef<ElementType, RootProps>(
  ({bg, prominence, tone, fg, contrast, border, className, ...props}, ref) => {
    return (
      <Flex
        asChild
        ref={ref}
        className={variants({
          bg,
          prominence,
          tone,
          fg,
          contrast,
          border,
          className,
        })}>
        <section>{props.children}</section>
      </Flex>
    )
  },
)
