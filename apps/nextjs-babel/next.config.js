const path = require('node:path')
const rootDir = path.resolve(__dirname, '..', '..')

const config = {
  // swcMinify: true,
  transpilePackages: [
    '@urban-ui/fr-theme',
    '@urban-ui/fr-tag',
    '@stylexjs/open-props',
  ],
}

// module.exports = withStyleXPlugin(config)
module.exports = config
