'use client'

import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'
import {Text} from '@urban-ui/text'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Solid</Text>
        <Button>Default</Button>
        <Button tone='primary'>Primary</Button>
        <Button tone='neutral'>Neutral</Button>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Ghost</Text>
        <Button variant='ghost' tone='primary'>
          Primary
        </Button>
        <Button variant='ghost' tone='neutral'>
          Neutral
        </Button>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Transparent</Text>
        <Button variant='transparent' tone='primary'>
          Primary
        </Button>
        <Button variant='transparent' tone='neutral'>
          Neutral
        </Button>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Outline</Text>
        <Button variant='outline' tone='primary'>
          Primary
        </Button>
        <Button variant='outline' tone='neutral'>
          Neutral
        </Button>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Heights</Text>
        <Flex gap='md'>
          <Button variant='solid' tone='primary'>
            Solid
          </Button>
          <Button variant='outline' tone='primary'>
            Outline
          </Button>
        </Flex>
        <Flex gap='md' alignment='center'>
          <Button>Button text</Button>
          <Text>Text inline</Text>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Sizes</Text>
        <Flex alignment='center' gap='md'>
          <Button variant='solid' tone='primary' size='sm'>
            Small
          </Button>
          <Button variant='solid' tone='primary' size='md'>
            Medium
          </Button>
          <Button variant='solid' tone='primary' size='lg'>
            Large
          </Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text>Effects</Text>
        <Flex alignment='center' gap='md'>
          <Button effect='scale'>Scale</Button>
          <Button effect='scale' variant='outline'>
            Scale
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
