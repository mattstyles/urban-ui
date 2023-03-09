import Link from 'next/link'
import {useRouter} from 'next/router'
import {useMemo} from 'react'

import {Flex} from '@urban-ui/flex'
import {Heading} from '@urban-ui/text'
import {Stack} from '@urban-ui/stack'
import {Spacer} from '@urban-ui/spacer'
import * as Scrollable from '@urban-ui/scrollable'
import {styled} from '@urban-ui/theme'

export type LinkType = {name: string; link: string}
export type NavGroup = Array<LinkType>
export type NavType = Array<{
  title: string
  block: NavGroup
}>

type NavProps = {
  onClick?: () => void
  nav: NavType
}
export function Nav({onClick, nav}: NavProps) {
  const content = useMemo(() => {
    return nav.map((group) => {
      return (
        <nav key={group.title}>
          <Stack>
            <Spacer size='md' />
            <Flex
              css={{paddingLeft: '$6', paddingRight: '$6', color: '$white'}}>
              <Heading as='h2' type='h3' color='currentcolor'>
                {group.title}
              </Heading>
            </Flex>
            <NavGroup onClick={onClick} group={group.block} />
          </Stack>
        </nav>
      )
    })
  }, [onClick, nav])

  return (
    <Scrollable.Root type='auto'>
      <Scrollable.Viewport>{content}</Scrollable.Viewport>
      <Scrollable.Scrollbar>
        <Scrollable.Thumb />
      </Scrollable.Scrollbar>
    </Scrollable.Root>
  )
}

type NavGroupProps = {
  onClick?: () => void
  group: NavGroup
}
export function NavGroup({onClick, group}: NavGroupProps) {
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
      {group.map(({name, link}) => {
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
