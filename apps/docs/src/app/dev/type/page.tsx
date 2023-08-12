import {Flex} from '@urban-ui/flex'
import {atoms} from '@urban-ui/theme/atoms'

import {Content} from './content.tsx'

export default function ColorPage() {
  return (
    <Flex className={atoms({p: 'md'})}>
      <Content />
    </Flex>
  )
}
