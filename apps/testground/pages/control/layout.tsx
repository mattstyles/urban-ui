import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: {name: 'Controls', link: '/control'},
    block: [
      {name: 'Button', link: '/control/button'},
      {name: 'Button extras', link: '/control/buttonExtras'},
      {name: 'Input', link: '/control/input'},
      {name: 'Checkbox', link: '/control/checkbox'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
