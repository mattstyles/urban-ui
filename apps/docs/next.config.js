/** @type {import('next').NextConfig} */
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
const withVanillaExtract = createVanillaExtractPlugin()
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

const config = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  reactStrictMode: true,
  transpilePackages: ['@urban-ui/button'],
  webpack(config) {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
    }
    return config
  },
}

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})

export default withVanillaExtract(withMDX(config))
