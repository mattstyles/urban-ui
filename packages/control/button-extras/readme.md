# @urban-ui/button-extras

> control | button-extras

[![npm](https://img.shields.io/npm/v/@urban-ui/button-addons?style=flat-square)](https://www.npmjs.com/package/@urban-ui/button-extras)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/button-extras?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/button-extras)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Additional button examples. These extend the default button package to cover more use-cases. They can be used as examples of extending the button package or as standalone button types.

## Getting started

```sh
pnpm add -S @urban-ui/button-addons
```

## Work button

```js
import {ReloadIcon} from '@radix-ui/react-icons'
import {Box} from '@urban-ui/box
import {WorkButton} from '@urban-ui/button-extras'

export function MyComponent() {
  return (
    <WorkButton
      isWorking={true}
      icon={<Box size={15}><ReloadIcon /></Box>}
      onClick={() => {}}
    >
      Working
    </LoadiWorkButtonngButton>
  )
}
```

| Prop      | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| isWorking | boolean         | Controls whether the icon is visible |
| icon      | React.ReactNode | icon to render                       |
| ...props  | Button props    | Urban-ui button props                |
