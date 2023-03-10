# @urban-ui/box

> layout | box

[![npm](https://img.shields.io/npm/v/@urban-ui/box?style=flat-square)](https://www.npmjs.com/package/@urban-ui/box)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/box?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/box)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Generic container componet for block elements

## Getting started

```sh
pnpm add -S @urban-ui/box
```

```js
import {Box} from '@urban-ui/box'

export function MyComponent() {
  return (
    <Box css={{size: '$xl', backgroundColor: '$primary10'}}>
      <h1>Some content</h1>
    </Box>
  )
}
```

## Details

Box is a catch-all component that gives you access to the `css` prop for use when you need some customisations for a component and want access to the theme specification.
