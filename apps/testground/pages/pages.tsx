import Link from 'next/link'
import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'

export default function Pages() {
  return (
    <Container>
      <h1>Page layout examples</h1>
      <Spacer />
      <ul>
        <li>
          <Link href='/pages/triple'>Triple</Link>
        </li>
        <li>
          <Link href='/pages/aside'>Aside</Link>
        </li>
      </ul>
    </Container>
  )
}
