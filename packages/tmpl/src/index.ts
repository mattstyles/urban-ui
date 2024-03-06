import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {NodePlopAPI} from 'plop'
import {findPackageRoot} from './package.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function (plop: NodePlopAPI) {
  const root = await findPackageRoot()
  console.log(process.cwd(), root)

  if (root == null) {
    console.error('Can not find urban-ui root')
    process.exit(1)
  }

  plop.setGenerator('package', {
    description: 'Component package generator',
    prompts: [
      {
        type: 'input',
        name: 'pkgName',
        message: 'What is the package name?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the brief description of the package?',
      },
      {
        type: 'input',
        name: 'exportName',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'hierarchy',
        message: 'Where is the component in the hierarchy?',
      },
    ],
    actions: (answers) => {
      if (answers == null) {
        throw new Error('No answers block received')
      }
      return [
        {
          type: 'addMany',
          destination: path.resolve(
            root,
            'packages',
            answers.hierarchy,
            answers.name,
          ),
          templateFiles: path.resolve(__dirname, '../template/pkg'),
        },
      ]
      // return [
      //   {
      //     type: 'add',
      //     path: path.resolve(
      //       root,
      //       'packages',
      //       answers.hierarchy,
      //       answers.name,
      //       'package.json',
      //     ),
      //     templateFile: path.resolve(
      //       __dirname,
      //       '../templates/pkg/__package.json',
      //     ),
      //   },
      // ]
    },
  })
}
