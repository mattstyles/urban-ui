import {useMemo} from 'react'
import {mapValues, mapKeys, pick} from 'lodash'
import chroma from 'chroma-js'

import {atoms} from '@urban-ui/theme/atoms'
import {theme, baseTheme} from '@urban-ui/theme'
import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {shopifyColors, Swatch} from './swatch.ts'

// Flattens the object whilst preserving path information into keys i.e. primary.border.base with the associated value
function makeFlatTone(tone: Object, name: string) {
  const output: Record<string, string> = {}

  function recurse(block: Object, path: string) {
    for (const [key, value] of Object.entries(block)) {
      const currentPath = path.length < 1 ? key : path + `.${key}`
      if (typeof value === 'object') {
        recurse(value, currentPath)
        continue
      }
      output[currentPath] = value
    }
  }

  recurse(tone, name)

  return output
}

// console.log(makeFlatTone(baseTheme.colors.primary, ''))

type ITone = typeof baseTheme.colors.base

type SwatchProps = {
  tone: ITone
}
export function Schema({tone}: SwatchProps) {
  const swatch = useToneSwatch(tone)

  const colors = mapKeys(shopifyColors, (_, key) => {
    return key.replace('--p-color-', '')
  })

  return (
    <Flex orientation='h' gap='md'>
      <Flex orientation='v' gap='none' justify='start'>
        {swatch.ordered.lightness.map((color) => {
          return (
            <Flex key={color.id} gap='sm' alignment='center'>
              <Flex style={{gap: 1}}>
                <ColorBox color={chroma.hsl(...color.hsl)} />
                <ColorBox color={chroma.hsl(...color.hsl).set('hsl.s', 0)} />
              </Flex>
              <Text size='sm' weight='semibold' kerning='sm'>
                {color.id}
              </Text>
            </Flex>
          )
        })}
      </Flex>
      <Flex style={{height: 400, gap: 1}} orientation='h'>
        <div
          style={{
            height: 800,
            width: 16,
            background: 'linear-gradient(black, white)',
          }}
        />
        <Flex
          flex='full'
          style={{width: 150}}
          className={atoms({position: 'relative'})}>
          {swatch.ordered.lightness.map((color) => {
            const y = 800 * color.hsl[2]
            return (
              <Flex
                key={color.id}
                alignment='center'
                gap='xs'
                className={atoms({position: 'absolute'})}
                style={{transform: `translateY(-50%) translateY(${y}px)`}}>
                <div style={{width: 12, height: 2, backgroundColor: 'blue'}} />
                <Text>{color.id.split('.').slice(1).join('.')}</Text>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
      <LightnessDistancing
        height={2400}
        filter=''
        colors={makeFlatTone(baseTheme.colors.base, '')}
      />
      <LightnessDistancing height={2400} filter='critical' colors={colors} />
      <LightnessDistancing height={2400} filter='info' colors={colors} />
    </Flex>
  )
}

function ColorBox({color}: {color: chroma.Color}) {
  const cssColor = color.css('hsl')
  return (
    <div className={atoms({size: 'xl'})} style={{backgroundColor: cssColor}} />
  )
}

function useToneSwatch(tone: ITone) {
  return useMemo(() => {
    const flat = makeFlatTone(tone, 'primary')
    const hsl = mapValues(flat, (value) => {
      return chroma(value).hsl()
    })

    const lightness = toObjArray(hsl).sort((a, b) => {
      return a.hsl[2] - b.hsl[2]
    })

    return {
      hsl,
      ordered: {
        lightness,
      },
    }
  }, [tone])
}

function toObjArray<T extends Object>(
  obj: T,
): Array<{id: keyof T; hsl: T[keyof T]}> {
  return Object.entries(obj).map(([key, value]) => {
    return {id: key, hsl: value} as {id: keyof T; hsl: T[keyof T]}
  })
}

function LightnessDistancing({
  height,
  width = 460,
  colors,
  filter = 'bg',
}: {
  height: number
  width?: number
  colors: Record<string, string>
  filter?: string
}) {
  const swatch = Swatch.from(colors)

  const ordered = swatch.filterBy(filter).orderBy('lightness')

  return (
    <Flex style={{height: height, width: 460, gap: 1}} orientation='h'>
      <div
        style={{
          height: height,
          width: 16,
          background: 'linear-gradient(black, white)',
        }}
      />
      <Flex flex='full' className={atoms({position: 'relative'})}>
        {Swatch.groupBy(ordered, 'lightness', 100)
          .filter((colors) => colors.length)
          .map((colors) => {
            const y = height * colors[0].value.hsl()[2]
            return (
              <Flex
                key={colors[0].key}
                alignment='center'
                gap='xs'
                className={atoms({position: 'absolute'})}
                style={{transform: `translateY(-50%) translateY(${y}px)`}}>
                <div style={{width: 12, height: 2, backgroundColor: 'blue'}} />
                <Text size='xs'>
                  {colors.map(({key, value}) => {
                    const l = value.hsl()[2]
                    const color = l < 0.7 ? 'white' : '#333'
                    return (
                      <span
                        key={key}
                        style={{
                          color,
                          marginRight: 4,
                          padding: '2px 4px',
                          backgroundColor: value.css(),
                        }}>
                        {key}
                      </span>
                    )
                  })}
                </Text>
              </Flex>
            )
          })}
      </Flex>
    </Flex>
  )
}
