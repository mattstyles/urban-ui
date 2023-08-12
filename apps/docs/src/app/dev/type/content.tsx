import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {custom, customTextTheme} from './custom.css.ts'
import cx from 'clsx'

export function Content() {
  return (
    <Flex orientation='v' gap='lg'>
      <Flex orientation='v' gap='sm'>
        <Text>
          Hello world dkhafgk ahjd jkdafh adfjkhadfkjdafkj adfadf akdjfh fdajkha
          kjdafh kjfda hkjafdh fkdajh fk fhlkfhlkadjh fkja gdkgf kdajhf jkdhf
          lkadhf kdahf kjdahf kajdhf ladkjhf lkadjhf kjdhaf kjfdh fkladfahj k
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
        <Flex className={customTextTheme}>
          <Text>Passing a full text theme for anatomy</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
