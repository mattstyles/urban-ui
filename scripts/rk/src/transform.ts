import type {Plugin} from './configs/plugins'
import type {Options, Output as SwcOutput} from '@swc/core'
import swc from '@swc/core'
import path from 'node:path'
import fs from 'node:fs/promises'
import {PerformanceObserver, performance} from 'node:perf_hooks'

import {jscOps} from './configs/jsc'
import {minify} from './configs/minify'
import {transformImports} from './configs/plugins'
import {Trace} from './trace'

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
  const tr = new Trace().on()
  const ftr = new TransformTracker()

  // @TODO turn this in to a pipeline configuration

  // Read input files
  const parsedFiles = await Promise.all(
    files.map((filepath) => {
      ftr.register(filepath)
      ftr.get(filepath).track('parse::start')
      const file = readFile(filepath)
      ftr.get(filepath).track('parse::end')
      return file
    }),
  )
  tr.track('transform::parse')

  // Compile inputs to esm and cjs
  const outputFiles = await Promise.all(
    parsedFiles.map(async ({file, filepath}) => {
      ftr.get(filepath).track('compile::start')
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
      ftr.get(filepath).track('compile::end')
      return {
        filepath: filepath,
        files: {
          esm: codeBlocks[0],
          cjs: codeBlocks[1],
        },
      }
    }),
  )
  tr.track('transform::compile')

  // Generate output directory if necessary
  // @TODO should we delete previous output directory?
  if (!(await fs.exists(options.outDir))) {
    await fs.mkdir(options.outDir)
  }

  // Write output files
  await Promise.all(
    outputFiles.map(async ({filepath, files}) => {
      const esmFilepath = generateOutputPath(files.esm.filepath, 'js', {
        strip: 'src',
        outDir: options.outDir,
      })

      const cjsFilepath = generateOutputPath(files.cjs.filepath, 'cjs', {
        strip: 'src',
        outDir: options.outDir,
      })

      console.log('Writing file', esmFilepath)

      ftr.get(filepath).track('write::start')
      await Promise.all([
        await writeFile(esmFilepath, files.esm.code),
        files.esm.map && (await writeFile(`${esmFilepath}.map`, files.esm.map)),
        await writeFile(cjsFilepath, files.cjs.code),
        files.cjs.map && (await writeFile(`${cjsFilepath}.map`, files.cjs.map)),
      ])
      ftr.get(filepath).track('write::end')
    }),
  )
  tr.track('transform::write')

  console.log('parse:', tr.measure({end: 'transform::parse'}))
  console.log(
    'compile:',
    tr.measure({start: 'transform::parse', end: 'transform::compile'}),
  )
  console.log(
    'write:',
    tr.measure({start: 'transform::compile', end: 'transform::write'}),
  )
  console.log('---')
  // for (const tron of ftr.files.values()) {
  //   console.log(tron.data)
  // }
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

class TransformTracker {
  files: Map<string, Trace>
  constructor() {
    this.files = new Map()
  }

  register(id: string): Trace {
    const tron = new Trace({id}).on()
    this.files.set(id, tron)
    return tron
  }

  get(id: string): Trace {
    const tron = this.files.get(id)

    if (tron == null) {
      throw new Error(`${id} transform tracker not registered`)
    }

    return tron
  }
}
