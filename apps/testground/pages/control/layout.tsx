import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: {name: 'Controls', link: '/control'},
    block: [
      {name: 'Button', link: '/control/button'},
      {name: 'Button extras', link: '/control/buttonExtras'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
