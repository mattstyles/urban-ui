import type {TaskInputParameters, TaskReturnType} from './transform/task.ts'

import ts from 'typescript'

import {createTask} from './transform/task.ts'
import {Pipeline} from './transform/pipeline.ts'
import {debug} from './log'

type FilesDts = Record<string, string>

/**
 * Grabs the tsconfig file and writes ts definition files to disk
 */
export async function generateDefinitions(
  /**
   * @TODO a single entrypoint is faster, add config item to be able to specify a different set of entrypoints for dts than for compilation phase
   */
  files: Array<string>,
  options: {
    outDir: string
  },
) {
  // Get tsconfig, will throw if it can not find it
  // const config = readConfigFile()

  // // Generate d.ts files
  // const start = performance.now()
  // async function fn() {
  //   return _compile(files, {
  //     ...config.options,
  //     noEmit: false,
  //     declaration: true,
  //     emitDeclarationOnly: true,
  //     declarationMap: true,
  //     outDir: options.outDir,
  //   })
  // }
  // const outputFiles = await fn()
  // const outputFiles = _compile(files, {
  //   ...config.options,
  //   noEmit: false,
  //   declaration: true,
  //   emitDeclarationOnly: true,
  //   declarationMap: true,
  //   outDir: options.outDir,
  // })

  const pipeline = new Pipeline<
    any,
    TaskInputParameters<typeof readConfig>,
    TaskReturnType<typeof write>
  >('dts')
  pipeline.addStep(readConfig)
  pipeline.addStep(
    compile(files, {
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      declarationMap: true,
      outDir: options.outDir,
    }),
  )
  pipeline.addStep(write)

  debug.rk('Running dts pipeline')
  const output = await pipeline.run({
    searchPath: './',
    filename: 'tsconfig.json',
  })

  // console.log('DTS compilation', performance.now() - start)

  // Write definitions to disk
  // await Promise.all(
  //   Object.entries(output.files).map(([filepath, content]) => {
  //     // writeFile(filepath, content)
  //     console.log(filepath)
  //   }),
  // )

  return pipeline.generateStatistics()
}

const readConfig = createTask(
  'readConfig',
  async (ctx, opts: {searchPath: string; filename: string}) => {
    const configPath = ts.findConfigFile(
      /*searchPath*/ './',
      ts.sys.fileExists,
      'tsconfig.json',
    )
    if (configPath == null) {
      throw new Error('can not read config path')
    }

    const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
    const conf = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './')
    return {conf}
  },
)

const compile = (files: Array<string>, overrides: ts.CompilerOptions) =>
  createTask(
    'compile',
    async (ctx, opts: Awaited<TaskReturnType<typeof readConfig>>) => {
      const options = {
        ...opts.conf.options,
        ...overrides,
      }

      const createdFiles: FilesDts = {}
      const host = ts.createCompilerHost(options)
      host.writeFile = (filename: string, contents: string) => {
        return (createdFiles[filename] = contents)
      }

      // Prepare and emit the d.ts files
      const program = ts.createProgram(files, options, host)
      program.emit()

      return {files: createdFiles}
    },
  )

const write = createTask(
  'write',
  async (ctx, {files}: Awaited<TaskReturnType<ReturnType<typeof compile>>>) => {
    await Promise.all(
      Object.entries(files).map(([filepath, content]) => {
        return writeFile(filepath, content)
      }),
    )

    return files
  },
)

// function readConfigFile() {
//   const configPath = ts.findConfigFile(
//     /*searchPath*/ './',
//     ts.sys.fileExists,
//     'tsconfig.json',
//   )
//   if (configPath == null) {
//     throw new Error('can not read config path')
//   }

//   const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
//   const conf = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './')
//   return conf
// }

// function _compile(fileNames: string[], options: ts.CompilerOptions): FilesDts {
//   const createdFiles: FilesDts = {}
//   const host = ts.createCompilerHost(options)
//   host.writeFile = (fileName: string, contents: string) => {
//     return (createdFiles[fileName] = contents)
//   }

//   // Prepare and emit the d.ts files
//   const program = ts.createProgram(fileNames, options, host)
//   program.emit()

//   return createdFiles
// }

async function writeFile(filepath: string, content: string) {
  await Bun.write(filepath, content)
}
