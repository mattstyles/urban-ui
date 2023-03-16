import {CheckIcon} from '@radix-ui/react-icons'
import {v4 as uuid} from 'uuid'

import {Container, Stack, Icon} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
import {Input} from '@urban-ui/input'
import * as Radio from '@urban-ui/radio'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Radio</H2>
        <Stack>
          <form>
            <Radio.Root defaultValue='one'>
              <Stack orientation='h' alignment='center'>
                <Radio.Item value='one' id='a1'>
                  <Radio.Indicator>
                    <Radio.Dot />
                  </Radio.Indicator>
                </Radio.Item>
                <Text as='label' htmlFor='a1'>
                  One
                </Text>
              </Stack>
              <Stack orientation='h' alignment='center'>
                <Radio.Item value='two' id='a2'>
                  <Radio.Indicator>
                    <Radio.Dot />
                  </Radio.Indicator>
                </Radio.Item>
                <Text as='label' htmlFor='a2'>
                  Two
                </Text>
              </Stack>
              <Stack orientation='h' alignment='center'>
                <Radio.Item value='three' id='a3'>
                  <Radio.Indicator>
                    <Radio.Dot />
                  </Radio.Indicator>
                </Radio.Item>
                <Text as='label' htmlFor='a3'>
                  Three
                </Text>
              </Stack>
            </Radio.Root>
          </form>
        </Stack>
        <H2>Size and alignment</H2>
        <form>
          <Stack gap='md' css={{borderLeft: '1px solid red'}}>
            <Group size='sm' />
            <Group size='md' />
            <Group size='lg' />
          </Stack>
        </form>
        <H2>Tonality</H2>
        <form>
          <Stack>
            <Group tone='highlight' orientation='h' gap='xl' />
            <Group tone='primary' orientation='h' gap='xl' />
            <Group tone='critical' orientation='h' gap='xl' />
            <Group tone='neutral' orientation='h' gap='xl' />
          </Stack>
        </form>
        <H2>With alternative icon</H2>
        <form>
          <Radio.Root defaultValue='one' orientation='h' gap='md'>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='one' id='c1'>
                <Radio.Indicator>
                  <Icon size='md'>
                    <CheckIcon width='100%' height='100%' />
                  </Icon>
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='c1'>
                One
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='two' id='c2'>
                <Radio.Indicator>
                  <Icon size='md'>
                    <CheckIcon width='100%' height='100%' />
                  </Icon>
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='c2'>
                Two
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='three' id='c3'>
                <Radio.Indicator>
                  <Icon size='md'>
                    <CheckIcon width='100%' height='100%' />
                  </Icon>
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='c3'>
                Three
              </Text>
            </Stack>
          </Radio.Root>
        </form>
        <H2>With longer text</H2>
        <Radio.Root defaultValue='one' orientation='h' gap='md'>
          <Stack orientation='h' alignment='start'>
            <Radio.Item value='one' id='d1'>
              <Radio.Indicator>
                <Icon size='md'>
                  <CheckIcon width='100%' height='100%' />
                </Icon>
              </Radio.Indicator>
            </Radio.Item>
            <Radio.Content>
              <Text as='label' htmlFor='d1' css={{maxWidth: 100}}>
                One with longer text that should wrap over two lines
              </Text>
            </Radio.Content>
          </Stack>
          <Stack orientation='h' alignment='start'>
            <Radio.Item value='two' id='d2'>
              <Radio.Indicator>
                <Icon size='md'>
                  <CheckIcon width='100%' height='100%' />
                </Icon>
              </Radio.Indicator>
            </Radio.Item>
            <Radio.Content>
              <Text as='label' htmlFor='d2'>
                Two
              </Text>
            </Radio.Content>
          </Stack>
        </Radio.Root>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function Group({
  tone = 'neutral',
  size = 'md',
  orientation = 'v',
  gap = 'none',
}: {
  tone?: 'neutral' | 'highlight' | 'primary' | 'critical'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'h' | 'v'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}) {
  const id = uuid()
  return (
    <Radio.Root defaultValue='one' orientation={orientation} gap={gap}>
      <Stack orientation='h' alignment='center'>
        <Radio.Item value='one' id={`${id}1`} tone={tone} size={size}>
          <Radio.Indicator size={size}>
            <Radio.Dot size={size} />
          </Radio.Indicator>
        </Radio.Item>
        <Text as='label' htmlFor={`${id}1`}>
          One
        </Text>
      </Stack>
      <Stack orientation='h' alignment='center'>
        <Radio.Item value='two' id={`${id}2`} tone={tone} size={size}>
          <Radio.Indicator size={size}>
            <Radio.Dot size={size} />
          </Radio.Indicator>
        </Radio.Item>
        <Text as='label' htmlFor={`${id}2`}>
          Two
        </Text>
      </Stack>
      <Stack orientation='h' alignment='center'>
        <Radio.Item value='three' id={`${id}3`} size={size} tone={tone}>
          <Radio.Indicator size={size}>
            <Radio.Dot size={size} />
          </Radio.Indicator>
        </Radio.Item>
        <Text as='label' htmlFor={`${id}3`}>
          Three
        </Text>
      </Stack>
    </Radio.Root>
  )
}
