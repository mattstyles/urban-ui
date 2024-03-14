module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@stylexjs/eslint-plugin'],
  extends: ['next/babel', 'next/core-web-vitals', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@stylexjs/valid-styles': 'error',
  },
}
