import type {RouteProps} from 'tiny-component-router'

import {Inbox, Hexagon, User, Info, Loader, UserPlus} from 'react-feather'
import {proxy, useSnapshot} from 'valtio'
import {TinyComponentRouter} from 'tiny-component-router'
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  Suspense,
  startTransition,
} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {v4 as uuid} from 'uuid'
import useSWR from 'swr'

import {PersistData} from 'components/persist'
import {Button} from '@urban-ui/control'
import {Separator} from '@urban-ui/separator'
import {Content} from '@urban-ui/content'
import {Text, H2, P, Heading} from '@urban-ui/text'
import {
  Container,
  Stack,
  Center,
  Flex,
  Spacer,
  Icon,
  Box,
  Scrollable,
} from '@urban-ui/layout'
import {styled} from '@urban-ui/theme'

type SubPageType = 'people' | 'threads'
type PageType = 'info' | 'admin' | 'comms'
type StateType = {
  page: PageType
  subpage: SubPageType
  selectedPersonId: string | null
}
const state: StateType = proxy({
  page: getPage(),
  subpage: getSubpage(),
  selectedPersonId: null,
})

function setPage(page: PageType) {
  localStorage.setItem('page', page)
  state.page = page
}
function getPage(): PageType {
  if (typeof localStorage == 'undefined') {
    return 'info'
  }
  return (localStorage.getItem('page') as PageType) || 'info'
}
function setSubpage(subpage: SubPageType) {
  localStorage.setItem('subpage', subpage)
  state.subpage = subpage
}
function getSubpage(): SubPageType {
  if (typeof localStorage == 'undefined') {
    return 'people'
  }
  return (localStorage.getItem('subpage') as SubPageType) || 'people'
}

type Person = {
  id: string
  name: string
}
type Sender = 'origin' | 'target'
type Message = {
  id: string
  sender: Sender
  text: string
}
type Thread = {
  // Thread id
  id: string
  // Person id
  person: string
  messages: Array<Message>
}
const threads = new PersistData<Thread>('urban-ui', 'inbox-threads')
const people = new PersistData<Person>('urban-ui', 'inbox-people')

// As we're using client APIs we'll just wrap the whole thing to avoid hydration errors. This probably isn't what you want to do in a real app but handle things properly instead.
function ClientOnly({children}: {children: React.ReactNode}) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    startTransition(() => {
      setIsMounted(true)
    })
  }, [isMounted])
  return isMounted ? <>{children}</> : null
}

export default function page() {
  const {page} = useSnapshot(state)

  return (
    <Screen>
      <ClientOnly>
        <Aside as='aside'>
          <AsideContainer>
            <AsideHeader as='header'>
              <Container fill='all'>
                <Center size='full'>
                  <Hexagon />
                </Center>
              </Container>
            </AsideHeader>
            <AsideNav as='nav'>
              <Stack gap='lg'>
                <NavLink href='#' Icon={Info} to='info'>
                  Info
                </NavLink>
                <NavLink href='#' Icon={Inbox} to='comms'>
                  Comms
                </NavLink>
                <NavLink href='#' Icon={User} to='admin'>
                  Admin
                </NavLink>
              </Stack>
            </AsideNav>
            <AsideFooter>
              <Center size='full'>
                <Avatar />
              </Center>
            </AsideFooter>
          </AsideContainer>
        </Aside>
        <Main as='main'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
              <TinyComponentRouter match={page}>
                <InfoRoute match='info' />
                <CommsRoute match='comms' />
                <AdminRoute match='admin' />
              </TinyComponentRouter>
            </Suspense>
          </ErrorBoundary>
        </Main>
      </ClientOnly>
    </Screen>
  )
}

const Screen = styled(Container, {
  defaultVariants: {
    orientation: 'h',
  },
})

