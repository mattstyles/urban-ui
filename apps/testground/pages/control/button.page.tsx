import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {Absolute} from '@urban-ui/absolute'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Stack} from '@urban-ui/stack'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Center} from '@urban-ui/center'
import {Button} from '@urban-ui/button'
import {Box} from '@urban-ui/box'
import {styled} from '@urban-ui/theme'
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
            <Button round onClick={onClick('round')}>
              Rounded / Pill
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
          <Stack orientation='h'>
            <Button>
              <StitchesLogoIcon />
            </Button>
            <Button type='transparent'>
              <Center css={{color: '$primary12'}}>
                <StitchesLogoIcon color='currentcolor' />
              </Center>
            </Button>
            <Button square>
              <StitchesLogoIcon />
            </Button>
            <Button square round>
              <StitchesLogoIcon />
            </Button>
          </Stack>
          <Stack orientation='h'>
            <CustomButton type='transparent'>Custom button</CustomButton>
            <CustomButton type='secondary'>Custom button</CustomButton>
          </Stack>
          <Stack orientation='h' justify='end'>
            <Button tone='neutral' type='ghost'>
              Cancel
            </Button>
            <Button tone='critical' type='solid'>
              Delete
            </Button>
            <button>browser styled button</button>
          </Stack>
        </Stack>
        <H2>Tonality</H2>
        <P>Each button type can have a different tonality applied to it</P>
        <Stack>
          <TonalVariants tone='primary' />
          <TonalVariants tone='critical' />
          <TonalVariants tone='neutral' />
        </Stack>
        <H2>Width</H2>
        <P>Sets a minimum width for the button</P>
        <Stack orientation='h'>
          <Button width='sm'>sm</Button>
          <Button width='md'>md</Button>
          <Button width='lg'>lg</Button>
        </Stack>
        <H2>Sizes</H2>
        <P>
          Sets a minimum height for the button. Will increase size on touch
          devices.
        </P>
        <Stack orientation='h'>
          <Button size='sm'>sm</Button>
          <Button size='md'>md</Button>
          <Button size='lg'>lg</Button>
          <Button size='sm' round square>
            <StitchesLogoIcon />
          </Button>
          <Button size='md' round square>
            <StitchesLogoIcon />
          </Button>
          <Button size='lg' round square>
            <StitchesLogoIcon />
          </Button>
        </Stack>
        <H2>Wrapping</H2>
        <P>
          Default is no-wrap. Use <Text type='mono'>wrap</Text> prop to alter.
        </P>
        <Box css={{p: '$3', background: '$bg10', width: '320px'}}>
          <Button>Will wrap the button if there is enough text to wrap.</Button>
          <Spacer size='sm' />
          <Button>
            Will wrapping. Container will shrink, but will not grow in height.
          </Button>
          <Spacer size='sm' />
          <Box css={{width: '100%'}}>
            <Button fill>
              Wrap and fill. Button will fit its container, allowing multi-line
              buttons.
            </Button>
          </Box>
        </Box>
        <H2>Other clickables</H2>
        <P>
          Sometimes you want other elements to be clickable and labelled up
          correctly as a button.
        </P>
        <Button fill type='clear' onClick={onClick('Clear type')}>
          <Center
            css={{width: 400, maxWidth: '100%', aspectRatio: '4 / 3'}}
            justify='center'
            alignment='center'>
            <Absolute fit>
              <img
                alt='Randomly selected picture of a set width to demonstrate behaviour when content is wider than the main column width'
                src='https://picsum.photos/400/300'
                style={{width: '100%', aspectRatio: '4 / 3'}}
              />
            </Absolute>
            <Absolute
              fit
              css={{
                background: 'radial-gradient($blackA4, $blackA11)',
                zIndex: 10,
                transition: 'inset 150ms linear',
                '&:hover': {inset: 10},
              }}
            />
            <Box css={{zIndex: 1000}}>
              <Heading color='inverse'>Type = clear</Heading>
            </Box>
          </Center>
        </Button>
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
      <Stack orientation='h' collapse>
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

const CustomButton = styled(Button, {
  backgroundColor: 'rebeccapurple',
  color: 'white',
})
