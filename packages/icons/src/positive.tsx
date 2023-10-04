import {CheckCircleIcon as Icon} from '@heroicons/react/24/outline'
import {IconProps} from './props.ts'
import {variants} from './variants.ts'

export function PositiveIcon({size, fg, tone, className, ...props}: IconProps) {
  return <Icon {...props} className={variants({size, fg, tone, className})} />
}
