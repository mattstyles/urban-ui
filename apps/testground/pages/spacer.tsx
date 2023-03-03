import {
  StitchesLogoIcon,
  GitHubLogoIcon,
  FigmaLogoIcon,
} from '@radix-ui/react-icons'

import {Spacer} from '@urban-ui/spacer'
import {Flex} from '@urban-ui/flex'

export default function SpacerPage() {
  return (
    <div style={{padding: 8}}>
      <h1>Spacer</h1>
      <p>Default is horizontal spacing</p>
      <Spacer size='lg' />
      <StitchesLogoIcon />
      <Spacer size='md' />
      <GitHubLogoIcon />
      <Spacer size='sm' />
      <FigmaLogoIcon />
      <Spacer size='md' />
      <p>Also works horizontally</p>
      <Flex>
        <Spacer orientation='h' size='lg' />
        <StitchesLogoIcon />
        <Spacer orientation='h' size='md' />
        <GitHubLogoIcon />
        <Spacer orientation='h' size='sm' />
        <FigmaLogoIcon />
      </Flex>
    </div>
  )
}
