import {Container, Stack, Flex} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, H2} from '@urban-ui/text'
import * as Switch from '@urban-ui/switch'

import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Switch</H2>
        <Stack>
          <Flex>
            <Switch.Root>
              <Switch.Thumb />
            </Switch.Root>
          </Flex>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a0' tone='highlight' disabled>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a0'>
              Disabled
            </Text>
          </Stack>
        </Stack>

        <H2>Sizes</H2>
        <Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='b1' size='sm'>
              <Switch.Thumb size='sm' />
            </Switch.Root>
            <Text as='label' htmlFor='b1'>
              Sm
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='b2' size='md'>
              <Switch.Thumb size='md' />
            </Switch.Root>
            <Text as='label' htmlFor='b2'>
              Md
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='b3' size='lg'>
              <Switch.Thumb size='lg' />
            </Switch.Root>
            <Text as='label' htmlFor='b3'>
              Lg
            </Text>
          </Stack>
        </Stack>

        <H2>Tonality</H2>
        <Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a1' tone='highlight'>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a1'>
              Highlight
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a2' tone='primary'>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a2'>
              Primary
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a3' tone='critical'>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a3'>
              Critical
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a4' tone='neutral'>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a4'>
              Neutral
            </Text>
          </Stack>
        </Stack>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
