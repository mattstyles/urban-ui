'use client'

import { createContext, useContext } from 'react'

export type MenuSize = 'md' | 'lg'

interface MenuContextValue {
  size: MenuSize
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({
  size,
  children,
}: {
  size: MenuSize
  children: React.ReactNode
}) {
  return (
    <MenuContext.Provider value={{ size }}>{children}</MenuContext.Provider>
  )
}

export function useMenuContext(): MenuContextValue | null {
  return useContext(MenuContext)
}
