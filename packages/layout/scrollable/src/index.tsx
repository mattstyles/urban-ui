// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import * as ScrollPrimitive from '@radix-ui/react-scroll-area'

export const Root = styled(ScrollPrimitive.Root, {
  backgroundColor: '$transparent',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
})

export const Viewport = styled(ScrollPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

export const Scrollbar = styled(ScrollPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$blackA6',
  transition: 'background 160ms ease-out',
  '&:hover': {background: '$blackA8'},
  '&[data-orientation="vertical"]': {width: 10},
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 10,
  },
})

export const Thumb = styled(ScrollPrimitive.Thumb, {
  flex: 1,
  background: '$bg10',
  borderRadius: '$round',
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

export const Corner = styled(ScrollPrimitive.Corner, {
  background: '$blackA8',
})
