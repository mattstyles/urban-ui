import type {Options} from '@swc/core'
import swc from '@swc/core'
import {jscOps} from './configs/jsc'
import {minify} from './configs/minify'

export async function transformFiles(files: Array<string>) {
  // @TODO add outDir to rk.config.ts
  // @TODO turn this in to a pipeline configuration
  // * read file
  // * transform file with swc
  // * write file and map with correct extensions to correct outDir directory
  // * run tsc type generation
  // Do this for each target, which is cjs, and esm

  const parsedFiles = await Promise.all(files.map(readFile))
  const transpiledFiles = await Promise.all(
    parsedFiles.map(async (code) => {
      return transformFile({
        code,
        filename: 'foobarbaz',
      })
    }),
  )

  console.log(transpiledFiles)
}

async function readFile(path: string) {
  const file = Bun.file(path)
  const content = await file.text()
  return content
}

type TransformFileOpts = {
  code: string
  filename: string
  overrides?: Partial<Options>
}
async function transformFile({
  code,
  filename,
}: TransformFileOpts): Promise<ReturnType<typeof swc.transform>> {
  return await swc.transform(code, {
    filename,
    module: {
      type: 'es6',
    },
    isModule: true,
    sourceMaps: true,
    minify: true,
    jsc: {
      ...jscOps,
      minify,
    },
  })
}
