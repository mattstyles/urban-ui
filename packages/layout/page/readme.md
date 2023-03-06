# @urban-ui/page

> layout | page

[![npm](https://img.shields.io/npm/v/@urban-ui/page?style=flat-square)](https://www.npmjs.com/package/@urban-ui/page)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/page?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/page)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Various generic page layouts

## Getting started

```sh
pnpm add -S @urban-ui/page
```

## Details

A collection of various common page layouts.

Pages are generally an example of slot-based components, where we place content into slots and let the layout components handle the layout. Where a 'unit' of functionality requires multiple individual components to work together we expose each individual component and expect consumers to compose them, this is a pattern used through `urban-ui` and is inheritted from `radix-ui`. This is more flexible and allows customisation to occur.

## Page layouts

### Triple

Three column layout with no top navigation bar.

The main section has a maximum content width and will centralise on large screens.

Navigation would typically live in the left aside. This aside is scrollable. It is locked to the left of the screen.

The right aside is only visible on the largest screens. This aside is scrollable. It is locked to the right of the screen.

```js
import {Triple} from '@urban-ui/page'

export function MyPage() {
  return (
    <Triple.Root>
      <Triple.Aside>
        {// e.g. Navigation}
      </Triple.Aside>
      <Triple.Main>
        <Triple.Article>
          {// Main page content}
        </Triple.Article>
      </Triple.Main>
      <Triple.Additional>
        {// Non-essential additional content space}
      </Triple.Additional>
    </Triple.Root>
  )
}
```

| Component  | Description                 | Tokens                             |
| ---------- | --------------------------- | ---------------------------------- |
| Root       | Responsible for main layout |                                    |
| Aside      | Left aside                  | Width: `@sm: aside1, @md+: aside2` |
| Main       | Main content container      |                                    |
| Article    | Inner content container     | `width: content3`                  |
| Additional | Right aside                 | `width: aside2`                    |
