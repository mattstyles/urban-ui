import cx from 'clsx'
import {Flex} from '@urban-ui/flex'
import {atoms} from '@urban-ui/theme/atoms'

import {block} from './block.css.ts'
import {Content} from './content.tsx'
import {Schema} from './schema.tsx'
import {baseTheme} from '@urban-ui/theme'

export default function ColorPage() {
  return (
    <Flex orientation='v' gap='md' className={atoms({p: 'md'})}>
      {/* <Content /> */}
      <Schema tone={baseTheme.colors.base} />
    </Flex>
  )
}