const Aside = styled(Container, {
  height: '100vh',
  flex: 1,
  minWidth: 80,
  maxWidth: 140,
  py: '$lg',
})
const AsideContainer = styled(Container, {
  flex: 1,
  borderRight: '1px solid $neutral6',

  defaultVariants: {
    alignment: 'center',
  },
})
const AsideNav = styled(Container, {
  px: '$lg',
  justifyContent: 'center',
  containerType: 'inline-size',

  defaultVariants: {
    fill: 'all',
  },
})
const AsideHeader = styled(Container, {
  minHeight: 80,
  width: '100%',
})
const AsideFooter = styled(Container, {
  width: '100%',
  minHeight: 100,
})

const Main = styled(Container, {
  flex: 1,
  height: '100vh',
})

const Article = styled(Container, {
  flex: 1,
  minWidth: 400,
  maxWidth: 700,
  height: '100vh',
  py: '$lg',
})

const StyledNavLink = styled('a', {
  display: 'inline-flex',
  textDecoration: 'none',
  width: '100%',
  py: '$md',
  px: '$md',
  borderRadius: '$md',
  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn,  color $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

  '@container (max-width: 100px)': {
    px: '$none',
    justifyContent: 'center',
  },

  defaultVariants: {
    type: 'primary',
  },
  variants: {
    isActive: {
      true: {},
    },
    type: {
      primary: {
        color: '$textLowContrast',
        '&:hover': {
          backgroundColor: '$primary4',
          color: '$textPrimary',
        },
      },
      secondary: {
        color: '$text',
        '&:hover': {
          // backgroundColor: '$neutral3',
        },
      },
    },
  },
  compoundVariants: [
    {
      type: 'primary',
      isActive: true,
      css: {
        backgroundColor: '$primary5',
        color: '$textPrimary',
      },
    },
    {
      type: 'secondary',
      isActive: true,
      css: {
        color: '$primary10',
      },
    },
  ],
})

function NavLink({
  children,
  href,
  Icon: VisualIcon,
  to,
}: {
  children: string
  href: string
  Icon: React.ElementType
  to: PageType
}) {
  const {page} = useSnapshot(state)
  const onClick = useCallback(() => {
    setPage(to)
  }, [to])

  return (
    <StyledNavLink href={href} onClick={onClick} isActive={page === to}>
      <Stack orientation='h' alignment='center'>
        <Icon
          size='md'
          css={{
            // Css will accept media queries, but will it do container queries?
            '@container (max-width: 100px)': {
              size: '$6',
            },
          }}>
          <VisualIcon color='currentcolor' width='100%' height='100%' />
        </Icon>
        <Text
          color='$current'
          css={{
            '@container (max-width: 100px)': {
              display: 'none',
            },
          }}>
          {children}
        </Text>
      </Stack>
    </StyledNavLink>
  )
}
function SubNavLink({
  children,
  href,
  Icon: VisualIcon,
  to,
}: {
  children: string
  href: string
  Icon: React.ElementType
  to: SubPageType
}) {
  const {subpage} = useSnapshot(state)
  const onClick = useCallback(() => {
    setSubpage(to)
  }, [to])

  return (
    <StyledNavLink
      href={href}
      onClick={onClick}
      isActive={subpage === to}
      type='secondary'>
      <Stack orientation='h' alignment='center'>
        <Icon size='md'>
          <VisualIcon color='currentcolor' width='100%' height='100%' />
        </Icon>
        <Text color='$current'>{children}</Text>
      </Stack>
    </StyledNavLink>
  )
}

const Avatar = styled(Box, {
  aspectRatio: 1,
  bg: '$bg10',
  width: '$6',
  height: '$6',
  borderRadius: '$round',
})

function ErrorFallback({error}: {error: Error}) {
  return (
    <Container padding='xl' role='alert'>
      <H2>Error</H2>
      <Text as='pre' type='mono'>
        {error.message}
      </Text>
    </Container>
  )
}

