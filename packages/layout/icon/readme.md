# @urban-ui/icon

> layout | icon

[![npm](https://img.shields.io/npm/v/@urban-ui/icon?style=flat-square)](https://www.npmjs.com/package/@urban-ui/icon)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/icon?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/icon)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Wrapper around icon token size

## Getting started

```sh
pnpm add -S @urban-ui/icon
```

```js
import {StitchesLogoIcon} from '@radix-ui/react-icons
import {Icon} from '@urban-ui/icon'

export function MyComponent() {
  return (
    <Icon size='md'>
      <StitchesLogoIcon width='100%' height='100%'>
    </Icon>
  )
}
```

## Details

Urban-ui is not opinionated about iconography, use whichever icon set you like.

This Icon component is only a wrapper around the size tokens to help gain a consistent icon size across your application.

## API

| Prop | Type         | Description |
| ---- | ------------ | ----------- | ------------------------ |
| Size | 'sm' \| 'md' | \ 'lg'      | Maps to icon size tokens |
