import {
  StitchesLogoIcon,
  GitHubLogoIcon,
  FigmaLogoIcon,
} from '@radix-ui/react-icons'
import {Stack} from '@urban-ui/stack'
import {Spacer} from '@urban-ui/spacer'

export default function FlexPage() {
  return (
    <div style={{padding: 8}}>
      <h1>Stack</h1>
      <Spacer size='medium' />
      <Stack size='small' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Stack size='medium' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Stack size='large' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Spacer size='large' />
      <Stack orientation='h'>
        <Stack size='small'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
        <Stack size='medium'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
        <Stack size='large'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
      </Stack>
      <Spacer size='lg' />
      <Stack orientation='h' collapse>
        <h1>Collapse prop</h1>
        <p>Collapse will be horizontal on larger screens</p>
        <p>But stack vertically on smaller screens</p>
        <p>Try changing the screen size</p>
      </Stack>
      <Spacer size='lg' />
      <Stack orientation='h' collapse='md'>
        <h1>Collapse prop</h1>
        <p>Collapse will also accept a range.</p>
      </Stack>
    </div>
  )
}
