import type {VariantProps} from 'cva'
import {variants} from './variants.ts'

// We will use this one for now as heroicons are all the same but this will probably break at some point
import {XMarkIcon} from '@heroicons/react/24/outline'

export interface IconProps
  extends VariantProps<typeof variants>,
    React.PropsWithChildren,
    React.ComponentProps<typeof XMarkIcon> {}
