import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: 'Components',
    block: [
      {name: 'Spacer', link: '/components/spacer'},
      {name: 'Flex', link: '/components/flex'},
      {name: 'Stack', link: '/components/stack'},
      {name: 'Shadows', link: '/components/shadows'},
      {name: 'Text', link: '/components/text'},
      {name: 'Responsive', link: '/components/responsive'},
      {name: 'Scrollable', link: '/components/scrollable'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
