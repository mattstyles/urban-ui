import Link from 'next/link'

import {Spacer} from '@urban-ui/spacer'

export default function Docs() {
  return (
    <div>
      <h1>Testground</h1>
      <p>Dev environment for mucking with components</p>
      <Spacer />
      <p>More text down here</p>
      <Spacer />
      <Link href='/flex'>Flex</Link>
    </div>
  )
}
