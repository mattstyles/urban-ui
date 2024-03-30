import type {JscConfig} from '@swc/core'

export type Plugins = NonNullable<JscConfig['experimental']>['plugins']
export type Plugin = NonNullable<Plugins>[number]

export function transformImports(ext: string): Plugin {
  return [
    '@swc/plugin-transform-imports',
    {
      '^(.*?)(\\.(ts|tsx))$': {
        skipDefaultConversion: true,
        transform: '{{matches.[1]}}.' + ext,
      },
    },
  ]
}
