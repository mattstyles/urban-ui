import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'

export default function FlexPage() {
  return (
    <div style={{padding: 8}}>
      <h1>Flex</h1>
      <p>Alignment</p>
      <Flex alignment='center' orientation='h'>
        <StitchesLogoIcon />
        <Spacer orientation='h' size='sm' />
        <span>Hello world</span>
      </Flex>
      <Flex data-testid='someID'>
        <StitchesLogoIcon />
        <span>Hello world</span>
      </Flex>
    </div>
  )
}
