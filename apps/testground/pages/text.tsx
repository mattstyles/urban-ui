import Link from 'Next/link'

import {Container} from '@urban-ui/container'
import {
  Text,
  Strong,
  Emphasis,
  Anchor,
  Heading,
  P,
  H1,
  H2,
  H3,
} from '@urban-ui/text'
import {Content} from '@urban-ui/content'
import {Stack} from '@urban-ui/stack'

import {lorem} from 'components/lorem'

export default function Page() {
  return (
    <div>
      <Container
        css={{
          width: '100%',
          maxWidth: '$tokens$content2',
          margin: '$8 auto',
          padding: '$3',
        }}>
        <Heading>Using Heading and Text</Heading>
        <Text>
          Heading and text contain only sizing, no margins. They are expected to
          be composed beneath a layout component such as stack.
        </Text>
        <Text>For example, the following is contained within a stack:</Text>
        <Stack css={{backgroundColor: '$bg2'}}>
          <Heading type='h2' color='primary'>
            Some heading
          </Heading>
          <Text type='mono'>Some monospaced text</Text>
          <Text>{lorem.generateWords(20)}</Text>
          <Text>
            Text with <Strong>strong</Strong> and <Emphasis>emphasis</Emphasis>{' '}
            elements in it.
          </Text>
          <Text>
            Text can also contain <Anchor href='#'>anchors</Anchor> in the copy.
            Anchors have an{' '}
            <Anchor type='inline' href='#'>
              inline variant
            </Anchor>
            .
          </Text>
          <Text size='xl'>
            <Anchor href='#'>Anchors</Anchor> will follow text styling.
          </Text>
          <Text>
            Next/link can be used in text,{' '}
            <Anchor as={Link} href='/'>
              Go to home
            </Anchor>
            .
          </Text>
        </Stack>

        <div>
          <H1>A styled H1</H1>
          <P>
            H1, H2, H3, and P components contain margins for laying out copy.
          </P>
          <P>{lorem.generateWords(20)}</P>
          <P>{lorem.generateWords(46)}</P>
          <P>{lorem.generateWords(22)}</P>
          <H2>An h2</H2>
          <P>{lorem.generateWords(20)}</P>
          <H2>Stacked headings</H2>
          <H3>An H3 heading</H3>
          <P>{lorem.generateWords(20)}</P>
          <P>{lorem.generateWords(20)}</P>
        </div>
      </Container>
      <Container padding='md' alignment='center'>
        <Content>
          <H2>Content default width</H2>
          <P>{lorem.generateWords(46)}</P>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
        </Content>
        <Content size='sm'>
          <H2>Content small width</H2>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
        </Content>
        <Content size='lg'>
          <H2>Content large width</H2>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
          <P>{lorem.generateWords((12 + Math.random() * 60) | 0)}</P>
        </Content>
      </Container>
    </div>
  )
}
