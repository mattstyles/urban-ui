import type {Plugin} from './configs/plugins'
import type {Options, Output as SwcOutput} from '@swc/core'
import swc from '@swc/core'
import path from 'node:path'
import fs from 'node:fs/promises'

import {jscOps} from './configs/jsc'
import {minify} from './configs/minify'
import {transformImports} from './configs/plugins'
import {pathToFileURL} from 'bun'

/**
 * Reads the input files, maps to cjs and esm formats, writes code and map files to output directory with correct extensions.
 * Outputs type definitions
 */
export async function transformFiles(
  files: Array<string>,
  options: {
    outDir: string
  },
) {
  // @TODO turn this in to a pipeline configuration

  // Read input files
  const parsedFiles = await Promise.all(files.map(readFile))

  // Compile inputs to esm and cjs
  const outputFiles = await Promise.all(
    parsedFiles.map(async ({file, filepath}) => {
      const codeBlocks = await Promise.all([
        await transformFile({
          code: file,
          filename: filepath,
          overrides: {
            module: {
              type: 'es6',
            },
          },
          plugins: [transformImports('js')],
        }),
        await transformFile({
          code: file,
          filename: filepath,
          overrides: {
            module: {
              type: 'commonjs',
            },
          },
          plugins: [transformImports('cjs')],
        }),
      ])
      return {
        esm: codeBlocks[0],
        cjs: codeBlocks[1],
      }
    }),
  )

  // Generate output directory if necessary
  // @TODO should we delete previous output directory?
  if (!(await fs.exists(options.outDir))) {
    await fs.mkdir(options.outDir)
  }

  // Write output files
  await Promise.all(
    outputFiles.map(async (file) => {
      const esmFilepath = generateOutputPath(file.esm.filepath, 'js', {
        strip: 'src',
        outDir: options.outDir,
      })

      const cjsFilepath = generateOutputPath(file.esm.filepath, 'cjs', {
        strip: 'src',
        outDir: options.outDir,
      })

      console.log('Writing file', esmFilepath)
      await Promise.all([
        await writeFile(esmFilepath, file.esm.code),
        file.esm.map && (await writeFile(`${esmFilepath}.map`, file.esm.map)),
        await writeFile(cjsFilepath, file.cjs.code),
        file.cjs.map && (await writeFile(`${cjsFilepath}.map`, file.cjs.map)),
      ])
    }),
  )
}

async function readFile(filepath: string) {
  const file = Bun.file(filepath)
  const content = await file.text()
  return {
    file: content,
    filepath: filepath,
  }
}

async function writeFile(filepath: string, content: string) {
  await Bun.write(filepath, content)
}

function generateOutputPath(
  filepath: string,
  ext: string,
  opts: {
    strip: string
    outDir: string
  },
): string {
  const strippedFilepath = path.relative(opts.strip, filepath)
  const baseFilename = path.basename(
    strippedFilepath,
    path.extname(strippedFilepath),
  )
  return path.format({
    name: baseFilename,
    ext: ext,
    dir: path.join(opts.outDir, path.dirname(strippedFilepath)),
  })
}

type TransformFileOpts = {
  code: string
  filename: string
  overrides?: Partial<Options>
  plugins?: Array<Plugin>
}
type TransformFileOutput = SwcOutput & {
  filepath: string
}
async function transformFile({
  code,
  filename,
  overrides = {},
  plugins = [],
}: TransformFileOpts): Promise<TransformFileOutput> {
  const output = await swc.transform(code, {
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
      experimental: {
        plugins: plugins,
      },
    },
    ...overrides,
  })

  return {
    filepath: filename,
    code: output.code,
    map: output.map,
  }
}
