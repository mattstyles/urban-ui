import {styled} from '@urban-ui/theme'

export const Root = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"hd" "main"',
  gridTemplateRows: '$tokens$header2 1fr',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  padding: '0 $5',

  variants: {
    fixed: {
      true: {
        position: 'sticky',
        top: 0,
      },
    },
  },
})

export const Main = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr min(60ch, calc(100% - ($5 * 2))) 1fr',
  gridColumnGap: '$5',

  '> *': {
    gridColumn: 2,
  },
})

export const Full = styled('div', {
  width: '100%',
  gridColumn: '1 / -1',
})

export const Bleed = styled('div', {
  margin: '0 auto',
  width: '100%',
  maxWidth: 'calc(60ch + ($5 * 2))',
})
