'use client'

import * as React from 'react'
import type {ButtonProps} from '@urban-ui/button'

// import Link from 'next/link.js'
import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'
import {ButtonGroup} from '@urban-ui/button-group'
import {Text} from '@urban-ui/text'
import {SearchIcon, CheckIcon} from '@urban-ui/icons'
import {custom, customTextStyle} from './content.css.ts'
import {atoms} from '@urban-ui/theme/atoms'

// Nodenext module resolution hack @see https://github.com/vercel/next.js/discussions/41189#discussioncomment-4026895
import _x from 'next/link.js'
const Link = _x as unknown as typeof _x.default

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Default</Text>
        <Flex gap='md'>
          <Button tabIndex={0}>Default</Button>
          <Button isDisabled>Disabled</Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Solid</Text>
        <Flex gap='md'>
          {tones.map((tone) => {
            return (
              <Button key={tone} tone={tone}>
                {cap(tone as string)}
              </Button>
            )
          })}
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Ghost</Text>
        <Flex gap='md'>
          {tones.map((tone) => {
            return (
              <Button key={tone} variant='ghost' tone={tone}>
                {cap(tone as string)}
              </Button>
            )
          })}
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Transparent</Text>
        <Flex gap='md'>
          {tones.map((tone) => {
            return (
              <Button key={tone} variant='transparent' tone={tone}>
                {cap(tone as string)}
              </Button>
            )
          })}
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Outline</Text>
        <Flex gap='md'>
          {tones.map((tone) => {
            return (
              <Button key={tone} variant='outline' tone={tone}>
                {cap(tone as string)}
              </Button>
            )
          })}
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Foreground</Text>
        <Flex gap='md'>
          {tones.map((tone) => {
            return (
              <Button key={tone} variant='foreground' tone={tone}>
                {cap(tone as string)}
              </Button>
            )
          })}
        </Flex>
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
        <Text size='xl'>Effects</Text>
        <Flex alignment='center' gap='md'>
          <Button effect='scale'>Scale</Button>
          <Button effect='scale' variant='outline'>
            Scale
          </Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='xl'>Anatomy overwrites</Text>
        <Flex gap='md' className={custom}>
          <Button>From parent</Button>
          <Button variant='outline'>Outline variant wins</Button>
        </Flex>
        <Flex gap='md'>
          <Button className={customTextStyle}>Big text</Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='xl'>Link</Text>
        <Flex alignment='center' gap='md'>
          <Button asChild>
            <Link href='/dev/type'>Button as Link</Link>
          </Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='xl'>Icon</Text>
        <Button icon radii='circular' size='lg'>
          <SearchIcon size='lg' />
        </Button>
        <Button size='lg'>
          <Flex gap='sm' alignment='center'>
            <SearchIcon size='lg' />
            <Text>With icon</Text>
          </Flex>
        </Button>
        <Flex style={{height: 60, width: 60, background: 'gainsboro'}}>
          <Button icon fill radii='circular'>
            <CheckIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='xl' weight='semibold'>
          Button group
        </Text>
        <ButtonGroup isWrap>
          <Button>Foo</Button>
          <Button>Bar</Button>
          <Button>Baz</Button>
        </ButtonGroup>
        <ButtonGroup orientation='v'>
          <Button variant='ghost'>Foo</Button>
          <Button variant='ghost'>Bar</Button>
          <Button variant='ghost'>Baz</Button>
        </ButtonGroup>
        <Text>Tabbable group:</Text>
        <ButtonGroup isWrap isTabbable>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
          <Button>Four</Button>
          <Button>Five</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

const tones: Array<ButtonProps['tone']> = ['primary', 'neutral', 'critical']

function cap(str: string) {
  return str.replace(/^./, (char) => char.toUpperCase())
}
