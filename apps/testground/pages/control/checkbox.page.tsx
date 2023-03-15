import {CheckIcon} from '@radix-ui/react-icons'
import {useState} from 'react'

import {Container, Stack, Spacer, Flex} from '@urban-ui/layout'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Content} from '@urban-ui/content'
import * as Checkbox from '@urban-ui/checkbox'
import {Button} from '@urban-ui/button'
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

        <Stack>
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
          <H3>Alignment with label</H3>
          <P>
            This involves a bit of mucking around. In order to align properly
            for single and multi lines you need to set a bit of padding or
            margin on the label. Use <Text type='mono'>Checkbox.Content</Text>{' '}
            to set this correctly for you based on size (use the same size as
            the <Text type='mono'>Checkbox.Root</Text>).
          </P>
          <ShortOrLongAlignmentTest />
          <H3>Complex label content</H3>
          <Stack orientation='h' alignment='start' gap='sm'>
            <Checkbox.Root id='e2' tone='neutral' size='lg' alignment='start'>
              <Checkbox.Indicator size='lg'>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Checkbox.Content size='lg'>
              <Stack as='label' htmlFor='e2'>
                <Text>Checkbox content can be more complex.</Text>
                <Text>
                  Use the <Text type='mono'>Checkbox.Content</Text> component to
                  ensure alignment with the actual checkbox.
                </Text>
                <Text>
                  Content could be really complex but you probably don’t want to
                  do that.
                </Text>
              </Stack>
            </Checkbox.Content>
          </Stack>
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

        <H2>Flex gap collapse</H2>
        <P>
          Flexbox components (such as flex and stack) are liable to collapse
          their gap size if the available space is smaller than allowed for the
          content + gap.
        </P>
        <P>
          A spacer could be used instead of relying on stack, but, in the case
          of checkbox it has a minimum width and height set so won't collapse
          beyond that minimum.
        </P>
        <Stack
          css={{
            width: '360px',
            padding: '$3',
            backgroundColor: '$bg2',
            boxShadow: '$sm',
            borderRadius: '$3',
          }}>
          <Stack orientation='h' alignment='center' gap='lg'>
            <Checkbox.Root id='d1' tone='primary' size='md'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='d1'>
              Short label text.
            </Text>
          </Stack>
          <Stack orientation='h' alignment='center' gap='lg'>
            <Checkbox.Root id='d1' tone='primary' size='md'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='d1'>
              With stack and a really long label that will be too long to fit on
              one line and will collapse the gap created by the surrounding
              stack component.
            </Text>
          </Stack>
          <Flex alignment='center'>
            <Checkbox.Root id='d2' tone='primary'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Spacer orientation='h' />
            <Text as='label' htmlFor='d2'>
              This checkbox uses flex to align things centrally on and then uses
              a spacer to create separation. A spacer uses padding and will not
              collapse even when inside a flex component.
            </Text>
          </Flex>
        </Stack>

        <Spacer size='lg' />
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function ShortOrLongAlignmentTest() {
  const [isLong, setIsLong] = useState(false)

  return (
    <Stack
      css={{
        width: '360px',
        padding: '$7',
        backgroundColor: '$bg2',
        boxShadow: '$md',
        borderRadius: '$3',
      }}
      gap='lg'>
      <Stack orientation='h' alignment='start' gap='sm'>
        <Checkbox.Root id='e1' tone='primary' size='sm'>
          <Checkbox.Indicator size='sm'>
            <CheckIcon width='100%' height='100%' />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Checkbox.Content size='sm'>
          <Text as='label' htmlFor='e1'>
            {isLong
              ? 'This is some really long text as a label that will overflow the into multiple lines, more than 2 lines, probably 3.'
              : 'Short text'}
          </Text>
        </Checkbox.Content>
      </Stack>
      <Stack orientation='h' alignment='start' gap='sm'>
        <Checkbox.Root id='e1' tone='primary'>
          <Checkbox.Indicator>
            <CheckIcon width='100%' height='100%' />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Checkbox.Content>
          <Text as='label' htmlFor='e1'>
            {isLong
              ? 'This is some really long text as a label that will overflow the into multiple lines, more than 2 lines, probably 3.'
              : 'Short text'}
          </Text>
        </Checkbox.Content>
      </Stack>
      <Stack orientation='h' alignment='start' gap='sm'>
        <Checkbox.Root id='e1' tone='primary' size='lg' alignment='start'>
          <Checkbox.Indicator size='lg'>
            <CheckIcon width='100%' height='100%' />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Checkbox.Content size='lg'>
          <Text as='label' htmlFor='e1'>
            {isLong
              ? 'This is some really long text as a label that will overflow the into multiple lines, more than 2 lines, probably 3.'
              : 'Short text'}
          </Text>
        </Checkbox.Content>
      </Stack>
      <Button onClick={() => setIsLong(!isLong)}>Set text length</Button>
    </Stack>
  )
}
