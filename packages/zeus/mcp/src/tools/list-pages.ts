import { z } from 'zod'
import { getPageNames, pageRegistry } from '../docs/registry.js'

export const listPagesSchema = {
  includeDescription: z.boolean().optional(),
}

export interface ListPagesResult {
  name: string
  category: string
  description?: string
}

export async function listPages(params: {
  includeDescription?: boolean
}): Promise<ListPagesResult[]> {
  const names = getPageNames()

  return names
    .map((name) => {
      const page = pageRegistry[name]
      if (params.includeDescription) {
        return {
          name: page.name,
          category: page.category,
          description: page.description,
        }
      }
      return {
        name: page.name,
        category: page.category,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
