import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {custom, customTextTheme} from './custom.css.ts'
import * as styles from './content.css.ts'
import {atoms} from '@urban-ui/theme/atoms'
import cx from 'clsx'

export function Content() {
  return (
    <Flex gap='lg'>
      <Flex orientation='v' gap='lg' className={styles.column}>
        <Flex orientation='v' gap='sm'>
          <Text>
            Hello world dkhafgk ahjd jkdafh adfjkhadfkjdafkj adfadf akdjfh
            fdajkha kjdafh kjfda hkjafdh fkdajh fk fhlkfhlkadjh fkja gdkgf
            kdajhf jkdhf lkadhf kdahf kjdahf kajdhf ladkjhf lkadjhf kjdhaf kjfdh
            fkladfahj k
          </Text>
          <Text>Hello world</Text>
        </Flex>
        <Flex orientation='v' gap='sm'>
          <Text size='xs'>text size</Text>
          <Text size='sm'>text size</Text>
          <Text size='md'>text size</Text>
          <Text size='lg'>text size</Text>
          <Text size='xl'>text size</Text>
        </Flex>
        <Flex orientation='v' gap='sm'>
          <Text weight='light'>text weight</Text>
          <Text weight='normal'>text weight</Text>
          <Text weight='semibold'>text weight</Text>
          <Text weight='bold'>text weight</Text>
        </Flex>
        <Flex orientation='v' gap='sm'>
          <Text em>Emphasis</Text>
          <Text strong>Strong</Text>
          <Text strong em>
            Strong Emphasis should be a span with styling
          </Text>
          <Text fontStyle='italic'>Italic class applied</Text>
          <Text weight='bold'>Bold class applied</Text>
          <Text weight='bold' fontStyle='italic'>
            Bold and italicised
          </Text>
        </Flex>
        <Flex orientation='v' gap='sm'>
          <Text font='system'>System</Text>
          <Text font='mono'>Mono</Text>
          <Text font='heading'>Heading</Text>
          <Text font='copy'>Copy</Text>
        </Flex>
        <Flex orientation='v' gap='sm' className={custom}>
          <Text>Custom text pulling from inherited css variables</Text>
        </Flex>
        <Flex className={customTextTheme}>
          <Text>Passing a full text theme for anatomy</Text>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='lg' flex='full' className={styles.column}>
        <Text size='xl' weight='semibold'>
          Colour
        </Text>
        <Flex orientation='v' gap='md'>
          <Text size='lg'>Manually specify</Text>
          <Flex orientation='v' gap='md'>
            <Text contrast='hi'>High contrast</Text>
            <Text contrast='lo'>Low contrast</Text>
          </Flex>
          <Flex
            orientation='v'
            gap='md'
            className={cx(styles.customPanel, atoms({p: 'md'}))}>
            <Text contrast='hi' invert>
              High contrast
            </Text>
            <Text contrast='lo' invert>
              Low contrast
            </Text>
          </Flex>
        </Flex>
        <Text contrast='hi' tone>
          High contrast - using current tone
        </Text>
        <Text contrast='lo' tone>
          Low contrast - using current tone
        </Text>
        <Text contrast='hi' tone='primary'>
          High contrast - using specified primary tone
        </Text>
        <Text contrast='lo' tone='primary'>
          Low contrast - using specified primary tone
        </Text>
        <Flex orientation='v' gap='md'>
          <div className={atoms({pt: 'xl'})} />
          <Text size='lg'>Tonal inheritance</Text>
          <Flex
            orientation='v'
            gap='md'
            className={cx(
              atoms({tone: 'primary', p: 'lg'}),
              styles.lightPanel,
            )}>
            <Text size='lg'>Default tonal</Text>
            <Text contrast='lo'>Within a tonal block</Text>
          </Flex>
          <Flex
            orientation='v'
            gap='md'
            className={cx(atoms({p: 'lg'}), styles.lightPanel2)}>
            <Text size='lg'>Inheritted colour</Text>
            <Text contrast='lo'>Using atoms</Text>
          </Flex>
          <Flex
            orientation='v'
            gap='md'
            className={cx(atoms({p: 'lg'}), styles.darkPanel)}>
            <Text size='lg'>Inheritted colour</Text>
            <Text contrast='lo'>From text anatomy colour</Text>
          </Flex>
          <Flex
            orientation='v'
            gap='md'
            className={cx(atoms({p: 'lg'}), styles.darkPanel2)}>
            <Text size='lg'>Inheritted colour</Text>
            <Text contrast='lo'>From global foreground</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
