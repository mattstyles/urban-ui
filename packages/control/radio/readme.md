# @urban-ui/radio

> control | radio

[![npm](https://img.shields.io/npm/v/@urban-ui/radio?style=flat-square)](https://www.npmjs.com/package/@urban-ui/radio)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/radio?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/radio)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Styled radio wrapper around radix-ui radio components

## Getting started

```sh
pnpm add -S @urban-ui/radio
```

```js
import {Radio} from '@urban-ui/radio'

export function MyComponent() {
  return (
    <form>
      <Radio.Root defaultValue='one' orientation='h' gap='xl'>
        <Stack orientation='h' alignment='center'>
          <Radio.Item value='one' id='r1'>
            <Radio.Indicator>
              <Radio.Dot />
            </Radio.Indicator>
          </Radio.Item>
          <Text as='label' htmlFor='r1'>
            Neutral
          </Text>
        </Stack>
        <Stack orientation='h' alignment='center'>
          <Radio.Item value='two' id='r2'>
            <Radio.Indicator>
              <Radio.Dot />
            </Radio.Indicator>
          </Radio.Item>
          <Text as='label' htmlFor='r2'>
            Radio
          </Text>
        </Stack>
        <Stack orientation='h' alignment='center'>
          <Radio.Item value='three' id='r3'>
            <Radio.Indicator>
              <Radio.Dot />
            </Radio.Indicator>
          </Radio.Item>
          <Text as='label' htmlFor='r3'>
            Group
          </Text>
        </Stack>
      </Radio.Root>
    </form>
  )
}
```

## Details

Styled wrappers around [radix-ui/radio-group](https://www.radix-ui.com/docs/primitives/components/radio-group).

The Root component is also a Stack component and can be used to orient and space out radio items within the group. Each item is wrapped in a touchzone component meaning that their touchable area differs from their visual area. As the touchzone is larger this acts as a buffer between radio items so the default gap is 0. If you want horizontally aligned items then add some gap as the touchzone will not space horizontally so that things align as expected. This vertical touchable gap between components is necessary to ensure that touchzones do not overlap.

Radix-ui props also apply here and the names of each constituent part is the same. The only difference is that the indicator visual component must be specified. `Dot` is exposed as a default visual appearance but this can be substituted with an icon where required (this matches exactly the Checkbox API).

Radios match styling of Checkboxes but are rounded instead of square to provide some diffentiation. The button types (transparent, solid, etc) are not represented with Radios or Checkboxes (even where they make sense) but tonality and size is honoured.

Sizes are controlled via tokens, similar to other urban-ui control components.

## API

| Prop | Type                                                | Description         |
| ---- | --------------------------------------------------- | ------------------- |
| tone | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral |
| size | 'sm' \| 'md' \| 'lg                                 | Defaults to md      |
