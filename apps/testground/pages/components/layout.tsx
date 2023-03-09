import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {HamburgerMenuIcon} from '@radix-ui/react-icons'

import {Container} from '@urban-ui/container'
import {Screen} from '@urban-ui/screen'
import {Stack} from '@urban-ui/stack'
import {Content} from '@urban-ui/content'
import {Spacer} from '@urban-ui/spacer'
import * as Scrollable from '@urban-ui/scrollable'
import {styled} from '@urban-ui/theme'

export function Layout({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Screen min>
      <Container orientation={{'@initial': 'h', '@sm': 'v'}}>
        <Aside>
          <Container css={{'@md+': {display: 'none'}}}>
            <button onClick={() => setIsOpen(!isOpen)}>
              <HamburgerMenuIcon />
            </button>
          </Container>
          <AsideContent isOpen={isOpen}>
            <Links onClick={() => setIsOpen(false)} />
          </AsideContent>
        </Aside>
        <Spacer size='lg' orientation='h' />
        {children}
      </Container>
    </Screen>
  )
}

type LinkType = {name: string; link: string}
const toc: Array<LinkType> = [
  {name: 'Spacer', link: '/components/spacer'},
  {name: 'Flex', link: '/components/flex'},
  {name: 'Stack', link: '/components/stack'},
  {name: 'Shadows', link: '/components/shadows'},
  {name: 'Text', link: '/components/text'},
  {name: 'Responsive', link: '/components/responsive'},
  {name: 'Scrollable', link: '/components/scrollable'},
  // {name: 'Layout examples', link: '/pages'},
]

const Aside = styled('aside', {
  minWidth: '$tokens$aside2',
  position: 'sticky',
  top: 0,
  height: '100vh',
  padding: '$3',
  display: 'flex',

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
  borderRadius: '$3',
  backgroundColor: '$primary10',

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

function Links({onClick}: {onClick?: () => void}) {
  return (
    <Stack
      as='ul'
      size='md'
      css={{
        listStyleType: 'none',
        paddingInlineStart: 0,
        padding: '$3',
        width: '100%',
      }}>
      {toc.map(({name, link}) => {
        return (
          <NavLink key={name} href={link} onClick={onClick}>
            {name}
          </NavLink>
        )
      })}
    </Stack>
  )
}

const StyledLink = styled('a', {
  padding: '$2 $5',
  backgroundColor: '$transparent',
  color: '$white',
  transition: 'backgroundColor 150ms linear',
  borderRadius: '$2',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: '$whiteA8',
  },

  '&[aria-current="page"]': {
    backgroundColor: '$white',
    color: '$text',
  },
})

function NavLink({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode
  href: string
  onClick?: () => void
}) {
  const {asPath, push} = useRouter()
  return (
    <StyledLink
      as={Link}
      aria-current={asPath === href ? 'page' : undefined}
      onClick={onClick}
      href={href}>
      {children}
    </StyledLink>
  )
}
