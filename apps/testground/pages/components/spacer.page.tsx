import {
  StitchesLogoIcon,
  GitHubLogoIcon,
  FigmaLogoIcon,
} from '@radix-ui/react-icons'

import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Stack} from '@urban-ui/stack'
import {Spacer} from '@urban-ui/spacer'
import {Flex} from '@urban-ui/flex'
import {Text, H1, P} from '@urban-ui/text'

import {Layout} from './layout'

export default function SpacerPage() {
  return (
    <Container padding='md' alignment='center'>
      <Content>
        <H1>Spacer</H1>
        <P>Default is horizontal spacing</P>
        <Spacer gap='lg' />
        <StitchesLogoIcon />
        <Spacer gap='md' />
        <GitHubLogoIcon />
        <Spacer gap='sm' />
        <FigmaLogoIcon />
        <Spacer gap='md' />
        <P>Also works horizontally</P>
        <Flex>
          <StitchesLogoIcon />
          <Spacer orientation='h' gap='xs' />
          <Text>xs</Text>
        </Flex>
        <Flex>
          <StitchesLogoIcon />
          <Spacer orientation='h' gap='lg' />
          <Text>lg</Text>
        </Flex>
        <P>Scale xs, sm, md, lg, xl</P>
        <Stack orientation='h' gap='md'>
          <Spacer
            orientation='h'
            gap='xs'
            css={{background: '$primary10', height: '$xl'}}
          />
          <Spacer
            orientation='h'
            gap='sm'
            css={{background: '$primary10', height: '$xl'}}
          />
          <Spacer
            orientation='h'
            gap='md'
            css={{background: '$primary10', height: '$xl'}}
          />
          <Spacer
            orientation='h'
            gap='lg'
            css={{background: '$primary10', height: '$xl'}}
          />
          <Spacer
            orientation='h'
            gap='xl'
            css={{background: '$primary10', height: '$xl'}}
          />
        </Stack>
      </Content>
    </Container>
  )
}

SpacerPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
