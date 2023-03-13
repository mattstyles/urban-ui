import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: {name: 'Layout', link: '/components'},
    block: [
      {name: 'Spacer', link: '/components/spacer'},
      {name: 'Flex', link: '/components/flex'},
      {name: 'Stack', link: '/components/stack'},
      {name: 'Shadows', link: '/components/shadows'},
      {name: 'Text', link: '/components/text'},
      {name: 'Text Scales', link: '/components/textScales'},
      {name: 'Responsive', link: '/components/responsive'},
      {name: 'Scrollable', link: '/components/scrollable'},
      {name: 'Panel', link: '/components/panel'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
