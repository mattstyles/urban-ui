import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles, Theme, VarGroup } from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  block: {
    display: 'flex',
  },
  inline: {
    display: 'inline-flex',
  },

  // Flex
  flexNone: { flex: 'none' },
  flexInitial: { flex: '0 1 auto' },
  flexAuto: { flex: 'auto' },
  flex1: { flex: 1 },
  flex2: { flex: 2 },

  // Direction
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  rowReverse: { flexDirection: 'row-reverse' },
  columnReverse: { flexDirection: 'column-reverse' },

  // Wrap
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  wrapReverse: { flexWrap: 'wrap-reverse' },

  // Align Items
  alignInitial: { alignItems: 'initial' },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  alignCenter: { alignItems: 'center' },
  alignBaseline: { alignItems: 'baseline' },
  alignStretch: { alignItems: 'stretch' },

  // Align Content
  contentInitial: { alignContent: 'initial' },
  contentStart: { alignContent: 'flex-start' },
  contentEnd: { alignContent: 'flex-end' },
  contentCenter: { alignContent: 'center' },
  contentBetween: { alignContent: 'space-between' },
  contentAround: { alignContent: 'space-around' },
  contentStretch: { alignContent: 'stretch' },

  // Justify Content
  justifyInitial: { justifyContent: 'initial' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },

  // Gap
  gap0: { gap: space[0] },
  gap25: { gap: space[25] },
  gap50: { gap: space[50] },
  gap75: { gap: space[75] },
  gap100: { gap: space[100] },
  gap150: { gap: space[150] },
  gap200: { gap: space[200] },
  gap250: { gap: space[250] },
  gap300: { gap: space[300] },
  gap350: { gap: space[350] },
  gap400: { gap: space[400] },
  gap450: { gap: space[450] },
  gap500: { gap: space[500] },
  gap550: { gap: space[550] },
  gap600: { gap: space[600] },
  gap700: { gap: space[700] },
  gap800: { gap: space[800] },
  gap900: { gap: space[900] },

  // Column Gap
  columnGap0: { columnGap: space[0] },
  columnGap25: { columnGap: space[25] },
  columnGap50: { columnGap: space[50] },
  columnGap75: { columnGap: space[75] },
  columnGap100: { columnGap: space[100] },
  columnGap150: { columnGap: space[150] },
  columnGap200: { columnGap: space[200] },
  columnGap250: { columnGap: space[250] },
  columnGap300: { columnGap: space[300] },
  columnGap350: { columnGap: space[350] },
  columnGap400: { columnGap: space[400] },
  columnGap450: { columnGap: space[450] },
  columnGap500: { columnGap: space[500] },
  columnGap550: { columnGap: space[550] },
  columnGap600: { columnGap: space[600] },
  columnGap700: { columnGap: space[700] },
  columnGap800: { columnGap: space[800] },
  columnGap900: { columnGap: space[900] },

  // Row Gap
  rowGap0: { rowGap: space[0] },
  rowGap25: { rowGap: space[25] },
  rowGap50: { rowGap: space[50] },
  rowGap75: { rowGap: space[75] },
  rowGap100: { rowGap: space[100] },
  rowGap150: { rowGap: space[150] },
  rowGap200: { rowGap: space[200] },
  rowGap250: { rowGap: space[250] },
  rowGap300: { rowGap: space[300] },
  rowGap350: { rowGap: space[350] },
  rowGap400: { rowGap: space[400] },
  rowGap450: { rowGap: space[450] },
  rowGap500: { rowGap: space[500] },
  rowGap550: { rowGap: space[550] },
  rowGap600: { rowGap: space[600] },
  rowGap700: { rowGap: space[700] },
  rowGap800: { rowGap: space[800] },
  rowGap900: { rowGap: space[900] },
})

const flexStyle = {
  none: styles.flexNone,
  initial: styles.flexInitial,
  auto: styles.flexAuto,
  '1': styles.flex1,
  '2': styles.flex2,
}

const directionStyle = {
  row: styles.row,
  column: styles.column,
  'row-reverse': styles.rowReverse,
  'column-reverse': styles.columnReverse,
  h: styles.row,
  horizontal: styles.row,
  v: styles.column,
  vertical: styles.column,
}

const wrapStyle = {
  nowrap: styles.nowrap,
  wrap: styles.wrap,
  'wrap-reverse': styles.wrapReverse,
}

const alignStyle = {
  initial: styles.alignInitial,
  'flex-start': styles.alignStart,
  'flex-end': styles.alignEnd,
  center: styles.alignCenter,
  baseline: styles.alignBaseline,
  stretch: styles.alignStretch,
}

const alignContentStyle = {
  initial: styles.contentInitial,
  'flex-start': styles.contentStart,
  'flex-end': styles.contentEnd,
  center: styles.contentCenter,
  'space-between': styles.contentBetween,
  'space-around': styles.contentAround,
  stretch: styles.contentStretch,
}

const justifyStyle = {
  initial: styles.justifyInitial,
  'flex-start': styles.justifyStart,
  'flex-end': styles.justifyEnd,
  center: styles.justifyCenter,
  'space-between': styles.justifyBetween,
  'space-around': styles.justifyAround,
  'space-evenly': styles.justifyEvenly,
}

