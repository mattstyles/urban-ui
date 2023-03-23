import {CheckIcon, ChevronDownIcon} from '@radix-ui/react-icons'

import {Container, Stack, Spacer} from '@urban-ui/layout'
import {Text, H2, P} from '@urban-ui/text'
import {Content} from '@urban-ui/content'
import {
  Button,
  Checkbox,
  Input,
  Switch,
  Radio,
  Slider,
  Select,
} from '@urban-ui/control'
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
        <Stack gap='lg'>
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
          <Stack orientation='h' alignment='center'>
            <Switch.Root id='a2' tone='neutral'>
              <Switch.Thumb />
            </Switch.Root>
            <Text as='label' htmlFor='a2'>
              Neutral tone switch
            </Text>
          </Stack>
          <Button tone='neutral'>Neutral tone button</Button>
          <Input tone='neutral' placeholder='Neutral tone input' />
          <Radio.Root defaultValue='one' orientation='h' gap='xl'>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='one' id='r1'>
                <Radio.Indicator>
                  <Radio.Dot />
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='r1'>
                Neutral
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='two' id='r2'>
                <Radio.Indicator>
                  <Radio.Dot />
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='r2'>
                Radio
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Radio.Item value='three' id='r3'>
                <Radio.Indicator>
                  <Radio.Dot />
                </Radio.Indicator>
              </Radio.Item>
              <Text as='label' htmlFor='r3'>
                Group
              </Text>
            </Stack>
          </Radio.Root>
          <Slider.Root
            defaultValue={[50]}
            max={100}
            step={1}
            aria-label='Volume'>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Root>
        </Stack>
        <Spacer gap='xl' />
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
          <Stack orientation='h' alignment='center' gap='lg'>
            <Text as='label' htmlFor='b2'>
              Label:
            </Text>
            <Input
              id='b2'
              tone='neutral'
              placeholder='Neutral tone input'
              width='full'
            />
          </Stack>
          <Input tone='neutral' placeholder='Neutral tone input' width='full' />
          <Slider.Root
            width='full'
            defaultValue={[50]}
            max={100}
            step={1}
            aria-label='Volume'>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Root>
          <Select.Root>
            <Select.Trigger aria-label='Tones' size='md' width='full'>
              <Select.Value placeholder='Select…' />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.Viewport>
                  <Select.Item value='one'>
                    <Select.ItemText>One</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item value='two'>
                    <Select.ItemText>Two</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Stack>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
