const path = require('path')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
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
    ])
  }

  writing() {
    this.log('Scaffolding new component', this.answers.exportName)
    const files = [
      '__package.json',
      'readme.md',
      'tsconfig.json',
      'vite.config.ts',
      'src/index.tsx',
      'src/index.test.tsx',
      'src/component.tsx',
      'src/component.css.ts',
      'src/anatomy.css.ts',
      'src/variants.css.ts',
    ]

    for (let filename of files) {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(
          path.join(
            'packages',
            this.answers.hierarchy,
            this.answers.pkgName,
            filename.split('__').pop(),
          ),
        ),
        {...this.answers},
      )
    }
  }
}
