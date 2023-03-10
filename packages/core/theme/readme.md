# @urban-ui/theme

> core | theme

[![npm](https://img.shields.io/npm/v/@urban-ui/theme?style=flat-square)](https://www.npmjs.com/package/@urban-ui/theme)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/theme?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/theme)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Theme specification for urban-ui components

## Getting started

```sh
pnpm add -S @urban-ui/theme
```

In order to create new components that have access to theme information you can use the exported `styled` function:

```js
import {styled} from '@urban-ui/theme'

export const MyComponent = styled('div', {
  backgroundColor: '$bg1',
  padding: '$md',
  margin: '$1',
})
```

## Details

The theme package exposes functions from [@stitches/react](https://stitches.dev/docs/introduction) that allow you to create new components that have access to theme information.

Stitches builds on top of a theme specification proposed as part of [styled-system](https://styled-system.com/theme-specification). Tailwind also follows a similar strategy although follows a slightly altered specification.

The theme specification defines design rules. These constrain the options you have for styling which helps to create consistency across your design system. For example, when styling a new component without constraints you could specify any colour you like, but, with a constrained system your options are restricted. This means you avoid the overhead of trying to avoid shipping several different versions of blue (for example). Spacing scales are a specific example where free-reign leads to divergence and dissonance, we usually want gaps between elements to be consistent.

## Consistency

Urban-ui components use a theme specification to achieve consistency. Where possible props refer to the same thing _across_ components i.e. the `size` prop refers to the overall size of the component whilst `gap` refers to the size of spaces around or between components.

The theme specification contains 2 primitives:

- Lists
- Tokens

A list of values is a scale. For example, the `spaces` scale is intended to represent spacing in our system (i.e. margins, padding, sizes, etc).

Tokens refer to more specific applications of the scale. For example, many scales have 5 consistent variants (xs, sm, md, lg, xl) that can be used in place of indices to scales. These tokens should usually pull from the scale i.e. they are aliases to the scale that are more obviously readable to humans.

## Theme specification

Urban-ui is a stitches design system and follows the [stitches theme specification](https://stitches.dev/docs/tokens#property-mapping).

Additionally tokens are added to the theme that are used across components to achieve consistency.

## Custom theming

Urban-ui can be used to as a stand-alone system. It is, by necessity, fairly generic and you probably want to add more 'flavour' to your design system.

There are two ways to create your own flavour:

- Alter tokens in the theme
- Compose urban-ui components in your own design system

## Component types

In any design system there are typically a few different groupings of components that form a scale from least specific to most specific:

| Type     | Description                               |
| -------- | ----------------------------------------- |
| Base     | Primitives such as buttons or text or box |
| Unit     | Composes several components               |
| Specific | Composes several units                    |

The rules for which group a component falls in to can be a little arbitrary. Urban-ui considers an 'individual' component as a 'Base' component. We refer to a single unit of functionality here, rather than a single component. For example, a Button component may consist of several different elements (or components) but it has a single functionality, but, a Dialog component definitely composes several different components, is it a Base or a Unit? Urban-ui considers it a unit but feel free to disagree.

Specific units are typically created when developing features. An entire page could also be considered a 'specific' component. These components are your top-level functionality, and they could be specific enough to only have 1 in your entire application.

Urban-ui makes an additional distinction between components and tries to be fairly strict about it:

| Type    | Constraints                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Layout  | These components are responsible for arranging a composition and typically do not have any visual element to them |
| Content | Content components are visual, you can see them!                                                                  |

Urban-ui tries not to confuse the two types, this typically leads to more flexibility.

## API

| Prop | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |
