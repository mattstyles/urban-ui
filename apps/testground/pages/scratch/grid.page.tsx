import type {ApplicationInstance} from 'sketch-react-app'

import {CheckIcon, StitchesLogoIcon} from '@radix-ui/react-icons'
import {useEffect} from 'react'
import {SketchProvider, SketchAttachment, useSketchApp} from 'sketch-react-app'
import {
  Screen,
  Container,
  Absolute,
  Box,
  Spacer,
  Stack,
  Icon,
} from '@urban-ui/layout'
import {Button, Input, Checkbox, Switch} from '@urban-ui/control'
import {Text} from '@urban-ui/text'
import {Separator} from '@urban-ui/separator'
import {Layout} from './layout'

export default function Page() {
  return (
    <SketchProvider>
      <Screen css={{position: 'relative'}}>
        <Absolute fit>
          <Sketch />
        </Absolute>
        <Container css={{'*': {boxShadow: '0 0 0px 1px red inset'}}}>
          <Box css={{size: 80, backgroundColor: 'rebeccapurple'}} />
          <Text size='xs'>xs 16</Text>
          <Text size='sm'>sm 16</Text>
          <Text>Text default height 20</Text>
          <Text>2x default height aligns</Text>
          <Text size='lg'>lg 24</Text>
          <Text size='xl'>lg 32</Text>
          <Text size='lg'>Spacers</Text>
          <Spacer gap='md' />
          <Spacer gap='lg' />
          <Spacer gap='sm' />
          <Text size='lg'>Controls</Text>
          <Stack orientation='h'>
            <Button size='sm'>Sm 32</Button>
            <Button>Default height 40</Button>
            <Button size='lg'>Lg 48</Button>
          </Stack>
          <Stack orientation='h'>
            <Input size='sm' value='Sm 32' />
            <Input value='Default 40' />
            <Input size='lg' value='Lg 48' />
          </Stack>
          <Stack orientation='h' alignment='start' gap='lg'>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root size='sm'>
                <Checkbox.Indicator size='sm'>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label'>Sm 32</Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root>
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label'>Default 40</Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Checkbox.Root size='lg'>
                <Checkbox.Indicator size='lg'>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Text as='label'>Lg 48</Text>
            </Stack>
          </Stack>
          <Stack orientation='h' alignment='start' gap='lg'>
            <Stack orientation='h' alignment='center'>
              <Switch.Root id='c1' size='sm'>
                <Switch.Thumb size='sm' />
              </Switch.Root>
              <Text as='label' htmlFor='c1'>
                Sm
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Switch.Root id='c2' size='md'>
                <Switch.Thumb size='md' />
              </Switch.Root>
              <Text as='label' htmlFor='c2'>
                Md
              </Text>
            </Stack>
            <Stack orientation='h' alignment='center'>
              <Switch.Root id='c3' size='lg'>
                <Switch.Thumb size='lg' />
              </Switch.Root>
              <Text as='label' htmlFor='c3'>
                Lg
              </Text>
            </Stack>
          </Stack>
          <Text size='lg'>Icon sizes</Text>
          <Stack orientation='h'>
            <Icon size='sm'>
              <StitchesLogoIcon width='100%' height='100%' />
            </Icon>
            <Icon size='md'>
              <StitchesLogoIcon width='100%' height='100%' />
            </Icon>
            <Icon size='lg'>
              <StitchesLogoIcon width='100%' height='100%' />
            </Icon>
          </Stack>
          <Text size='lg'>Separators</Text>
          <Separator size='xs' />
          <Separator size='sm' />
          <Separator size='md' />
          <Separator size='lg' />
          <Separator size='xl' />
        </Container>
      </Screen>
    </SketchProvider>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function Sketch() {
  const app = useSketchApp()
  useEffect(() => {
    if (app == null) {
      return
    }

    renderGrid(app)
  }, [app])
  return <SketchAttachment />
}

const gridSize = 8
function renderGrid(app: ApplicationInstance) {
  let y = 0
  while (y < app.canvas.height) {
    app.ctx.beginPath()
    app.ctx.strokeStyle = Number.isInteger(y / 32)
      ? 'rgb(160, 160, 160)'
      : 'rgb(200, 200, 200)'
    app.ctx.moveTo(0, y)
    app.ctx.lineTo(app.canvas.width, y)
    app.ctx.stroke()
    y = y + 8 * window.devicePixelRatio
  }
}
