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
    </div>
  )
}
