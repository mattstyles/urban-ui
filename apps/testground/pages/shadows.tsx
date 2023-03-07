import {styled} from '@urban-ui/theme'
import {Container} from '@urban-ui/container'
import {Stack} from '@urban-ui/stack'

export default function Page() {
  return (
    <Container
      css={{backgroundColor: 'hsl(0, 0%, 96%)', padding: '$8'}}
      fill='all'>
      <Stack size='lg' alignment='center' orientation='h'>
        {Array.from({length: 6})
          .map((_, idx) => idx)
          .map((size) => {
            const Comp = Shadows[size]
            return <Comp key={size}>{size}</Comp>
          })}
      </Stack>
    </Container>
  )
}

const Box = styled('div', {
  width: 300,
  height: 200,
  backgroundColor: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Shadow0 = styled(Box, {
  boxShadow: '$0',
})
const Shadow1 = styled(Box, {
  boxShadow: '$1',
})
const Shadow2 = styled(Box, {
  boxShadow: '$2',
})
const Shadow3 = styled(Box, {
  boxShadow: '$3',
})
const Shadow4 = styled(Box, {
  boxShadow: '$4',
})
const Shadow5 = styled(Box, {
  boxShadow: '$5',
})

const Shadows = [Shadow0, Shadow1, Shadow2, Shadow3, Shadow4, Shadow5]
