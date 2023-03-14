# @urban-ui/input

> control | input

[![npm](https://img.shields.io/npm/v/@urban-ui/input?style=flat-square)](https://www.npmjs.com/package/@urban-ui/input)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/input?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/input)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Input component

## Getting started

```sh
pnpm add -S @urban-ui/input
```

```js
import {Input} from '@urban-ui/input'

export function MyComponent() {
  return <Input />
}
```

## Details

The input component has `display: inline-flex`, this makes it more reliable to apply layout components to. Inputs are often in groups and being able to utilise a layout parent to help with width, or gaps between elements, is advantageous.

The input component shares similar values (colours, heights, etc) with other urban-ui components to achieve visual consistency between types.

Input has a deliberately 'unfussy' API so things like labels and icons are left up to the consumer to add based on their requirements. By utilising layout components and tokens this is very flexible.

There is no magic with controlled components either, it is up to you whether you want a controlled input or not.

## API

| Prop        | Type                 | Description                                              |
| ----------- | -------------------- | -------------------------------------------------------- | --- |
| tone        | 'primary'            | \ 'critical \| 'neutral'                                 |     |
| transparent | boolean              | Defaults to false. Will make the background transparent. |
| width       | 'full'               | Input will take up the full width of the flex parent.    |
| size        | 'sm' \| 'md' \| 'lg' | Applies the control field token scale.                   |
