'use client'

import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Flex orientation='v' gap='md'>
        <p>Solid</p>
        <Button>Default</Button>
        <Button tone='primary'>Primary</Button>
        <Button tone='neutral'>Neutral</Button>
      </Flex>
      <Flex orientation='v' gap='md'>
        <p>Ghost</p>
        <Button variant='ghost' tone='primary'>
          Primary
        </Button>
        <Button variant='ghost' tone='neutral'>
          Neutral
        </Button>
      </Flex>
      <Flex orientation='v' gap='md'>
        <p>Transparent</p>
        <Button variant='transparent' tone='primary'>
          Primary
        </Button>
        <Button variant='transparent' tone='neutral'>
          Neutral
        </Button>
      </Flex>
      <Flex orientation='v' gap='md'>
        <p>Outline</p>
        <Button variant='outline' tone='primary'>
          Primary
        </Button>
        <Button variant='outline' tone='neutral'>
          Neutral
        </Button>
      </Flex>
    </Flex>
  )
}
