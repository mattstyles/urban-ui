import type {Plugin} from './configs/plugins'
import type {TaskInputParameters, TaskReturnType} from './transform/task.ts'
import type {PipelineContext} from './transform/context.ts'
import type {Options, Output as SwcOutput} from '@swc/core'

import swc from '@swc/core'
import path from 'node:path'
import fs from 'node:fs/promises'
import {PerformanceObserver, performance} from 'node:perf_hooks'

import {debug} from './log'
import {traceFn} from './trace.ts'
import {jscOps} from './configs/jsc.ts'
import {minify} from './configs/minify.ts'
import {transformImports} from './configs/plugins.ts'
import {createTask} from './transform/task.ts'
import {Pipeline} from './transform/pipeline.ts'
import {measure, fileEvents} from './transform/analytics.ts'

type TransformContext = {
  outDir: string
}

/**
 * Reads the input files, maps to cjs and esm formats, writes code and map files to output directory with correct extensions.
 */
export async function transformFiles(
  files: Array<string>,
  options: {
    outDir: string
  },
) {
  const pipeline = new Pipeline<
    TransformContext,
    TaskInputParameters<typeof parse>,
    TaskReturnType<typeof write>
  >('transform', {
    outDir: options.outDir,
  })
  pipeline.addStep(parse)
  pipeline.addStep(compile)
  pipeline.addStep(write)

  // Add file tracker
  files.forEach((filepath) => {
    pipeline.ctx.ftrace.register(filepath)
  })

  debug.rk('Running transform pipeline')
  const output = await pipeline.run({files})

  // Generate pipeline analytics
  return pipeline.generateStatistics()
}

const parse = createTask(
  'parse',
  async (ctx, {files}: {files: Array<string>}) => {
    const measurement = measure(fileEvents.parse)
    return await Promise.all(
      files.map((filepath) => {
        ctx.ftrace.get(filepath).track(measurement.start)
        const file = readFile(filepath)
        ctx.ftrace.get(filepath).track(measurement.end)
        return file
      }),
    )
  },
)

const compile = createTask(
  'compile',
  async (ctx, files: Awaited<TaskReturnType<typeof parse>>) => {
    const mCompile = measure(fileEvents.compile)
    /**
     * Attempting to run in parallel (for what is probably a synchronous task) nukes individual timings
     */
    return await Promise.all(
      files.map(async ({file, filepath}) => {
        ctx.ftrace.get(filepath).track(mCompile.start)

        const codeBlocks = await Promise.all([
          traceFn(
            fileEvents['compile::esm'],
            ctx.ftrace.get(filepath),
            async () => {
              return await transformFile({
                code: file,
                filename: filepath,
                overrides: {
                  module: {
                    type: 'es6',
                  },
                },
                plugins: [transformImports('js')],
              })
            },
          ),
          traceFn(
            fileEvents['compile::cjs'],
            ctx.ftrace.get(filepath),
            async () => {
              return await transformFile({
                code: file,
                filename: filepath,
                overrides: {
                  module: {
                    type: 'commonjs',
                  },
                },
                plugins: [transformImports('cjs')],
              })
            },
          ),
        ])

        ctx.ftrace.get(filepath).track(mCompile.end)

        return {
          filepath: filepath,
          files: {
            esm: codeBlocks[0],
            cjs: codeBlocks[1],
          },
        }
      }),
    )
  },
)

const write = createTask(
  'write',
  async (
    ctx: PipelineContext<TransformContext>,
    files: Awaited<TaskReturnType<typeof compile>>,
  ) => {
    if (!(await fs.exists(ctx.outDir))) {
      await fs.mkdir(ctx.outDir as string)
    }

    const measurement = measure(fileEvents.write)

    await Promise.all(
      files.map(async ({filepath, files}) => {
        const esmFilepath = generateOutputPath(files.esm.filepath, 'js', {
          strip: 'src',
          outDir: ctx.outDir,
        })

        const cjsFilepath = generateOutputPath(files.cjs.filepath, 'cjs', {
          strip: 'src',
          outDir: ctx.outDir,
        })

        console.log('Writing file', esmFilepath)

        ctx.ftrace.get(filepath).track(measurement.start)
        await Promise.all([
          writeFile(esmFilepath, files.esm.code),
          files.esm.map && writeFile(`${esmFilepath}.map`, files.esm.map),
          writeFile(cjsFilepath, files.cjs.code),
          files.cjs.map && writeFile(`${cjsFilepath}.map`, files.cjs.map),
        ])
        ctx.ftrace.get(filepath).track(measurement.end)
      }),
    )

    return files
  },
)

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
