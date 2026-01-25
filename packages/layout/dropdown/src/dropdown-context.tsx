'use client'

import { createContext, useContext } from 'react'

export type DropdownSize = 'md' | 'lg'

interface DropdownContextValue {
  size: DropdownSize
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export function DropdownProvider({
  size,
  children,
}: {
  size: DropdownSize
  children: React.ReactNode
}) {
  return (
    <DropdownContext.Provider value={{ size }}>
      {children}
    </DropdownContext.Provider>
  )
}

export function useDropdownContext(): DropdownContextValue | null {
  return useContext(DropdownContext)
}
