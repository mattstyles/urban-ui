import Link from 'next/link'
import {useMemo} from 'react'

import {Spacer} from '@urban-ui/spacer'

export default function Docs() {
  return (
    <div>
      <h1>Testground</h1>
      <p>Dev environment for mucking with components</p>
      <Spacer />
      <TOC links={toc} />
    </div>
  )
}

type LinkType = {name: string; link: string}
const toc: Array<LinkType> = [
  {name: 'Spacer', link: '/spacer'},
  {name: 'Flex', link: '/flex'},
  {name: 'Stack', link: '/stack'},
  {name: 'Layout examples', link: '/pages'},
]
function TOC({links}: {links: Array<LinkType>}) {
  const content = useMemo(() => {
    return links.map((link) => {
      return (
        <li key={link.name}>
          <Link href={link.link}>{link.name}</Link>
        </li>
      )
    })
  }, [])

  return <ul>{content}</ul>
}
