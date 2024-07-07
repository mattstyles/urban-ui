import cp from 'node:child_process'
import path from 'node:path'
import util from 'node:util'
import type { Config } from '@urban-ui/arc'
import { getTsConfig } from '@urban-ui/arc/ts'

// const spawn = util.promisify(cp.spawn)

const tsconfig = await getTsConfig()

const config: Config = {
  include: [tsconfig.compilerOptions?.rootDir ?? 'src', '!**/*.test.ts*'],
  outDir: 'dist',
  rootDir: tsconfig.compilerOptions?.rootDir ?? 'src',
  events: {
    complete: async () => {
      console.log('🎉')
      await spawn('del', ['disttest2'])
      console.log(process.cwd(), __dirname)
      await spawn('stylex', [
        '--config',
        path.join(__dirname, 'stylex.config.jsonc'),
      ])
      // await new Promise((res) => {
      //   const pipe = cp.spawn('stylex', ['-i', 'disttest', '-o', 'disttest2'], {
      //     stdio: [0, 1, 2],
      //   })
      //   pipe.on('data', (chunk) => {
      //     console.log(chunk)
      //   })
      //   pipe.on('close', () => {
      //     console.log('👩‍🎤')
      //     res(null)
      //   })
      // })
      console.log('❤️')
    },
  },
}

export default config

function spawn(cmd: string, params: Array<string>) {
  return new Promise((res) => {
    const pipe = cp.spawn(cmd, params, {
      stdio: [0, 1, 2],
    })
    pipe.on('data', console.log)
    pipe.on('close', res)
  })
}
