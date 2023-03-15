import {CheckIcon} from '@radix-ui/react-icons'

import {Container, Stack, Spacer, Flex} from '@urban-ui/layout'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Content} from '@urban-ui/content'
import * as Checkbox from '@urban-ui/checkbox'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Checkbox</H2>
        <P>Clickable area is larger than visible area.</P>
        <Stack>
          <Stack orientation='h' alignment='center'>
            <Checkbox.Root id='a1'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='a1'>
              Click me
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Checkbox.Root id='a2' round>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='a2'>
              Round
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center'>
            <Checkbox.Root id='a3' disabled>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='a3'>
              Disabled
            </Text>
          </Stack>
        </Stack>

        <H2>Size and alignment</H2>
        <P>
          Uses negative margin-left, not super happy about that, would rather
          wrap with an absolutely positioned input element, but Radix creates
          that for us and we'd have to use some inheritance to do it.
        </P>
        <Stack gap='xl'>
          <form style={{borderLeft: '1px solid red'}}>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root id='b1' size='sm'>
                <Checkbox.Indicator size='sm'>
                  <CheckIcon width='100%' height='100%' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label' htmlFor='b1'>
                sm
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root id='b2' size='md'>
                <Checkbox.Indicator size='md'>
                  <CheckIcon width='100%' height='100%' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label' htmlFor='b2'>
                md
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root id='b3' size='lg'>
                <Checkbox.Indicator size='lg'>
                  <CheckIcon width='100%' height='100%' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label' htmlFor='b3'>
                lg
              </Text>
            </Stack>
          </form>
        </Stack>

        <H2>Tonality</H2>
        <Stack orientation='h' alignment='center'>
          <Checkbox.Root id='c1' tone='highlight' size='md'>
            <Checkbox.Indicator size='md'>
              <CheckIcon width='100%' height='100%' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text as='label' htmlFor='c1'>
            Highlight
          </Text>
        </Stack>
        <Stack orientation='h' alignment='center'>
          <Checkbox.Root id='c2' tone='primary' size='md'>
            <Checkbox.Indicator size='md'>
              <CheckIcon width='100%' height='100%' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text as='label' htmlFor='c2'>
            Primary
          </Text>
        </Stack>
        <Stack orientation='h' alignment='center'>
          <Checkbox.Root id='c3' tone='critical' size='md'>
            <Checkbox.Indicator>
              <CheckIcon width='100%' height='100%' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text as='label' htmlFor='c3'>
            Critical
          </Text>
        </Stack>
        <Stack orientation='h' alignment='center'>
          <Checkbox.Root id='c4' tone='neutral' size='md'>
            <Checkbox.Indicator>
              <CheckIcon width='100%' height='100%' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text as='label' htmlFor='c4'>
            Neutral
          </Text>
        </Stack>
        <Spacer size='lg' />
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
