import { z } from 'zod'
import { loadDocContent } from '../docs/loader.js'
import { extractSection, parseSections } from '../docs/parser.js'
import { getPage } from '../docs/registry.js'

export const getPageSchema = {
  page_name: z.string(),
  section_name: z.string().optional(),
}

export async function getPageContent(params: {
  page_name: string
  section_name?: string
}): Promise<string> {
  const page = getPage(params.page_name)

  if (!page) {
    throw new Error(
      `Page '${params.page_name}' not found. Use list_urban_ui_pages to see available pages.`,
    )
  }

  const content = await loadDocContent(page.filePath)

  // Return full content if no section specified
  if (!params.section_name) {
    return content
  }

  // Extract specific section
  const lines = content.split(/\r?\n/)
  const sectionContent = extractSection(lines, params.section_name)

  if (sectionContent === null) {
    const sections = parseSections(lines)
    const available = sections.map((s) => s.name).join(', ')
    throw new Error(
      `Section '${params.section_name}' not found in ${params.page_name}. ` +
        `Available sections: ${available}`,
    )
  }

  return sectionContent
}
