import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons'
import * as React from 'react'
import {useState} from 'react'

import {Container, Stack, Icon, Spacer} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import * as Select from '@urban-ui/select'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Select</H2>

        <Stack>
          <form>
            <Select.Root>
              <Select.Trigger aria-label='Food' size='md'>
                <Select.Value placeholder='Select a fruit…' />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.ScrollUpButton>
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport>
                    <Select.Group>
                      <Select.Label>Fruits</Select.Label>
                      <Item value='apple'>Apple</Item>
                      <Item value='banana'>Banana</Item>
                      <Item value='blueberry'>Blueberry</Item>
                      <Item value='grapes'>Grapes</Item>
                      <Item value='pineapple'>Pineapple</Item>
                    </Select.Group>

                    <Select.Separator />

                    <Select.Group>
                      <Select.Label>Vegetables</Select.Label>
                      <Item value='aubergine'>Aubergine</Item>
                      <Item value='broccoli'>Broccoli</Item>
                      <Item value='carrot' disabled>
                        Carrot
                      </Item>
                      <Item value='courgette'>Courgette</Item>
                      <Item value='leek'>Leek</Item>
                    </Select.Group>

                    <Select.Separator />

                    <Select.Group>
                      <Select.Label>Meat</Select.Label>
                      <Item value='beef'>Beef</Item>
                      <Item value='chicken'>Chicken</Item>
                      <Item value='lamb'>Lamb</Item>
                      <Item value='pork'>Pork</Item>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton>
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </form>

          <Tone />
          <IndicatorOnly />
          <Popper />
        </Stack>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Select.Item> & {as?: string; href?: string}
>(({children, ...props}, forwardedRef) => {
  return (
    <Select.Item {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  )
})

function Tone() {
  const [tone, setTone] = useState('neutral')

  return (
    <form>
      <Stack orientation='h' alignment='center'>
        <Text as='label' htmlFor='a1'>
          Tonality
        </Text>
        <Select.Root value={tone} onValueChange={setTone}>
          <Select.Trigger id='a1' aria-label='Tones' size='md' tone={tone}>
            <Select.Value placeholder='Select a tone…' />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Item value='primary' tone='primary'>
                  Primary
                </Item>
                <Item value='highlight' tone='highlight'>
                  Highlight
                </Item>
                <Item value='critical' tone='critical'>
                  Critical
                </Item>
                <Item value='neutral' tone='neutral'>
                  Neutral
                </Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </Stack>
    </form>
  )
}

function IndicatorOnly() {
  return (
    <Stack>
      <div>
        <H2>Indicator</H2>
        <P>
          To indicate the selected status you can specify between using an icon
          and using only background colour (or both).
        </P>
      </div>
      <form>
        <Stack orientation='h' alignment='center'>
          <Text as='label' htmlFor='b1'>
            Indicator
          </Text>
          <Select.Root>
            <Select.Trigger id='b1' aria-label='Tones' size='md' tone='primary'>
              <Select.Value placeholder='Indicator…' />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.ScrollUpButton>
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  <Item value='primary' tone='primary' indicatorBackground>
                    With background indicator
                  </Item>
                  <Item value='highlight' tone='primary'>
                    With icon only indicator
                  </Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Stack>
      </form>
    </Stack>
  )
}

function Popper() {
  return (
    <Stack>
      <div>
        <H2>Popper</H2>
        <P>
          Content <Text type='mono'>position: popper</Text> prop will be
          forwarded to allow the same customisation as radix-ui allows.
        </P>
      </div>
      <form>
        <Stack orientation='h' alignment='center'>
          <Text as='label' htmlFor='c1'>
            Popper
          </Text>
          <Select.Root>
            <Select.Trigger id='c1' aria-label='Tones' size='md' tone='primary'>
              <Select.Value placeholder='Names…' />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position='popper' sideOffset={6}>
                <Select.ScrollUpButton>
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  <Item value='amy' tone='primary'>
                    Amy
                  </Item>
                  <Item value='benito' tone='primary'>
                    Benito
                  </Item>
                  <Item value='colin' tone='primary'>
                    Colin
                  </Item>
                  <Item value='davina' tone='primary'>
                    Davina
                  </Item>
                </Select.Viewport>
                <Select.ScrollDownButton>
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Stack>
      </form>
    </Stack>
  )
}
