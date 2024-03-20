import type {Plugin} from './configs/plugins'
import type {TaskInputParameters, TaskReturnType} from './transform/task.ts'
import type {PipelineContext} from './transform/context.ts'
import type {Options, Output as SwcOutput} from '@swc/core'
import swc from '@swc/core'
import path from 'node:path'
import fs from 'node:fs/promises'
import {PerformanceObserver, performance} from 'node:perf_hooks'

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

export async function transformFilesPipeline(
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

  const output = await pipeline.run({files})

  // console.log(
  //   'parse',
  //   pipeline.ctx.tron.measure({
  //     start: 'parse::start',
  //     end: 'parse::end',
  //   }),
  // )
  // console.log(
  //   'compile',
  //   pipeline.ctx.tron.measure({
  //     start: 'compile::start',
  //     end: 'compile::end',
  //   }),
  // )
  // console.log(
  //   'write',
  //   pipeline.ctx.tron.measure({
  //     start: 'write::start',
  //     end: 'write::end',
  //   }),
  // )

  // console.log(pipeline.ctx.ftrace)
  // console.log(output)

  // const comp = pipeline.ctx.ftrace.get('src/testx.tsx')
  // const compCompileTimes = [
  //   comp.measure({
  //     start: 'compile::esm::start',
  //     end: 'compile::esm::end',
  //   }),
  //   comp.measure({
  //     start: 'compile::cjs::start',
  //     end: 'compile::cjs::end',
  //   }),
  //   comp.measure({
  //     start: 'compile::start',
  //     end: 'compile::end',
  //   }),
  // ]
  // console.log(compCompileTimes)

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
    const mCompileEsm = measure(fileEvents['compile::esm'])
    const mCompileCjs = measure(fileEvents['compile::cjs'])
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
          await writeFile(esmFilepath, files.esm.code),
          files.esm.map &&
            (await writeFile(`${esmFilepath}.map`, files.esm.map)),
          await writeFile(cjsFilepath, files.cjs.code),
          files.cjs.map &&
            (await writeFile(`${cjsFilepath}.map`, files.cjs.map)),
        ])
        ctx.ftrace.get(filepath).track(measurement.end)
      }),
    )

    return files
  },
)

/**
 * Reads the input files, maps to cjs and esm formats, writes code and map files to output directory with correct extensions.
 * Outputs type definitions
 */
// export async function transformFiles(
//   files: Array<string>,
//   options: {
//     outDir: string
//   },
// ) {
//   const tr = new Trace().on()
//   const ftr = new TransformTracker()

//   // @TODO turn this in to a pipeline configuration

//   // Read input files
//   const parsedFiles = await Promise.all(
//     files.map((filepath) => {
//       ftr.register(filepath)
//       ftr.get(filepath).track('parse::start')
//       const file = readFile(filepath)
//       ftr.get(filepath).track('parse::end')
//       return file
//     }),
//   )
//   tr.track('transform::parse')

//   // Compile inputs to esm and cjs
//   const outputFiles = await Promise.all(
//     parsedFiles.map(async ({file, filepath}) => {
//       ftr.get(filepath).track('compile::start')
//       const codeBlocks = await Promise.all([
//         await transformFile({
//           code: file,
//           filename: filepath,
//           overrides: {
//             module: {
//               type: 'es6',
//             },
//           },
//           plugins: [transformImports('js')],
//         }),
//         await transformFile({
//           code: file,
//           filename: filepath,
//           overrides: {
//             module: {
//               type: 'commonjs',
//             },
//           },
//           plugins: [transformImports('cjs')],
//         }),
//       ])
//       ftr.get(filepath).track('compile::end')
//       return {
//         filepath: filepath,
//         files: {
//           esm: codeBlocks[0],
//           cjs: codeBlocks[1],
//         },
//       }
//     }),
//   )
//   tr.track('transform::compile')

//   // Generate output directory if necessary
//   // @TODO should we delete previous output directory?
//   if (!(await fs.exists(options.outDir))) {
//     await fs.mkdir(options.outDir)
//   }

//   // Write output files
//   await Promise.all(
//     outputFiles.map(async ({filepath, files}) => {
//       const esmFilepath = generateOutputPath(files.esm.filepath, 'js', {
//         strip: 'src',
//         outDir: options.outDir,
//       })

//       const cjsFilepath = generateOutputPath(files.cjs.filepath, 'cjs', {
//         strip: 'src',
//         outDir: options.outDir,
//       })

//       console.log('Writing file', esmFilepath)

//       ftr.get(filepath).track('write::start')
//       await Promise.all([
//         await writeFile(esmFilepath, files.esm.code),
//         files.esm.map && (await writeFile(`${esmFilepath}.map`, files.esm.map)),
//         await writeFile(cjsFilepath, files.cjs.code),
//         files.cjs.map && (await writeFile(`${cjsFilepath}.map`, files.cjs.map)),
//       ])
//       ftr.get(filepath).track('write::end')
//     }),
//   )
//   tr.track('transform::write')

//   console.log('parse:', tr.measure({end: 'transform::parse'}))
//   console.log(
//     'compile:',
//     tr.measure({start: 'transform::parse', end: 'transform::compile'}),
//   )
//   console.log(
//     'write:',
//     tr.measure({start: 'transform::compile', end: 'transform::write'}),
//   )
//   console.log('---')
//   // for (const tron of ftr.files.values()) {
//   //   console.log(tron.data)
//   // }
// }

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
