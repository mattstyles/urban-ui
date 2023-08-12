import cx from 'clsx'
import {atoms} from '@urban-ui/theme/atoms'
import {Flex} from '@urban-ui/flex'
import {Button} from '@urban-ui/button'

import {
  block,
  highlightBlock,
  primary /**, cyberColorMode**/,
} from './block.css.ts'

export function Content() {
  return (
    <Flex orientation='v' gap='lg'>
      <Flex orientation='v' gap='md'>
        <div className={cx(atoms({p: 'md'}), block)}>
          <h1>Colors</h1>
        </div>
        <div className={cx(atoms({p: 'md'}), block, highlightBlock)}>
          <h1>Colors highlight</h1>
        </div>
        <div className={cx(atoms({p: 'md'}), block, primary)}>
          <h1>Colors highlight</h1>
        </div>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Button>Click me</Button>
        <Button variant='solid'>Click me</Button>
        <Flex className={highlightBlock} gap='sm'>
          <Button>Highlight color mode inheritance</Button>
          <Button variant='solid'>Highlight color mode override</Button>
        </Flex>
      </Flex>
      {/* <Flex orientation='v' gap='md' className={cyberColorMode}>
        <Button>Cyber</Button>
        <Button variant='solid'>Cyber mode solid</Button>
      </Flex> */}
    </Flex>
  )
}
