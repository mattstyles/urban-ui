/** @type {import('next').NextConfig} */
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
const withVanillaExtract = createVanillaExtractPlugin()

export default withVanillaExtract({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  transpilePackages: ['@urban-ui/button'],
})
