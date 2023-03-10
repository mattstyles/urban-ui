import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: 'Controls',
    block: [{name: 'Button', link: '/control/button'}],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}