import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { getPageContent, getPageSchema } from './tools/get-page.js'
import { getPageInfo, getPageInfoSchema } from './tools/get-page-info.js'
import { listPages, listPagesSchema } from './tools/list-pages.js'

export async function createServer(version: string): Promise<McpServer> {
  const server = new McpServer({
    name: 'urban-ui-docs-server',
    version,
  })

  // Register list_urban_ui_pages tool
  server.registerTool(
    'list_urban_ui_pages',
    {
      title: 'List Urban UI docs pages',
      description: 'Returns a list of available pages in the urban-ui docs.',
      inputSchema: listPagesSchema,
    },
    async (params) => {
      const result = await listPages(params)
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    }
  )

  // Register get_urban_ui_page_info tool
  server.registerTool(
    'get_urban_ui_page_info',
    {
      title: 'Get Urban UI page info',
      description:
        'Returns page description and list of sections for a given page.',
      inputSchema: getPageInfoSchema,
    },
    async (params) => {
      const result = await getPageInfo(params)
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    }
  )

  // Register get_urban_ui_page tool
  server.registerTool(
    'get_urban_ui_page',
    {
      title: 'Get Urban UI page markdown',
      description:
        'Returns the full markdown content for a page, or a specific section if provided.',
      inputSchema: getPageSchema,
    },
    async (params) => {
      const content = await getPageContent(params)
      return {
        content: [{ type: 'text', text: content }],
      }
    }
  )

  return server
}

export async function startServer(version: string): Promise<void> {
  const server = await createServer(version)
  const transport = new StdioServerTransport()
  await server.connect(transport)
}
