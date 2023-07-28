'use client'

import type {ComponentDoc} from 'react-docgen-typescript'
// ESM import, with typescript support
import {Button} from '@urban-ui/button'

// If built then these will import everything the button needs
// import {Button} from '@urban-ui/button/build'
// import '@urban-ui/button/styles'

type Props = {
  typegen: Array<ComponentDoc>
}
export function Content({typegen}: Props) {
  return (
    <div>
      <pre>{JSON.stringify(typegen, null, '  ')}</pre>
      <Button onPress={() => alert('clicking')}>Click me</Button>
    </div>
  )
}
