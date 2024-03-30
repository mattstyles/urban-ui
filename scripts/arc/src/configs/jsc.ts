import type {JscConfig} from '@swc/core'

export const jscOps: JscConfig = {
  parser: {
    syntax: 'typescript',
    tsx: true,
    dynamicImport: false,
  },
  transform: {
    react: {
      runtime: 'automatic',
    },
  },
  target: 'esnext',
  loose: true,
  externalHelpers: false,
}
