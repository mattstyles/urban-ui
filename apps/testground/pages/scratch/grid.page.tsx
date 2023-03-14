import type {ApplicationInstance} from 'sketch-react-app'

import {useEffect} from 'react'
import {SketchProvider, SketchAttachment, useSketchApp} from 'sketch-react-app'
import {Screen, Container, Absolute, Box, Spacer, Stack} from '@urban-ui/layout'
import {Text} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
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
          <Spacer size='md' />
          <Spacer size='lg' />
          <Spacer size='sm' />
          <Stack orientation='h'>
            <Button size='sm'>Sm 32</Button>
            <Button>Default height 40</Button>
            <Button size='lg'>Lg 48</Button>
          </Stack>
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
