import {fileURLToPath} from 'node:url'
import path from 'node:path'
import {Plop, run} from 'plop'
import {findPackageRoot} from '../package.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = await findPackageRoot()

if (root == null) {
  console.error('Can not find urban-ui root')
  process.exit(1)
}

const configPath = path.resolve(__dirname, '../index.js')
Plop.prepare(
  {
    cwd: root,
    configPath: configPath,
  },
  (env) => {
    // @ts-expect-error plop/liftoff typing is incorrect
    Plop.execute(env, run)
  },
)
