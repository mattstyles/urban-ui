import {XMarkIcon} from '@heroicons/react/24/outline'
import {IconProps} from './props.ts'
import {variants} from './variants.ts'

export function CloseIcon({size, fg, tone, className, ...props}: IconProps) {
  return (
    <XMarkIcon {...props} className={variants({size, fg, tone, className})} />
  )
}
