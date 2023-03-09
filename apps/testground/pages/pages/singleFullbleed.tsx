import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {TextBlock, NavBlock} from 'components/lorem'
import {FullBleed} from '@urban-ui/page'
import {Stack} from '@urban-ui/stack'
import {styled} from '@urban-ui/theme'

export default function Page() {
  return (
    <FullBleed.Root>
      <FullBleed.Header fixed>
        <HeaderContent>
          <StitchesLogoIcon />
          <p>Some header text</p>
        </HeaderContent>
      </FullBleed.Header>
      <FullBleed.Main>
        <h1>Full bleed header text</h1>
        <TextBlock size={2} />
        <FullBleed.Full>
          <img
            alt='Randomly selected picture of a set width to demonstrate behaviour when content is wider than the main column width'
            src='https://picsum.photos/1600/400'
            style={{width: '100%', aspectRatio: '4 / 1'}}
          />
        </FullBleed.Full>
        <TextBlock size={2} />
        <FullBleed.Full>
          <FullBleed.Bleed css={{backgroundColor: 'grey'}}>
            <pre style={{color: 'white'}}>{`
  function Foo() {
    return 'bar'
  }
            `}</pre>
          </FullBleed.Bleed>
        </FullBleed.Full>
        <TextBlock size={9} />
      </FullBleed.Main>
    </FullBleed.Root>
  )
}

const HeaderContent = styled(Stack, {
  width: '100%',
  maxWidth: '$tokens$page1',
  margin: '0 auto',

  defaultVariants: {
    orientation: 'h',
    alignment: 'center',
  },
})
