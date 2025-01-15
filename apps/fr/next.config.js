const path = require('node:path')

const stylexPlugin = require('@stylexswc/nextjs-plugin')

const rootDir = path.join(__dirname, '../../')
// const rootDir = __dirname

const withStyleXPlugin = stylexPlugin({
  // Add any StyleX options here
  rsOptions: {
    rootDir: rootDir,
    // dev: process.env.NODE_ENV !== 'production',
    dev: true,
    // useRemForFontSize: true,
    aliases: {
      // '@/*': [path.join(__dirname, '*')],
      '@/*': [path.join(rootDir, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      // rootDir: __dirname,
      // rootDir: '../../',
      rootDir: rootDir,
    },
  },
  // stylexImports: ['@stylexjs/stylex', { from: './theme', as: 'tokens' }],
  // useCSSLayers: true,
  // transformCss: async (css) => {
  //   const postcss = require('postcss')
  //   const result = await postcss([require('autoprefixer')]).process(css)
  //   return result.css
  // },
})

const config = {
  // swcMinify: true,
  transpilePackages: [
    '@urban-ui/fr-theme',
    '@urban-ui/fr-tag',
    '@stylexjs/open-props',
  ],
}

module.exports = withStyleXPlugin(config)
