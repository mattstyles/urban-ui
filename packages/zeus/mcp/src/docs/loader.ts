import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Get the base directory for docs files.
 * In development, this points to the monorepo root.
 * In production (published package), docs are bundled in dist/docs.
 */
function getDocsBaseDir(): string {
  // When running from dist/index.js, __dirname is dist/docs
  // The docs are copied to dist/docs/{filename}.md
  // So we need to go up from dist/docs to dist, then into docs
  // Actually, the structure will be:
  // dist/
  //   index.js
  //   docs/
  //     loader.js
  //     ...
  //   docs-content/  <- where we copy the .md files
  //
  // Let's simplify: copy docs to dist/ directly with their registry paths
  // e.g. dist/docs/theme-tokens.md

  // __dirname will be dist/docs when running built code
  // We want to access dist/docs-content/
  return join(__dirname, '..', 'docs-content')
}

export async function loadDocContent(filePath: string): Promise<string> {
  const fullPath = join(getDocsBaseDir(), filePath.replace('docs/', ''))
  try {
    return await readFile(fullPath, 'utf-8')
  } catch {
    throw new Error(
      `Failed to load documentation file: ${filePath}. Make sure the package is built correctly.`,
    )
  }
}
