import type { Section } from '../types.js'

/**
 * Parse H2 sections from markdown content.
 * Returns section names with their line ranges.
 */
export function parseSections(lines: string[]): Section[] {
  const sections: Section[] = []
  let inCodeBlock = false

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx]

    // Track code block state to ignore ## inside code
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }

    if (inCodeBlock) {
      continue
    }

    // Match H2 headers (## Section Name)
    if (line.startsWith('## ')) {
      const name = line.replace(/^##\s+/, '').trim()
      sections.push({ name, startLine: idx, endLine: lines.length })
    }
  }

  // Set endLine for each section to the start of the next section
  for (let i = 0; i < sections.length - 1; i++) {
    sections[i].endLine = sections[i + 1].startLine
  }

  return sections
}

/**
 * Extract the page title (H1) and description (first paragraph after H1).
 */
export function extractTitleAndDescription(lines: string[]): {
  title: string
  description?: string
} {
  let title = ''
  let description: string | undefined
  let i = 0

  // Find H1 title
  for (; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim()
      i++
      break
    }
  }

  // Collect description paragraphs (until empty line or next header)
  const descLines: string[] = []
  let inCodeBlock = false

  for (; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }

    if (inCodeBlock) {
      continue
    }

    // Stop at empty line after collecting some content
    if (line.trim() === '') {
      if (descLines.length > 0) {
        break
      }
      continue
    }

    // Stop at any header
    if (/^#{1,6}\s/.test(line)) {
      break
    }

    // Skip HTML-like lines
    if (line.trim().startsWith('<')) {
      continue
    }

    descLines.push(line)
  }

  if (descLines.length > 0) {
    description = descLines.join('\n').trim()
  }

  return { title, description }
}

/**
 * Extract a specific section's content by name.
 */
export function extractSection(
  lines: string[],
  sectionName: string,
): string | null {
  const sections = parseSections(lines)

  // Try exact match first
  let section = sections.find((s) => s.name === sectionName)

  // Fall back to case-insensitive match
  if (!section) {
    section = sections.find(
      (s) => s.name.toLowerCase() === sectionName.toLowerCase(),
    )
  }

  if (!section) {
    return null
  }

  return lines.slice(section.startLine, section.endLine).join('\n')
}
