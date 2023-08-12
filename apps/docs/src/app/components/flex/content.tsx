'use client'

import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {atoms} from '@urban-ui/theme/atoms'

export function Content() {
  return (
    <Flex orientation='v'>
      <Flex alignment='center' orientation='h' gap='sm' justify='spread'>
        <h1>Hello world</h1>
        <span>!!</span>
      </Flex>
      <Flex orientation='v' gap='sm'>
        <h1>Hello world</h1>
        <span>!!</span>
      </Flex>
      <Flex>
        <span>Hello</span>
        <Spacer orientation='h' gap='lg' />
        <span>world</span>
      </Flex>
      <Flex orientation='v'>
        <span>Hello</span>
        <Spacer orientation='v' gap='lg' />
        <span>world</span>
      </Flex>
      <Flex gap='md' flex='auto' style={{backgroundColor: 'cornsilk'}}>
        <div
          style={{
            width: 56,
            height: 64,
            backgroundColor: 'hotpink',
          }}
          className={atoms({
            flex: 'none',
          })}></div>
        <Flex
          style={{
            width: 256,
            height: 64,
            backgroundColor: 'hotpink',
          }}
          flex='auto'></Flex>
        <Flex
          style={{
            width: 128,
            height: 64,
            backgroundColor: 'hotpink',
          }}
          flex='auto'></Flex>
      </Flex>
    </Flex>
  )
}
