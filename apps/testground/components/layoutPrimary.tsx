import type {NavType} from './navigation'

import {useState, useCallback} from 'react'
import {HamburgerMenuIcon, StitchesLogoIcon} from '@radix-ui/react-icons'
import {RadixLogoIcon} from 'components/radixLogoIcon'
import {Nav} from './navigation'

import {Button} from '@urban-ui/button'
import {Center} from '@urban-ui/center'
import {Container} from '@urban-ui/container'
import {Screen} from '@urban-ui/screen'
import {Stack} from '@urban-ui/stack'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Text, Anchor} from '@urban-ui/text'
import * as Scrollable from '@urban-ui/scrollable'
import {styled} from '@urban-ui/theme'

type LayoutProps = {
  children: React.ReactNode
  nav: NavType
}
export function Layout({children, nav}: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const onNavClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return (
    <Screen min>
      <Container orientation={{'@initial': 'h', '@sm': 'v'}}>
        <Aside>
          <Container
            css={{'@md+': {display: 'none'}}}
            alignment='center'
            orientation='h'>
            <Flex orientation='h'>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                type={isOpen ? 'solid' : 'transparent'}
                tone='primary'
                square
                round>
                <HamburgerMenuIcon />
              </Button>
            </Flex>
          </Container>
          <AsideContent isOpen={isOpen}>
            <Scrollable.Root type='auto'>
              <Scrollable.Viewport>
                <Nav onClick={onNavClose} nav={nav} />
              </Scrollable.Viewport>
              <Scrollable.Scrollbar>
                <Scrollable.Thumb />
              </Scrollable.Scrollbar>
            </Scrollable.Root>
            <AsideFooter />
          </AsideContent>
        </Aside>
        <Spacer size='lg' orientation='h' />
        {children}
      </Container>
    </Screen>
  )
}

const Aside = styled('aside', {
  minWidth: '$tokens$aside2',
  width: '$tokens$aside2',
  position: 'sticky',
  top: 0,
  height: '100vh',
  padding: '$3',
  display: 'flex',
  zIndex: 1000,

  '@sm': {
    height: '$tokens$header2',
    width: 'auto',
    backgroundColor: '$bg2',
    boxShadow: '$md',
    left: 0,
    right: 0,
  },
})
const AsideContent = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  borderRadius: '$3',
  backgroundColor: '$primary10',
  overflow: 'hidden',

  '@sm': {
    position: 'absolute',
    left: 'calc($tokens$aside2 * -1)',
    transition: 'left 150ms ease-out',
    top: '$tokens$header2',
    width: '$tokens$aside2',
    height: 'calc(100vh - $tokens$header2)',
    backgroundColor: '$bg10',
    boxShadow: 'md',
    borderRadius: '$0',
    justifyContent: 'center',
  },

  variants: {
    isOpen: {
      true: {
        left: 0,
        width: '100vw',
      },
    },
  },
})

function AsideFooter() {
  return (
    <Flex
      orientation='v'
      alignment='center'
      css={{px: '$5', py: '$8', color: '$white'}}>
      <Stack gap='md' orientation='h'>
        <Center css={{size: '$6'}}>
          <StitchesLogoIcon color='currentcolor' width='100%' height='100%' />
        </Center>
        <Center css={{size: '$6'}}>
          <RadixLogoIcon width='100%' height='100%' />
        </Center>
      </Stack>
      <Spacer size='lg' />
      <Text color='currentcolor' size='sm'>
        Powered by{' '}
        <Anchor
          type='inline'
          href='https://stitches.dev/'
          target='_blank'
          css={{$$textHighlight: '$white'}}>
          stitches
        </Anchor>{' '}
        and{' '}
        <Anchor
          type='inline'
          href='https://www.radix-ui.com/'
          target='_blank'
          css={{$$textHighlight: '$white'}}>
          radix-ui
        </Anchor>
      </Text>
    </Flex>
  )
}
