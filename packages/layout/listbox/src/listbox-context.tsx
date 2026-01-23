'use client'

import { createContext, useContext } from 'react'

export type ListBoxSize = 'md' | 'lg'

interface ListBoxContextValue {
  size: ListBoxSize
}

const ListBoxContext = createContext<ListBoxContextValue | null>(null)

export function ListBoxProvider({
  size,
  children,
}: {
  size: ListBoxSize
  children: React.ReactNode
}) {
  return (
    <ListBoxContext.Provider value={{ size }}>
      {children}
    </ListBoxContext.Provider>
  )
}

export function useListBoxContext(): ListBoxContextValue | null {
  return useContext(ListBoxContext)
}
