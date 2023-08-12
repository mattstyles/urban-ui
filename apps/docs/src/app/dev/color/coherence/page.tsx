import cx from 'clsx'
import {Flex} from '@urban-ui/flex'
import {atoms} from '@urban-ui/theme/atoms'

import * as styles from './styles.css.ts'

export default function ColorPage() {
  return (
    <Flex orientation='v' gap='xl' className={atoms({p: 'md'})}>
      <Flex style={{width: 240}} orientation='v' gap='md'>
        <button className={cx(styles.button, styles.buttonSolid)}>
          Solid strong colour button
        </button>
        <button className={cx(styles.button, styles.buttonGhost)}>
          ghost muted colour button
        </button>
        <button className={cx(styles.button, styles.buttonText)}>
          Text only button
        </button>
        <button className={cx(styles.button, styles.buttonOutline)}>
          Outline
        </button>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Flex
          className={cx(styles.card, styles.cardMuted)}
          orientation='v'
          gap='md'>
          <div>Some text</div>
          <button className={cx(styles.button, styles.buttonSolid)}>
            Solid strong colour button
          </button>
        </Flex>

        <Flex className={styles.card} orientation='v' gap='md'>
          <div>Some text</div>
          <button className={cx(styles.button, styles.buttonSolid)}>
            Solid strong colour button
          </button>
          <button className={cx(styles.button, styles.buttonGhost)}>
            Solid strong colour button
          </button>
          <button className={cx(styles.button, styles.buttonText)}>
            Text only button
          </button>
          <button className={cx(styles.button, styles.buttonOutline)}>
            Outline
          </button>
        </Flex>

        <Flex
          className={cx(styles.card, styles.cardSubtle)}
          orientation='v'
          gap='md'>
          <div>Some text</div>
          <button className={cx(styles.button, styles.buttonSolid)}>
            Solid strong colour button
          </button>
        </Flex>

        <Flex
          className={cx(styles.card, styles.cardBackground)}
          orientation='v'
          gap='md'>
          <div>Some text</div>
          <button className={cx(styles.button, styles.buttonSolid)}>
            Solid strong colour button
          </button>
          <button className={cx(styles.button, styles.buttonGhost)}>
            ghost muted colour button
          </button>
          <button className={cx(styles.button, styles.buttonText)}>
            Text only button
          </button>
          <button className={cx(styles.button, styles.buttonOutline)}>
            Outline
          </button>
        </Flex>
      </Flex>
    </Flex>
  )
}
