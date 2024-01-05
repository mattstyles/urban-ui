# @urban-ui/spacer

## 0.3.0

### Minor Changes

- a95ed46: export transpiled packages to npm

### Patch Changes

- Updated dependencies [a95ed46]
  - @urban-ui/theme@0.3.0

## 0.2.0

### Minor Changes

- 6cc618e: react-aria and vanilla extract

### Patch Changes

- bcfc98c: change :boom: rename Spacer::size to Spacer::gap

  _Upgrade instructions_

  As we are early in the development cycle this breaking change will only
  trigger a patch update for Spacer, which will become a minor update when
  the backlog is finished for 0.2.0.

  To upgrade change any references to the Spacer `size` prop to `gap`.
  This is to make the props consistent across components. Spacer is used
  as a gap component so it is more consistent to use gap rather than size.

- Updated dependencies [6cc618e]
- Updated dependencies [9948cf6]
  - @urban-ui/theme@0.2.0