function Loading() {
  return (
    <Container padding='xl'>
      <Center size='full'>
        <Icon>
          <Loader />
        </Icon>
      </Center>
    </Container>
  )
}

const MainAside = styled(Container, {
  height: '100vh',
  flex: 1,
  py: '$lg',
})
const MainAsideContainer = styled(Container, {
  flex: 1,
  borderRadius: '$lg',

  defaultVariants: {
    bg: 'app',
    px: 'lg',
  },
  variants: {
    bg: {
      app: {
        bg: '$bg1',
      },
      highlight: {
        bg: '$bg2',
      },
      transparent: {
        bg: '$transparent',
      },
    },
    px: {
      none: {
        px: '$0',
      },
      sm: {
        px: '$sm',
      },
      md: {
        px: '$md',
      },
      lg: {
        px: '$lg',
      },
    },
  },
})

function InfoRoute(props: RouteProps) {
  return (
    <Container padding='lg' alignment='center' size='full'>
      <Content>
        <H2>Info</H2>
        <P>
          Testing out some components under a bit of load to see where the
          cracks are.
        </P>
      </Content>
    </Container>
  )
}

function CommsRoute(props: RouteProps) {
  return <H2>Comms</H2>
}

function AdminRoute(props: RouteProps) {
  const {subpage} = useSnapshot(state)

  return (
    <Container fill='v' orientation='h'>
      <Flex
        orientation={{'@initial': 'v', '@lg+': 'h'}}
        size='full'
        css={{
          minWidth: 240,
          maxWidth: 320,
          '@lg+': {minWidth: 500, maxWidth: 640},
        }}>
        <MainAside css={{flex: 0, '@lg+': {flex: 0.4}}}>
          <MainAsideContainer bg='transparent'>
            <AsideHeader>
              <Flex size='full' css={{px: 'lg'}} alignment='center'>
                <Heading as='h2' type='h2'>
                  Admin
                </Heading>
              </Flex>
            </AsideHeader>
            <Separator size='xs' />
            <Spacer size='lg' />
            <Stack gap='md'>
              <SubNavLink href='#' to='people' Icon={User}>
                People
              </SubNavLink>
              <SubNavLink href='#' to='threads' Icon={Inbox}>
                Threads
              </SubNavLink>
            </Stack>
          </MainAsideContainer>
        </MainAside>
        <MainAside css={{flex: 1, '@lg+': {flex: 0.6}}}>
          <MainAsideContainer bg='highlight' px='none'>
            <TinyComponentRouter match={subpage}>
              <AdminPeopleTask match='people' />
              <AdminThreadsTask match='threads' />
            </TinyComponentRouter>
          </MainAsideContainer>
        </MainAside>
      </Flex>

      <Spacer orientation='h' gap='md' />
      <TinyComponentRouter match={subpage}>
        <AdminPeople match='people' />
        <AdminThreads match='threads' />
      </TinyComponentRouter>
    </Container>
  )
}

function AdminPeopleTask(props: RouteProps) {
  const {data, mutate} = useSWR(
    'all-people',
    async () => {
      return await people.getAll()
    },
    {suspense: true}
  )

  return (
    <Container size='full'>
      <AsideHeader>
        <Flex
          size='full'
          alignment='center'
          justify='spread'
          orientation='h'
          css={{p: '$lg'}}>
          <Heading as='h3' type='h3'>
            People
          </Heading>
          <Button
            square
            round
            type='transparent'
            css={{alignSelf: 'auto'}}
            onClick={async () => {
              const id = uuid()
              const person: Person = {
                id: id,
                name: id,
              }
              await people.set(person)
              await mutate()
            }}>
            <Icon>
              <UserPlus />
            </Icon>
          </Button>
        </Flex>
      </AsideHeader>
      <Separator size='xs' />
      <Container size='full' css={{overflow: 'hidden', flexBasis: 0}}>
        <PeopleSelect people={data} />
      </Container>
    </Container>
  )
}

