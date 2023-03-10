import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Stack} from '@urban-ui/stack'
import {Text, H1, H2, H3, P} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
import {Box} from '@urban-ui/box'
import {Layout} from './layout'

export default function ButtonPage() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Buttons</H2>
        <Stack>
          <Stack>
            <Button onClick={onClick('Default')}>Default</Button>
            <Button disabled onClick={onClick('Disabled')}>
              Disabled
            </Button>
            <Button>
              <Text size='xl' color='currentcolor'>
                Larger text
              </Text>
            </Button>
            <Button>
              <StitchesLogoIcon />
              <Spacer orientation='h' size='xs' />
              With logo
            </Button>
            <Button as='a' href='#' type='transparent'>
              As an anchor link
            </Button>
          </Stack>
          <Stack orientation='h' justify='end'>
            <Button tone='neutral' type='ghost'>
              Cancel
            </Button>
            <Button tone='critical' type='solid'>
              Delete
            </Button>
            <button>default</button>
          </Stack>
        </Stack>
        <H2>Tonality</H2>
        <P>Each button type can have a different tonality applied to it</P>
        <Stack>
          <TonalVariants tone='primary' />
          <TonalVariants tone='critical' />
          <TonalVariants tone='neutral' />
        </Stack>
        <H2>Wrapping</H2>
        <P>
          Default is no-wrap. Use <Text type='mono'>wrap</Text> prop to alter.
        </P>
        <Box css={{p: '$3', background: '$bg10', width: '320px'}}>
          <Button>No wrapping. Text will break out of the container.</Button>
          <Spacer size='sm' />
          <Button wrap>
            Will wrapping. Container will shrink, but will not grow in height.
          </Button>
          <Spacer size='sm' />
          <Box css={{width: '100%'}}>
            <Button wrap fill>
              Wrap and fill. Button will fit its container, allowing multi-line
              buttons.
            </Button>
          </Box>
        </Box>
      </Content>
    </Container>
  )
}

ButtonPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function onClick(
  cb: string | ((event: React.MouseEvent<HTMLButtonElement>) => void)
) {
  return function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (typeof cb === 'string') {
      console.log(cb)
      return
    }

    cb(event)
  }
}

function TonalVariants({
  tone,
  orientation = 'v',
}: {
  tone: 'primary' | 'critical' | 'neutral'
  orientation?: 'h' | 'v'
}) {
  return (
    <Flex orientation={orientation}>
      <H3>{tone}</H3>
      <Stack orientation='h'>
        <Button tone={tone} type='solid' onClick={onClick(`${tone} solid`)}>
          {`${tone} solid`}
        </Button>
        <Button
          tone={tone}
          type='transparent'
          onClick={onClick(`${tone} transparent`)}>
          {`${tone} transparent`}
        </Button>
        <Button tone={tone} type='outline' onClick={onClick(`${tone} outline`)}>
          {`${tone} outline`}
        </Button>
        <Button tone={tone} type='ghost' onClick={onClick(`${tone} ghost`)}>
          {`${tone} ghost`}
        </Button>
        <Button
          tone={tone}
          type='emphasis'
          onClick={onClick(`${tone} emphasis`)}>
          {`${tone} emphasis`}
        </Button>
      </Stack>
    </Flex>
  )
}
