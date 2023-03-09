import {useMemo, useState} from 'react'

import {Text} from '@urban-ui/text'
import {Container} from '@urban-ui/container'
import {Stack} from '@urban-ui/stack'
import * as Scrollable from '@urban-ui/scrollable'

import {Layout} from './layout'

export default function Page() {
  const [numItems, setNumItems] = useState<number>(4)
  return (
    <Container padding='lg' css={{backgroundColor: '$bg2'}}>
      <Stack size='lg'>
        <Stack>
          <Text>Standard scroll area with defaults</Text>
          <Container
            css={{backgroundColor: '$bg1', width: '200px', height: '250px'}}>
            <Scrollable.Root>
              <Scrollable.Viewport>
                <Content />
              </Scrollable.Viewport>
              <Scrollable.Scrollbar>
                <Scrollable.Thumb />
              </Scrollable.Scrollbar>
            </Scrollable.Root>
          </Container>
        </Stack>
        <Stack>
          <Text>Rounded corners and colourised background</Text>
          <Container
            css={{
              backgroundColor: '$bg1',
              width: '200px',
              height: '250px',
              borderRadius: '$2',
              overflow: 'hidden',
            }}>
            <Scrollable.Root>
              <Scrollable.Viewport>
                <Container css={{backgroundColor: '$primary3'}}>
                  <Content />
                </Container>
              </Scrollable.Viewport>
              <Scrollable.Scrollbar>
                <Scrollable.Thumb />
              </Scrollable.Scrollbar>
            </Scrollable.Root>
          </Container>
        </Stack>
        <Stack>
          <Text>Type (inherits from radix-ui/scrollarea)</Text>
          <Text>'Auto' will only appear when the item is scrollable</Text>
          <Text>Also note that the container will not be full height</Text>
          <Stack orientation='h'>
            <button
              onClick={() => {
                setNumItems(numItems + 1)
              }}>
              Add
            </button>
            <button
              onClick={() => {
                setNumItems(numItems - 1)
              }}>
              Remove
            </button>
          </Stack>
          <Container
            css={{backgroundColor: '$bg1', width: '200px', height: '250px'}}>
            <Scrollable.Root round type='auto'>
              <Scrollable.Viewport>
                <Container css={{backgroundColor: '$primary3'}} fill='v'>
                  <Content num={numItems} />
                </Container>
              </Scrollable.Viewport>
              <Scrollable.Scrollbar>
                <Scrollable.Thumb />
              </Scrollable.Scrollbar>
            </Scrollable.Root>
          </Container>
        </Stack>
      </Stack>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

function Content({
  pre = 'v1.2.0-alpha',
  num = 44,
}: {
  pre?: string
  num?: number
}) {
  const content = useMemo(() => {
    return Array.from({length: num})
      .map((_, idx) => `${pre}${idx}`)
      .map((v) => {
        return (
          <Container
            key={v}
            padding='md'
            css={{'&:hover': {backgroundColor: '$primary3'}}}>
            <Text>{v}</Text>
          </Container>
        )
      })
  }, [pre, num])

  return <>{content}</>
}
