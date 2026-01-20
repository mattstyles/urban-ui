import { z } from 'zod'
import { loadDocContent } from '../docs/loader.js'
import { extractTitleAndDescription, parseSections } from '../docs/parser.js'
import { getPage } from '../docs/registry.js'

export const getPageInfoSchema = {
  page_name: z.string(),
}

export interface PageInfoResult {
  name: string
  category: string
  description: string
  sections: string[]
}

export async function getPageInfo(params: {
  page_name: string
}): Promise<PageInfoResult> {
  const page = getPage(params.page_name)

  if (!page) {
    throw new Error(
      `Page '${params.page_name}' not found. Use list_urban_ui_pages to see available pages.`,
    )
  }

  const content = await loadDocContent(page.filePath)
  const lines = content.split(/\r?\n/)

  const { description } = extractTitleAndDescription(lines)
  const sections = parseSections(lines)

  return {
    name: page.name,
    category: page.category,
    description: description || page.description || '',
    sections: sections.map((s) => s.name),
  }
}
