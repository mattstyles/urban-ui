import ts from 'typescript'

type FilesDts = Record<string, string>

export async function generateDefinitions(
  files: Array<string>,
  options: {
    outDir: string
  },
) {
  // Get tsconfig, will throw if it can not find it
  const config = readConfigFile()

  // Generate d.ts files
  const start = performance.now()
  const outputFiles = compile(files, {
    ...config.options,
    noEmit: false,
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: true,
    outDir: options.outDir,
  })
  console.log('DTS compilation', performance.now() - start)

  // Write definitions to disk
  await Promise.all(
    Object.entries(outputFiles).map(([filepath, content]) => {
      writeFile(filepath, content)
    }),
  )
}

function readConfigFile() {
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
  return conf
}

function compile(fileNames: string[], options: ts.CompilerOptions): FilesDts {
  const createdFiles: FilesDts = {}
  const host = ts.createCompilerHost(options)
  host.writeFile = (fileName: string, contents: string) => {
    return (createdFiles[fileName] = contents)
  }

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, options, host)
  program.emit()

  return createdFiles
}

async function writeFile(filepath: string, content: string) {
  await Bun.write(filepath, content)
}
