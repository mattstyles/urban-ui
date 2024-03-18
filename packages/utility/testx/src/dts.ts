import ts from 'typescript'

const configPath = ts.findConfigFile(
  /*searchPath*/ './',
  ts.sys.fileExists,
  'tsconfig.json',
)

console.log(configPath)
if (configPath == null) {
  throw new Error('can not read config path')
}
// if (configPath != null) {
//   const out = ts.convertCompilerOptionsFromJson({}, configPath)
//   // const out = ts.sys.readFile(configPath)
//   console.log(out)
// }
const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
const conf = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './')

console.log('**>')
console.log(conf)
console.log('<**')

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  // Create a Program with an in-memory emit

  const opts = {
    ...conf.options,
    ...options,
  }
  console.log('building with', opts)
  const createdFiles = {}
  const host = ts.createCompilerHost(opts)

  host.writeFile = (fileName: string, contents: string) => {
    // @ts-expect-error
    return (createdFiles[fileName] = contents)
  }

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, opts, host)
  program.emit()

  console.log('-->')
  console.log(createdFiles)
  console.log('<--')
  console.log(Object.keys(createdFiles))

  // Loop through all the input files
  fileNames.forEach((file) => {
    console.log('### JavaScript\n')
    console.log(host.readFile(file))

    console.log('### Type Definition\n')
    console.log(file)
    const dts = file.replace('.js', '.d.ts')
    console.log(dts)
    // @ts-expect-error ds
    console.log(createdFiles[dts])
  })
}

console.log('reading', process.argv.slice(2))
compile(process.argv.slice(2), {
  // jsx: ts.JsxEmit.ReactJSX,
  // lib: ['ES2015', 'dom', 'dom.iterable', 'esnext'],
  // target: ts.ScriptTarget.ES2015,
  // module: ts.ModuleKind.ESNext,
  // moduleResolution: ts.ModuleResolutionKind.NodeNext,
  // allowJs: true,
  noEmit: false,
  declaration: true,
  emitDeclarationOnly: true,
  // composite: true,
  declarationMap: true,
  outDir: './dist',
  // baseUrl: './src',
})
