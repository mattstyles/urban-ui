import type {PlopTypes} from '@turbo/gen'
import * as Helpers from './helpers'

export default async function generator(plop: PlopTypes.NodePlopAPI) {
  /**
   * Set helpers
   */
  console.log(Helpers)
  Object.entries(Helpers).forEach(([name, fn]) => {
    plop.setHelper(name, fn)
  })

  /**
   * Component package generator
   */
  plop.setGenerator('component', {
    description: 'Component package generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the brief description of the package?',
      },
      {
        type: 'input', // @TODO type select
        name: 'hierarchy',
        message: 'Where is the component in the hierarchy?',
      },
    ],
    actions: (answers) => {
      if (answers == null) {
        throw new Error('No answers block received')
      }
      const templatePath = 'templates/component/'
      return [
        {
          type: 'addMany',
          destination: 'packages/{{hierarchy}}/{{name}}',
          base: templatePath,
          templateFiles: templatePath + '**',
          globOptions: {
            dot: true,
          },
        },
      ]
    },
  })
}
