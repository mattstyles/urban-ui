import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: {name: 'Page Layouts', link: '/pages'},
    block: [
      {name: 'Triple', link: '/pages/triple'},
      {name: 'Aside', link: '/pages/aside'},
      {name: 'Constrained Aside', link: '/pages/constrainedAside'},
      {name: 'Single - Full Bleed', link: '/pages/singleFullbleed'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
