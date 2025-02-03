import stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  block: {
    display: 'flex',
  },
  inline: {
    display: 'inline-flex',
  },

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
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  alignCenter: { alignItems: 'center' },
  alignBaseline: { alignItems: 'baseline' },
  alignStretch: { alignItems: 'stretch' },

  // Align Content
  contentStart: { alignContent: 'flex-start' },
  contentEnd: { alignContent: 'flex-end' },
  contentCenter: { alignContent: 'center' },
  contentBetween: { alignContent: 'space-between' },
  contentAround: { alignContent: 'space-around' },
  contentStretch: { alignContent: 'stretch' },

  // Justify Content
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

export interface FlexProps extends React.PropsWithChildren {
  /**
   * Controls flex-direction
   * Supports aliases: h/horizontal (row), v/vertical (column)
   * @default row
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | 'h' | 'horizontal' | 'v' | 'vertical'

  /**
   * Controls flex-wrap
   * @default nowrap
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'

  /**
   * Controls align-items
   * @default stretch
   */
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

  /**
   * Controls align-content
   * @default stretch
   */
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'

  /**
   * Controls justify-content
   * @default flex-start
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

  /**
   * Controls gap between items using space tokens
   * @default 0
   */
  gap?: '0' | '25' | '50' | '75' | '100' | '150' | '200' | '250' | '300' | '350' | '400' | '450' | '500' | '550' | '600' | '700' | '800' | '900'

  /**
   * Controls horizontal gap between items using space tokens
   * @default 0
   */
  columnGap?: '0' | '25' | '50' | '75' | '100' | '150' | '200' | '250' | '300' | '350' | '400' | '450' | '500' | '550' | '600' | '700' | '800' | '900'

  /**
   * Controls vertical gap between items using space tokens
   * @default 0
   */
  rowGap?: '0' | '25' | '50' | '75' | '100' | '150' | '200' | '250' | '300' | '350' | '400' | '450' | '500' | '550' | '600' | '700' | '800' | '900'

  /**
   * When true, sets display to inline-flex instead of flex
   * @default false
   */
  inline?: boolean
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    direction = 'row',
    wrap = 'nowrap',
    align = 'stretch',
    alignContent = 'stretch',
    justify = 'flex-start',
    gap = '0',
    columnGap = '0',
    rowGap = '0',
    inline = false,
    children,
  } = props

  const directionStyle = {
    row: styles.row,
    column: styles.column,
    'row-reverse': styles.rowReverse,
    'column-reverse': styles.columnReverse,
    h: styles.row,
    horizontal: styles.row,
    v: styles.column,
    vertical: styles.column,
  }[direction]

  const wrapStyle = {
    nowrap: styles.nowrap,
    wrap: styles.wrap,
    'wrap-reverse': styles.wrapReverse,
  }[wrap]

  const alignStyle = {
    'flex-start': styles.alignStart,
    'flex-end': styles.alignEnd,
    center: styles.alignCenter,
    baseline: styles.alignBaseline,
    stretch: styles.alignStretch,
  }[align]

  const alignContentStyle = {
    'flex-start': styles.contentStart,
    'flex-end': styles.contentEnd,
    center: styles.contentCenter,
    'space-between': styles.contentBetween,
    'space-around': styles.contentAround,
    stretch: styles.contentStretch,
  }[alignContent]

  const justifyStyle = {
    'flex-start': styles.justifyStart,
    'flex-end': styles.justifyEnd,
    center: styles.justifyCenter,
    'space-between': styles.justifyBetween,
    'space-around': styles.justifyAround,
    'space-evenly': styles.justifyEvenly,
  }[justify]

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
  }[gap]

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
  }[columnGap]

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
  }[rowGap]

  return (
    <div
      ref={ref}
      {...stylex.props(
        inline ? styles.inline : styles.block,
        directionStyle,
        wrapStyle,
        alignStyle,
        alignContentStyle,
        justifyStyle,
        gapStyle,
        columnGapStyle,
        rowGapStyle
      )}
    >
      {children}
    </div>
  )
})
