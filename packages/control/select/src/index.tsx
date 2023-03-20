// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import * as SelectPrimitive from '@radix-ui/react-select'

export const Root = SelectPrimitive.Root
export {Trigger, Value, Icon} from './trigger'
export {
  Portal,
  Content,
  Viewport,
  ScrollUpButton,
  ScrollDownButton,
} from './content'
export {Item, ItemText, ItemIndicator, Group, Label, Separator} from './item'
