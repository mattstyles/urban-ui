module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['next/babel', 'next/core-web-vitals', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
}
