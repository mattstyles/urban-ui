# @urban-ui/mcp

MCP (Model Context Protocol) server for Urban UI documentation. Provides AI assistants with access to Urban UI component documentation, theming guides, and usage patterns.

## Installation

```bash
bunx @urban-ui/mcp@latest
```

## Usage with Claude Code

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "urban-ui": {
      "command": "bunx",
      "args": ["@urban-ui/mcp@latest"]
    }
  }
}
```

## Available Tools

### `list_urban_ui_pages`

Returns a list of available documentation pages.

**Parameters:**
- `includeDescription` (optional, boolean): Include page descriptions in output

### `get_urban_ui_page_info`

Returns page description and list of sections for a given page.

**Parameters:**
- `page_name` (required, string): Name of the page

### `get_urban_ui_page`

Returns the full markdown content for a page, or a specific section if provided.

**Parameters:**
- `page_name` (required, string): Name of the page
- `section_name` (optional, string): Specific section to retrieve

## Documentation Pages

| Name | Category | Description |
|------|----------|-------------|
| Theme Tokens | core | Color system, spacing, typography, borders, and shadows |
| Text | typography | Text component for rendering typography |
| Link | navigation | Link component for navigation |
| Button | action | Button component with variants and tones |
| Layout | layout | Flex layout component |
| StyleX Authoring Guide | guides | Best practices for StyleX styles |
| Application Patterns | guides | Common composition patterns |

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run locally
bun run dev
```

## License

MIT
