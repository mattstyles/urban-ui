import { beforeMount } from '@playwright/experimental-ct-react/hooks'
import { Body } from '@urban-ui/test-utils/visual'

import '@urban-ui/reset/reset.css'
import '@urban-ui/reset/font.css'
import './styles.css'

beforeMount(async ({ App }) => {
  return (
    <Body>
      <App />
    </Body>
  )
})
