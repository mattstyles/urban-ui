#!/usr/bin/env bun

/**
 * Prebuild script to copy documentation files into dist/docs-content.
 * This bundles the docs with the package so they can be read at runtime.
 */

import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Mapping from registry filePath to source location in the monorepo
const docSources: Record<string, string> = {
  'theme-tokens.md': 'packages/core/theme/llms.md',
  'text.md': 'packages/typography/text/llms.md',
  'link.md': 'packages/navigation/link/llms.md',
  'button.md': 'packages/action/button/llms.md',
  'layout.md': 'packages/layout/llms.md',
  'stylex-authoring-guide.md': 'docs/stylex-authoring-guide.md',
  'application-patterns.md': 'docs/application-patterns.md',
}

async function copyDocs(): Promise<void> {
  // Resolve paths relative to the monorepo root
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const packageDir = dirname(__dirname)
  const monorepoRoot = join(packageDir, '..', '..', '..')
  const outputDir = join(packageDir, 'dist', 'docs-content')

  console.log('Copying documentation files...')
  console.log(`  From: ${monorepoRoot}`)
  console.log(`  To: ${outputDir}`)

  // Create output directory
  await mkdir(outputDir, { recursive: true })

  // Copy each doc file
  for (const [destName, srcPath] of Object.entries(docSources)) {
    const srcFullPath = join(monorepoRoot, srcPath)
    const destFullPath = join(outputDir, destName)

    try {
      await copyFile(srcFullPath, destFullPath)
      console.log(`  Copied: ${srcPath} -> ${destName}`)
    } catch (error) {
      console.error(`  Error copying ${srcPath}:`, error)
      throw error
    }
  }

  console.log('Documentation files copied successfully.')
}

copyDocs().catch((error) => {
  console.error('Failed to copy docs:', error)
  process.exit(1)
})
