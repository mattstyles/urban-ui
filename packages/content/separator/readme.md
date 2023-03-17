# @urban-ui/separator

> content | separator

[![npm](https://img.shields.io/npm/v/@urban-ui/separator?style=flat-square)](https://www.npmjs.com/package/@urban-ui/separator)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/separator?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/separator)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Styled wrapper around radix-ui/separator

## Getting started

```sh
pnpm add -S @urban-ui/separator
```

```js
import {Separator} from '@urban-ui/separator'

export function MyComponent() {
  return <Separator />
}
```

## Details

Applies styling to [radix-ui/separator](https://www.radix-ui.com/docs/primitives/components/separator). All props that apply to the radix-ui separator apply here.

The `transparent` type applies a semi-transparent border which gives a slight indication of depth. This has less visual weight than the `strong` variant.

## API

| Prop        | Type                                                | Description         |
| ----------- | --------------------------------------------------- | ------------------- | ------------- |
| tone        | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral |
| size        | 'sm' \| 'md' \| 'lg                                 | Defaults to md      |
| orientation | 'h'                                                 | \ 'v'               | Defaults to h |
| type        | 'normal' \| 'strong' \| 'transparent'               | Defaults to normal  |
