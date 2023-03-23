import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Text, H1, P} from '@urban-ui/text'
import {Panel} from '@urban-ui/panel'
import {Layout} from './layout'

export default function FlexPage() {
  return (
    <Container padding='md' alignment='center'>
      <Content>
        <H1>Panel</H1>
        <P>
          Panel is a floating layout component. It can be placed anywhere in the
          render tree but will be in a fixed position on the screen.
        </P>
        <Panel top right css={{background: '$bg2', padding: '$md'}}>
          <Stack gap='md'>
            <Text>Panel</Text>
            <Text>Positioned top right</Text>
            <Text>No gap</Text>
            <Spacer gap='sm' />
            <Flex alignment='center' justify='center'>
              <Flex css={{size: '$6'}}>
                <StitchesLogoIcon width='100%' height='100%' />
              </Flex>
            </Flex>
          </Stack>
        </Panel>
        <Panel bottom right gap='md' css={{background: '$bg2', padding: '$md'}}>
          <Stack gap='md'>
            <Text>Panel</Text>
            <Text>Positioned top right</Text>
            <Text>No gap</Text>
            <Spacer gap='sm' />
            <Flex alignment='center' justify='center'>
              <Flex css={{size: '$6'}}>
                <StitchesLogoIcon width='100%' height='100%' />
              </Flex>
            </Flex>
          </Stack>
        </Panel>
      </Content>
    </Container>
  )
}

FlexPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
