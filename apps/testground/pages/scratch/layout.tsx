import type {NavType} from 'components/navigation'

import {Layout as PrimaryLayout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: {name: 'Scratch', link: '/scratch'},
    block: [
      {name: 'Grid Alignment', link: '/scratch/grid'},
      {name: 'Custom API', link: '/scratch/customAPI'},
      {name: 'Data Loading', link: '/scratch/dataloading'},
    ],
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  return <PrimaryLayout nav={nav}>{children}</PrimaryLayout>
}
