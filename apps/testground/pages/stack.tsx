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
      <Spacer size='md' />
      <Stack size='sm' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Stack size='md' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Stack size='lg' orientation='h'>
        <StitchesLogoIcon />
        <GitHubLogoIcon />
        <FigmaLogoIcon />
      </Stack>
      <Spacer size='lg' />
      <Stack orientation='h'>
        <Stack size='sm'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
        <Stack size='md'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
        <Stack size='lg'>
          <StitchesLogoIcon />
          <GitHubLogoIcon />
          <FigmaLogoIcon />
        </Stack>
      </Stack>
      <Spacer size='lg' />
      <Stack orientation='h' collapse>
        <h1>Collapse prop</h1>
        <p>Collapse will be horizontal on lgr screens</p>
        <p>But stack vertically on smer screens</p>
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
