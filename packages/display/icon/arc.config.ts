import type { Config } from '@urban-ui/arc'
import { getTsConfig } from '@urban-ui/arc/ts'

const tsconfig = await getTsConfig()

const config: Config = {
  include: [tsconfig.compilerOptions?.rootDir ?? 'src', '!**/*.test.ts*'],
  outDir: 'dist',
  rootDir: tsconfig.compilerOptions?.rootDir ?? 'src',
  events: {
    complete: async () => {
      console.log('✨')
    },
  },
}

export default config
