module.exports = {
  // files: ['src/**/*.ts', 'src/**/*.tsx'],
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'turbo',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['@typescript-eslint', 'react', '@stylexjs'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Empty functions are fine
    // 'no-empty-function': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // JSX in scope not required for react@>17
    'react/react-in-jsx-scope': 'off',
    // Unused vars are ok
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // Hoisting is fine
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-declare': 'off',
    // stylex rules - had to disable as did not work with variables
    // '@stylexjs/valid-styles': [
    //   'error',
    //   {
    //     // propLimits: {
    //     //   padding: {
    //     //     limit: [0, 4, 8, 16, 32, 64],
    //     //     reason: 'Use a padding that conforms to the design system',
    //     //   },
    //     // },
    //   },
    // ],
  },
  ignorePatterns: ['dist'],
}
