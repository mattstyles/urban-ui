# @urban-ui/checkbox

> control | checkbox

[![npm](https://img.shields.io/npm/v/@urban-ui/checkbox?style=flat-square)](https://www.npmjs.com/package/@urban-ui/checkbox)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/checkbox?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/checkbox)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Checkbox component - styles radi-uix checkbox

## Getting started

```sh
pnpm add -S @urban-ui/checkbox
```

```js
import * as Checkbox from '@urban-ui/checkbox'

export function MyComponent() {
  return (
    <Checkbox.Root>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
```

## Details

Styled version of [radix-ui/checkbox](https://www.radix-ui.com/docs/primitives/components/checkbox). Props that apply to the radix-ui checkbox also apply here.

The only functional difference is that urban-ui checkbox has a clickable area that is larger than the visible area. For example, the default visible size of the checkbox on larger screens is 20x20px (`$tokens$controlSelectionSizeMd`) but the interactive area is 40x40px (`$tokens$controlFieldSizeMd`). This is _most_ useful for touch devices, but still a good quality of life improvement when using a mouse or pointing device.

### Labels

There is no special syntax for checkbox to handle labelling, use layout and text components to achieve labels you want.

```js
import {Text} from '@urban-ui/text'
import {Stack} from '@urban-ui/layout'
import * as Checkbox from '@urban-ui/checkbox'

return (
  <Stack orientation='h' alignment='center'>
    <Checkbox.Root id='some-id'>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
    <Text as='label' htmlFor='some-id'>
      Click me
    </Text>
  </Stack>
)
```

### isIndeterminate

Support for an indeterminate state is the same as [radix-ui checkbox](https://www.radix-ui.com/docs/primitives/components/checkbox#indeterminate).

## API

| Prop  | Type                                                | Description                                |
| ----- | --------------------------------------------------- | ------------------------------------------ |
| tone  | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral                        |
| size  | 'sm' \| 'md' \| 'lg                                 | Defaults to md                             |
| round | boolean                                             | Defaults to false                          |
| fill  | boolean                                             | Defaults to false. Will fit its container. |