function PeopleSelect({people}: {people: Array<Person>}) {
  if (people.length === 0) {
    return (
      <PersonCard isSelected>
        <Stack>
          <Text color='subtle'>There are no people in the database yet.</Text>
        </Stack>
      </PersonCard>
    )
  }

  const content = useMemo(() => {
    return people.map((person) => (
      <PersonSelect key={person.id} person={person} />
    ))
  }, [people])

  return (
    <Scrollable.Root>
      <Scrollable.Viewport>
        <Spacer size='lg' />
        <Stack css={{px: '$lg'}}>{content}</Stack>
        <Spacer size='lg' />
      </Scrollable.Viewport>
      <Scrollable.Scrollbar>
        <Scrollable.Thumb />
      </Scrollable.Scrollbar>
    </Scrollable.Root>
  )
}

function PersonSelect({person}: {person: Person}) {
  const {selectedPersonId} = useSnapshot(state)

  return (
    <Button
      type='clear'
      onClick={() => {
        startTransition(() => {
          state.selectedPersonId = person.id
        })
      }}>
      <PersonCard isSelected={selectedPersonId === person.id}>
        <Stack orientation='h' gap='lg' alignment='center'>
          <Avatar />
          <Stack>
            <Text color='subtle' size='xs'>
              {person.id.slice(0, 8)}
            </Text>
            <Text>{person.name}</Text>
          </Stack>
        </Stack>
      </PersonCard>
    </Button>
  )
}

const PersonCard = styled(Flex, {
  bg: '$transparent',
  boxShadow: '$none',
  borderRadius: '$lg',
  px: '$lg',
  py: '$md',
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: '$8',

  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn,  boxShadow $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

  '&:hover': {
    bg: '$white',
    // boxShadow: '$sm',
  },

  variants: {
    isSelected: {
      true: {
        bg: '$white',
        boxShadow: '$sm',
      },
    },
  },
})

function AdminPeople(props: RouteProps) {
  const {selectedPersonId} = useSnapshot(state)

  const content = useMemo(() => {
    if (selectedPersonId == null) {
      return <Text color='subtle'>Select a person to edit</Text>
    }

    return <AdminPeopleMain id={selectedPersonId} />
  }, [selectedPersonId])

  return (
    <Container alignment='center' size='full'>
      <Article as='article' css={{px: '$lg'}}>
        <AsideHeader>
          <Container
            padding='lg'
            alignment='start'
            justify='center'
            size='full'></Container>
        </AsideHeader>
        <Separator size='xs' />
        <Spacer size='lg' />
        <Suspense fallback={<Loading />}>{content}</Suspense>
      </Article>
    </Container>
  )
}

function AdminPeopleMain({id}: {id: string}) {
  const {data: person} = useSWR(
    id,
    async (key) => {
      return await people.get(key)
    },
    {suspense: true}
  )

  if (person == null) {
    return (
      <Container
        css={{
          bg: '$critical3',
          color: '$critical12',
          px: '$lg',
          md: '$md',
          borderRadius: '$lg',
        }}>
        <Text color='current'>Id not recognised</Text>
      </Container>
    )
  }

  return (
    <Container>
      <Stack>
        <Text color='subtle' size='sm'>
          {person.id}
        </Text>
        <Text>{person.name}</Text>
      </Stack>
    </Container>
  )
}

function AdminThreadsTask(props: RouteProps) {
  return (
    <Container size='full'>
      <AsideHeader>
        <Center size='full'>
          <Heading as='h3' type='h3'>
            Threads
          </Heading>
        </Center>
      </AsideHeader>
      <Separator size='xs' />
      <Spacer size='lg' />
      <Container padding='lg' size='full'>
        <div>Content</div>
      </Container>
    </Container>
  )
}

function AdminThreads(props: RouteProps) {
  return (
    <Container size='full'>
      <H2>Threads</H2>
    </Container>
  )
}
