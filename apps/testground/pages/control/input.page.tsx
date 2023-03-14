import {MagnifyingGlassIcon} from '@radix-ui/react-icons'

import {
  Container,
  Stack,
  Flex,
  Spacer,
  Box,
  Absolute,
  Center,
} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
import {Input} from '@urban-ui/input'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Inputs</H2>
        <P>Default is size=md and tone=neutral</P>
        <Stack>
          <Input placeholder='Default input' />
          <Input disabled placeholder='disabled' />
        </Stack>
        <H2>Sizes</H2>
        <Stack>
          <Input size='sm' placeholder='sm' />
          <Input size='md' placeholder='md' />
          <Input size='lg' placeholder='lg' />
        </Stack>
        <H2>Tonality</H2>
        <P>
          These components specify their value, so they are controlled
          components but they have no change handler so the value will not
          change.
        </P>
        <Stack>
          <Input tone='primary' defaultValue='primary' />
          <Input tone='critical' defaultValue='critical' />
          <Input tone='neutral' defaultValue='neutral' />
        </Stack>
        <H2>With labels</H2>
        <P>No special syntax, create your own labels.</P>
        <Stack>
          <Stack>
            <Text as='label' htmlFor='above'>
              With label
            </Text>
            <Input id='above' />
          </Stack>
          <Stack orientation='h' alignment='center' gap='lg'>
            <Text as='label' htmlFor='inline'>
              With label
            </Text>
            <Input id='inline' />
          </Stack>
        </Stack>
        <H2>Example form</H2>
        <Flex
          css={{
            padding: '$7',
            width: '360px',
            borderRadius: '$3',
            backgroundColor: '$bg2',
          }}>
          <Stack gap='lg' size='full'>
            <Stack>
              <Text as='label' htmlFor='example-username'>
                Username
              </Text>
              <Input id='example-username' width='full' />
            </Stack>
            <Stack>
              <Text as='label' htmlFor='example-password'>
                Password
              </Text>
              <Input id='example-password' type='password' width='full' />
            </Stack>
            <Spacer size='sm' />
            <Stack orientation='h' justify='end'>
              <Button tone='neutral' type='transparent'>
                Cancel
              </Button>
              <Button tone='primary' type='solid'>
                Save
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <H2>With icon</H2>
        <Stack>
          <WithIcon />
        </Stack>
        <Spacer size='xl' />
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function WithIcon(props: React.ComponentProps<typeof Input>) {
  return (
    <Flex css={{position: 'relative'}} size='full'>
      <Absolute>
        <Center css={{size: '$tokens$controlFieldSizeMd'}}>
          <Box css={{size: '$5'}}>
            <MagnifyingGlassIcon width='100%' height='100%' />
          </Box>
        </Center>
      </Absolute>
      <Input
        defaultValue='with icon'
        css={{pl: '$tokens$controlFieldSizeMd'}}
      />
    </Flex>
  )
}
