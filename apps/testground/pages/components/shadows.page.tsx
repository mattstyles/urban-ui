import {styled} from '@urban-ui/theme'
import {Container} from '@urban-ui/container'
import {Stack} from '@urban-ui/stack'
import {Screen} from '@urban-ui/screen'
import {Spacer} from '@urban-ui/spacer'

import {Layout} from './layout'
import Link from 'next/link'

export default function Page() {
  return (
    <Screen grow css={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
      <Container fill='all' padding='lg'>
        <h1>Standard scale</h1>
        <p>
          General scale, can be used for overlays but also for other elements
          like screen hierarchy elements
        </p>
        <Stack gap='lg' alignment='center' orientation='h'>
          {Array.from({length: 6})
            .map((_, idx) => idx)
            .map((size) => {
              const Comp = Shadows[size]
              const scale = 1 + size / 6 / 2
              return (
                <Comp
                  key={size}
                  css={{width: baseWidth * scale, height: baseHeight * scale}}>
                  {size}
                </Comp>
              )
            })}
        </Stack>
        <h1>Comeau scale</h1>
        <p>
          <Link href='https://www.joshwcomeau.com/shadow-palette/'>
            Josh Comeau&#39s shadow palette generator
          </Link>
        </p>
        <p>
          A stronger scale, useful for more deliberate separation of elements
          (i.e. overlays)
        </p>
        <Spacer gap='sm' />
        <Stack gap='lg' alignment='center' orientation='h'>
          {['sm', 'md', 'lg'].map((size, idx) => {
            // @ts-ignore
            const Comp = Shadows[size]
            const scale = 1 + idx / 6 / 2
            return (
              <Comp
                key={size}
                css={{width: baseWidth * scale, height: baseHeight * scale}}>
                {size}
              </Comp>
            )
          })}
        </Stack>
      </Container>
    </Screen>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

const baseHeight = 90
const baseWidth = 90 * (16 / 9)

const Box = styled('div', {
  minWidth: baseWidth,
  minHeight: baseHeight,
  borderRadius: '$3',
  backgroundColor: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Shadow0 = styled(Box, {
  boxShadow: '$0',
})
const Shadow1 = styled(Box, {
  boxShadow: '$1',
})
const Shadow2 = styled(Box, {
  boxShadow: '$2',
})
const Shadow3 = styled(Box, {
  boxShadow: '$3',
})
const Shadow4 = styled(Box, {
  boxShadow: '$4',
})
const Shadow5 = styled(Box, {
  boxShadow: '$5',
})
const ShadowSm = styled(Box, {
  boxShadow: '$sm',
})
const ShadowMd = styled(Box, {
  boxShadow: '$md',
})
const ShadowLg = styled(Box, {
  boxShadow: '$lg',
})

const Shadows = [Shadow0, Shadow1, Shadow2, Shadow3, Shadow4, Shadow5]
// @ts-ignore
Shadows.sm = ShadowSm
// @ts-ignore
Shadows.md = ShadowMd
// @ts-ignore
Shadows.lg = ShadowLg
