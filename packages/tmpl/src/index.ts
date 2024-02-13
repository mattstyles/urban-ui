import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {NodePlopAPI} from 'plop'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function (plop: NodePlopAPI) {
  // plop generator code
  console.log('plopping')

  plop.setGenerator('test', {
    description: 'test genny',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: path.resolve(
          __dirname,
          '../templates/pkg/__package.json',
        ),
      },
    ],
  })
}
