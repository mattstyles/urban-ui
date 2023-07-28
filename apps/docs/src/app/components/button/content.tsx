'use client'

import type {ComponentDoc} from 'react-docgen-typescript'
// import {Foo} from './button.tsx'

type Props = {
  typegen: Array<ComponentDoc>
}
export function Content({typegen}: Props) {
  return (
    <div>
      <pre>{JSON.stringify(typegen, null, '  ')}</pre>
      {/* <Foo onClick={() => alert('clicking')} /> */}
    </div>
  )
}
