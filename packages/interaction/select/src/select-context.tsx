'use client'

import { createContext, use } from 'react'

export type SelectSize = 'md' | 'lg'

export const SelectSizeContext = createContext<SelectSize>('md')

export function useSelectSize(): SelectSize {
  return use(SelectSizeContext)
}
