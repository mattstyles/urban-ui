import {Container, Flex, Stack, Spacer} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {H2, H3, P, Text} from '@urban-ui/text'
import {Separator} from '@urban-ui/separator'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Separator</H2>
        <P>
          Wraps <Text type='mono'>radix-ui/separator</Text> and applies styling
          and layout props such as size.
        </P>
        <Flex>
          <Text>Left</Text>
          <Separator orientation='v' />
          <Text>Right</Text>
        </Flex>
        <Flex orientation='v'>
          <Text>Top</Text>
          <Separator />
          <Text>Bottom</Text>
        </Flex>
        <Flex>
          <Text>Decorative</Text>
          <Separator decorative orientation='v' />
          <Text>Decorative</Text>
        </Flex>
        <H2>Sizing</H2>
        <H3>Vertical</H3>
        <Stack>
          <Divider orientation='h' size='xs' />
          <Divider orientation='h' size='sm' />
          <Divider orientation='h' size='md' />
          <Divider orientation='h' size='lg' />
          <Divider orientation='h' size='xl' />
        </Stack>
        <H3>Horizontal</H3>
        <Stack>
          <Divider orientation='v' size='xs' />
          <Divider orientation='v' size='sm' />
          <Divider orientation='v' size='md' />
          <Divider orientation='v' size='lg' />
          <Divider orientation='v' size='xl' />
        </Stack>

        <H2>Tonality</H2>
        <P>Type: normal</P>
        <Flex orientation='h'>
          <Text color='current'>Highlight</Text>
          <Separator orientation='v' tone='highlight' size='lg' />
          <Text color='current'>Highlight</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Primary</Text>
          <Separator orientation='v' tone='primary' size='lg' />
          <Text color='current'>Primary</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Critical</Text>
          <Separator orientation='v' tone='critical' size='lg' />
          <Text color='current'>Critical</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Neutral</Text>
          <Separator orientation='v' tone='neutral' size='lg' />
          <Text color='current'>Neutral</Text>
        </Flex>
        <Spacer />
        <P>Type: strong</P>
        <Flex orientation='h'>
          <Text color='current'>Highlight</Text>
          <Separator orientation='v' tone='highlight' type='strong' size='lg' />
          <Text color='current'>Highlight</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Primary</Text>
          <Separator orientation='v' tone='primary' type='strong' size='lg' />
          <Text color='current'>Primary</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Critical</Text>
          <Separator orientation='v' tone='critical' type='strong' size='lg' />
          <Text color='current'>Critical</Text>
        </Flex>
        <Flex orientation='h'>
          <Text color='current'>Neutral</Text>
          <Separator orientation='v' tone='neutral' type='strong' size='lg' />
          <Text color='current'>Neutral</Text>
        </Flex>

        <H2>Transparent</H2>
        <P>Semi-transparent styling with some visual depth.</P>
        <Flex
          orientation='v'
          css={{
            p: '$4',
            br: '$3',
            color: '$white',
            background:
              'linear-gradient(330deg, hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)',
          }}>
          <Text color='current'>Top</Text>
          <Separator orientation='h' type='transparent' size='lg' />
          <Text color='current'>Bottom</Text>
          <Spacer gap='lg' />
          <Flex orientation='h'>
            <Text color='current'>Top</Text>
            <Separator orientation='v' type='transparent' size='lg' />
            <Text color='current'>Bottom</Text>
          </Flex>
        </Flex>
        <Spacer />
        <Flex orientation='h'>
          <Text color='current'>Left</Text>
          <Separator orientation='v' type='transparent' size='lg' />
          <Text color='current'>Right</Text>
        </Flex>

        <H2>Size collapse</H2>
        <P>
          Need to make sure that the spacing applies by the separator does not
          collapse due to flex behaviour.
        </P>
        <Flex orientation='h' css={{maxWidth: 300}}>
          <Text>Left</Text>
          <Separator orientation='v' type='strong' size='xl' />
          <Text>
            Some long text that will overlap and wrap around and push the flex
            sizing around
          </Text>
        </Flex>

        <Spacer gap='xl' />

        <div
          style={{
            width: 200,
            paddingTop: 40,
            borderBottom: '1px solid red',
            backgroundColor: 'cornsilk',
          }}
        />
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function Divider({
  size = 'md',
  orientation = 'v',
  tone = 'neutral',
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'h' | 'v'
  tone?: 'highlight' | 'primary' | 'critical' | 'neutral'
}) {
  return (
    <Flex orientation={orientation === 'h' ? 'v' : 'h'}>
      <Text
        css={{
          width: orientation === 'v' ? '30px' : 'auto',
          backgroundColor: '$bg6',
        }}>
        {size}
      </Text>
      <Separator orientation={orientation} size={size} tone={tone} />
      <Text
        css={{
          width: orientation === 'v' ? '30px' : 'auto',
          backgroundColor: '$bg6',
        }}>
        {size}
      </Text>
    </Flex>
  )
}
