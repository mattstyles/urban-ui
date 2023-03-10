# @urban-ui/button

> control | button

[![npm](https://img.shields.io/npm/v/@urban-ui/button?style=flat-square)](https://www.npmjs.com/package/@urban-ui/button)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/button?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/button)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Button component

## Getting started

```sh
pnpm add -S @urban-ui/button
```

```js
import {Button} from '@urban-ui/button'

export function MyComponent() {
  return <Button />
}
```

## Details

Buttons are 36px high currently, which is problematic in 2 ways:

1. 36px is aligned only on the soft grid size of 4px (from spacing scale)
2. 36px is smaller than the minimum size for touchable elements, which is generally considered to be either 38px ([MIT Touch Labs](http://touchlab.mit.edu/publications/2003_009.pdf)) or 44px ([Apple human interface guidelines](https://developer.apple.com/design/human-interface-guidelines/components/menus-and-actions/buttons))

The default height is liable to change, and will become configurable to align with the underlying grid (this is important for establishing vertical rhythm).

## API

| Prop | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |
