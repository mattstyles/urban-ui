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
      {name: 'Switch', link: '/control/switch'},
      {name: 'Radio', link: '/control/radio'},
      {name: 'Slider', link: '/control/slider'},
    ],
  },
  {
    title: {name: 'Collection', link: '/control'},
    block: [{name: 'Consistency', link: '/control/consistency'}],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
