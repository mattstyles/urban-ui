'use client'

import type {ComponentDoc} from 'react-docgen-typescript'

import {MDXProvider} from '@mdx-js/react'
import File from './test2.mdx'

// ESM import, with typescript support
import {Button} from '@urban-ui/button'

// If built then these will import everything the button needs
// import {Button} from '@urban-ui/button/build'
// import '@urban-ui/button/styles'

import {Foo} from './something.tsx'

type Props = {
  typegen: Array<ComponentDoc>
}
export function Content({typegen}: Props) {
  // console.log('client typegen', typegen)
  return (
    <div>
      <MDXProvider
        components={{
          Foo: Foo,
          Button: Button,
          h1: ({children}) => <h1 style={{color: 'green'}}>{children}</h1>,
        }}>
        <File />
      </MDXProvider>
      <pre>{JSON.stringify(typegen, null, '  ')}</pre>
      <Button onPress={() => alert('clicking')}>Click me</Button>
    </div>
  )
}
