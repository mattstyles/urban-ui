'use client'

import { createContext, useContext } from 'react'

export type ListBoxSize = 'md' | 'lg'
export type ListBoxVariant = 'inline' | 'dialog'

interface ListBoxContextValue {
  size: ListBoxSize
  variant: ListBoxVariant
}

const ListBoxContext = createContext<ListBoxContextValue | null>(null)

export function ListBoxProvider({
  size,
  variant,
  children,
}: {
  size: ListBoxSize
  variant: ListBoxVariant
  children: React.ReactNode
}) {
  return (
    <ListBoxContext.Provider value={{ size, variant }}>
      {children}
    </ListBoxContext.Provider>
  )
}

export function useListBoxContext(): ListBoxContextValue | null {
  return useContext(ListBoxContext)
}
