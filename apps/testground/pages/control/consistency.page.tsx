import {CheckIcon} from '@radix-ui/react-icons'

import {Container, Stack, Spacer, Flex} from '@urban-ui/layout'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import {Content} from '@urban-ui/content'
import {Button, Checkbox, Input} from '@urban-ui/control'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Consistency</H2>
        <P>
          Urban-ui control components are all designed to look and feel like a
          cohesive set of components. They share sizing and tone where possible.
        </P>
        <Stack gap='lg' css={{width: 400}}>
          <Stack orientation='h' alignment='center'>
            <Checkbox.Root id='a1' tone='neutral'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='a1'>
              Neutral tone checkbox
            </Text>
          </Stack>
          <Button tone='neutral'>Neutral tone button</Button>
          <Input tone='neutral' placeholder='Neutral tone input' />
        </Stack>
        <Spacer size='xl' />
        <H2>Width</H2>
        <P>Components can fit their containers using the same prop.</P>
        <Stack gap='lg'>
          <Stack orientation='h' alignment='center'>
            <Checkbox.Root id='b1' tone='neutral'>
              <Checkbox.Indicator>
                <CheckIcon width='100%' height='100%' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Text as='label' htmlFor='b1'>
              Checkboxes have an inherent width, they will stay the same
              specified width. It does not make sense for them to fill the size.
            </Text>
          </Stack>
          <Button tone='neutral' width='full'>
            Neutral tone button
          </Button>
          <Input tone='neutral' placeholder='Neutral tone input' width='full' />
        </Stack>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
