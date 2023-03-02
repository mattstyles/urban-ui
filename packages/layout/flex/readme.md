# @urban-ui/flex

> layout | flex

[![npm](https://img.shields.io/npm/v/@urban-ui/flex?style=flat-square)](https://www.npmjs.com/package/@urban-ui/flex)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/flex?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/flex)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Flex-based container component

## Getting started

```sh
pnpm add -S @urban-ui/flex
```

```js
import {Flex} from '@urban-ui/flex'

export function MyComponent() {
  return (
    <Flex orientation='h' alignment='center'>
      <SomeIcon />
      <Spacer orientation='h' size='small' />
      <Text>Some aligned text</Text>
    </Flex>
  )
}
```

## Details

Flex is a declarative wrapper around the CSS flex-box specification, although it does not expose all properties of Flex.

Urban-ui aims to be more restrictive than the CSS specification and help you to fall into a pit of success, so only _some_ properties are exposed to this Flex component.

Flex follows CSS paradigms where possible, for example, the justification and alignment properties change axis as the direction changes. This is potentially confusing but is, at least, expected behaviour.

Flex is a layout component and owns the layout of its children. Flex does not expose child properties such as `align-self`.

Flex defaults to vertical alignment.

## API

| Prop        | Type                                                | Description                                |
| ----------- | --------------------------------------------------- | ------------------------------------------ |
| orientation | 'h'\| 'v'                                           | Specifies direction of content             |
| alignment   | 'center' \| 'start' \| 'end'                        | Specifies content alignment                |
| justify     | 'center' \| 'start' \| 'end' \| 'spread'            | Specifies content justification            |
| size        | 'full' \| 'half' \| 'third' \| 'quarter' \| 'fifth' | Specifies container size in unit fractions |
