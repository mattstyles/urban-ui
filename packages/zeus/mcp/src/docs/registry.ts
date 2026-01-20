import type { PageRegistry } from '../types.js'

export const pageRegistry: PageRegistry = {
  'Theme Tokens': {
    name: 'Theme Tokens',
    category: 'core',
    description:
      'Color system, spacing, typography, borders, and shadows using StyleX tokens',
    filePath: 'docs/theme-tokens.md',
  },
  Text: {
    name: 'Text',
    category: 'typography',
    description:
      'Text component for rendering typography with semantic variants and tones',
    filePath: 'docs/text.md',
  },
  Link: {
    name: 'Link',
    category: 'navigation',
    description: 'Link component for navigation with React Router integration',
    filePath: 'docs/link.md',
  },
  Button: {
    name: 'Button',
    category: 'action',
    description:
      'Button component with variants, tones, sizes, and icon support',
    filePath: 'docs/button.md',
  },
  Layout: {
    name: 'Layout',
    category: 'layout',
    description: 'Flex layout component for building page structures',
    filePath: 'docs/layout.md',
  },
  'StyleX Authoring Guide': {
    name: 'StyleX Authoring Guide',
    category: 'guides',
    description:
      'Best practices for writing StyleX styles in urban-ui applications',
    filePath: 'docs/stylex-authoring-guide.md',
  },
  'Application Patterns': {
    name: 'Application Patterns',
    category: 'guides',
    description:
      'Common patterns for composing urban-ui components in applications',
    filePath: 'docs/application-patterns.md',
  },
}

export function getPageNames(): string[] {
  return Object.keys(pageRegistry)
}

export function getPage(name: string): PageRegistry[string] | undefined {
  return pageRegistry[name]
}
