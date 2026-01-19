import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { urbanui } from '@urban-ui/postcss-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = __dirname
const monorepoRoot = path.join(projectRoot, '../..')

// Find all @urban-ui and @internal packages (including transitive deps)
const urbanUiPaths = urbanui.paths({
  appRoot: projectRoot,
  monorepoRoot: monorepoRoot,
  scopes: ['@urban-ui', '@internal'],
})

export default {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        ...urbanUiPaths,
      ],
      useCSSLayers: true,
      rsOptions: {
        aliases: {
          '@/*': [path.join(projectRoot, '*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
        },
        dev: process.env.NODE_ENV === 'development',
        treeshakeCompensation: true,
        styleResolution: 'application-order',
        // enableDebugClassNames: process.env.NODE_ENV === 'development',
      },
    },
    autoprefixer: {},
  },
}