const gapStyle = {
  '0': styles.gap0,
  '25': styles.gap25,
  '50': styles.gap50,
  '75': styles.gap75,
  '100': styles.gap100,
  '150': styles.gap150,
  '200': styles.gap200,
  '250': styles.gap250,
  '300': styles.gap300,
  '350': styles.gap350,
  '400': styles.gap400,
  '450': styles.gap450,
  '500': styles.gap500,
  '550': styles.gap550,
  '600': styles.gap600,
  '700': styles.gap700,
  '800': styles.gap800,
  '900': styles.gap900,
}

const columnGapStyle = {
  '0': styles.columnGap0,
  '25': styles.columnGap25,
  '50': styles.columnGap50,
  '75': styles.columnGap75,
  '100': styles.columnGap100,
  '150': styles.columnGap150,
  '200': styles.columnGap200,
  '250': styles.columnGap250,
  '300': styles.columnGap300,
  '350': styles.columnGap350,
  '400': styles.columnGap400,
  '450': styles.columnGap450,
  '500': styles.columnGap500,
  '550': styles.columnGap550,
  '600': styles.columnGap600,
  '700': styles.columnGap700,
  '800': styles.columnGap800,
  '900': styles.columnGap900,
}

const rowGapStyle = {
  '0': styles.rowGap0,
  '25': styles.rowGap25,
  '50': styles.rowGap50,
  '75': styles.rowGap75,
  '100': styles.rowGap100,
  '150': styles.rowGap150,
  '200': styles.rowGap200,
  '250': styles.rowGap250,
  '300': styles.rowGap300,
  '350': styles.rowGap350,
  '400': styles.rowGap400,
  '450': styles.rowGap450,
  '500': styles.rowGap500,
  '550': styles.rowGap550,
  '600': styles.rowGap600,
  '700': styles.rowGap700,
  '800': styles.rowGap800,
  '900': styles.rowGap900,
}

// @ts-ignore typing for var group prefers a known object for its keys, we want a generic object and let the compiler work it out
type GenericTheme = Theme<VarGroup<unknown>> | Array<Theme<VarGroup<unknown>>>
export interface FlexProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    React.PropsWithChildren {
  /**
   * Flex behaviour of the container
   */
  flex?: 'none' | 'initial' | 'auto' | '1' | '2'

  /**
   * Direction of the flex container
   * Supports aliases: h/horizontal (row), v/vertical (column)
   * @default 'row'
   */
  direction?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | 'h'
    | 'horizontal'
    | 'v'
    | 'vertical'

  /**
   * Wrapping behavior
   * @default 'nowrap'
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'

  /**
   * Alignment of items along the cross axis
   * @default 'initial'
   */
  align?:
    | 'initial'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'

  /**
   * Alignment of content when wrapped
   * @default 'initial'
   */
  alignContent?:
    | 'initial'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'

  /**
   * Alignment of items along the main axis
   * @default 'initial'
   */
  justify?:
    | 'initial'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

  /**
   * Gap between items
   * @default '0'
   */
  gap?:
    | '0'
    | '25'
    | '50'
    | '75'
    | '100'
    | '150'
    | '200'
    | '250'
    | '300'
    | '350'
    | '400'
    | '450'
    | '500'
    | '550'
    | '600'
    | '700'
    | '800'
    | '900'

  /**
   * Gap between columns
   */
  columnGap?:
    | '0'
    | '25'
    | '50'
    | '75'
    | '100'
    | '150'
    | '200'
    | '250'
    | '300'
    | '350'
    | '400'
    | '450'
    | '500'
    | '550'
    | '600'
    | '700'
    | '800'
    | '900'

  /**
   * Gap between rows
   */
  rowGap?:
    | '0'
    | '25'
    | '50'
    | '75'
    | '100'
    | '150'
    | '200'
    | '250'
    | '300'
    | '350'
    | '400'
    | '450'
    | '500'
    | '550'
    | '600'
    | '700'
    | '800'
    | '900'

  /**
   * Whether to use inline-flex instead of flex
   * @default false
   */
  inline?: boolean

  /**
   * StyleX style overrides
   */
  style?: StyleXStyles | GenericTheme | Array<StyleXStyles | GenericTheme>

  /**
   * Whether to use the Slot component instead of a div
   */
  asChild?: boolean
}

// https://react.dev/blog/2024/12/05/react-19#improvements-in-react-19 ref as a prop, forwardRef is deprecated
export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    // We omit defaults here as this will generate additional classes in the output html just to set the default browser behaviour. If we want to set specific behaviours then we can reinstate these defaults.
    // direction = 'row',
    // wrap = 'nowrap',
    // align = 'initial',
    // alignContent = 'initial',
    // justify = 'flex-start',
    // gap = '0',
    flex,
    direction,
    wrap,
    align,
    alignContent,
    justify,
    gap,
    columnGap,
    rowGap,
    inline = false,
    style = [],
    className,
    children,
    asChild = false,
    ...rest
  } = props

  const Element = asChild ? Slot : 'div'

  return (
    <Element
      ref={ref}
      // I don't think this will work as stylex outputs classname
      className={className}
      {...rest}
      {...stylex.props(
        inline ? styles.inline : styles.block,
        flex != null && flexStyle[flex],
        direction != null && directionStyle[direction],
        wrap != null && wrapStyle[wrap],
        align != null && alignStyle[align],
        alignContent != null && alignContentStyle[alignContent],
        justify != null && justifyStyle[justify],
        gap != null && gapStyle[gap],
        columnGap != null && columnGapStyle[columnGap],
        rowGap != null && rowGapStyle[rowGap],
        style,
      )}
    >
      {children}
    </Element>
  )
})
