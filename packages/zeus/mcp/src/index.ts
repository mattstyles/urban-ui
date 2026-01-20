#!/usr/bin/env node

import { startServer } from './server.js'

const VERSION = '0.1.0'

async function main(): Promise<void> {
  const arg = (process.argv[2] || '').trim()

  if (arg === '--help' || arg === '-h' || arg === 'help') {
    console.log(
      'Usage: bunx @urban-ui/mcp@latest\n\n' +
        'Starts the MCP server for Urban UI documentation.\n\n' +
        'Tools provided:\n' +
        '  list_urban_ui_pages     - List all available documentation pages\n' +
        '  get_urban_ui_page_info  - Get page description and section list\n' +
        '  get_urban_ui_page       - Get full page content or specific section'
    )
    process.exit(0)
  }

  if (arg === '--version' || arg === '-v') {
    console.log(VERSION)
    process.exit(0)
  }

  try {
    await startServer(VERSION)
  } catch (error) {
    console.error(
      'Failed to start MCP server:',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

main()
