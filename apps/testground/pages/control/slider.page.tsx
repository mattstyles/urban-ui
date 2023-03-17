import {
  OpacityIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'

import {Container, Stack, Icon, Spacer} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import * as Slider from '@urban-ui/slider'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Slider</H2>

        <form>
          <Stack>
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a1'>
                Default
              </Text>
              <Slider.Root
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label='Volume'>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb id='a1' />
              </Slider.Root>
            </Stack>
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a2'>
                Thumb space prop
              </Text>
              <Slider.Root
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label='Volume'>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb space={true} />
              </Slider.Root>
            </Stack>
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a2'>
                Full width
              </Text>
              <Slider.Root
                width='full'
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label='Volume'>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb space={true} />
              </Slider.Root>
            </Stack>
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a2'>
                With icon
              </Text>
              <Slider.Root
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label='Volume'>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb type='clear'>
                  <Icon>
                    <OpacityIcon width='100%' height='100%' />
                  </Icon>
                </Slider.Thumb>
              </Slider.Root>
            </Stack>
            <Spacer />
            <Stack orientation='v' alignment='start' gap='sm'>
              <Text as='label' htmlFor='a2'>
                Range. Use multiple thumb components.
              </Text>
              <Slider.Root
                width='full'
                defaultValue={[25, 75]}
                step={10}
                minStepsBetweenThumbs={1}
                aria-label='Volume'>
                <Slider.Track>
                  <Slider.Range tone='neutral' />
                </Slider.Track>
                <Slider.Thumb type='clear'>
                  <Icon>
                    <ChevronLeftIcon width='100%' height='100%' />
                  </Icon>
                </Slider.Thumb>
                <Slider.Thumb type='clear'>
                  <Icon>
                    <ChevronRightIcon width='100%' height='100%' />
                  </Icon>
                </Slider.Thumb>
              </Slider.Root>
            </Stack>
            <Spacer />
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a2'>
                Disabled
              </Text>
              <Slider.Root
                disabled
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
            <Stack orientation='h' alignment='center' gap='lg'>
              <Text as='label' htmlFor='a2'>
                Fat track
              </Text>
              <Slider.Root
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label='Volume'>
                <Slider.Track size='md'>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Root>
            </Stack>
          </Stack>
        </form>
        <H2>Size</H2>
        <Slider.Root
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label='Volume'
          size='sm'>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb size='sm' />
        </Slider.Root>
        <Slider.Root
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label='Volume'
          size='md'>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb size='md' />
        </Slider.Root>
        <Slider.Root
          defaultValue={[50]}
          max={100}
          step={1}
          aria-label='Volume'
          size='lg'>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb size='lg' />
        </Slider.Root>
        <H2>Tonality</H2>
        <P>Range and thumb tones</P>
        <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
          <Slider.Track>
            <Slider.Range tone='highlight' />
          </Slider.Track>
          <Slider.Thumb tone='highlight' />
        </Slider.Root>
        <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
          <Slider.Track>
            <Slider.Range tone='primary' />
          </Slider.Track>
          <Slider.Thumb tone='primary' />
        </Slider.Root>
        <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
          <Slider.Track>
            <Slider.Range tone='critical' />
          </Slider.Track>
          <Slider.Thumb tone='critical' />
        </Slider.Root>
        <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
          <Slider.Track>
            <Slider.Range tone='neutral' />
          </Slider.Track>
          <Slider.Thumb tone='neutral' />
        </Slider.Root>
        <P>With track tone</P>
        <Slider.Root defaultValue={[30]} max={100} step={1} aria-label='Volume'>
          <Slider.Track tone='highlight'>
            <Slider.Range tone='highlight' />
          </Slider.Track>
          <Slider.Thumb tone='highlight' />
        </Slider.Root>
        <Slider.Root defaultValue={[40]} max={100} step={1} aria-label='Volume'>
          <Slider.Track tone='primary'>
            <Slider.Range tone='primary' />
          </Slider.Track>
          <Slider.Thumb tone='primary' />
        </Slider.Root>
        <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
          <Slider.Track tone='critical'>
            <Slider.Range tone='critical' />
          </Slider.Track>
          <Slider.Thumb tone='critical' />
        </Slider.Root>
        <Slider.Root defaultValue={[60]} max={100} step={1} aria-label='Volume'>
          <Slider.Track tone='neutral'>
            <Slider.Range tone='neutral' />
          </Slider.Track>
          <Slider.Thumb tone='neutral' />
        </Slider.Root>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
