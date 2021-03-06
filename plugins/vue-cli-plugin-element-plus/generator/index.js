module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      'element-plus': '^1.0.2-beta.32'
    }
  })

  api.injectImports(api.entryFile, `import installElementPlus from './plugins/element'`)

  api.render({
    './src/plugins/element.ts': './templates/src/plugins/element.ts',
  })

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  } else if (opts.customTheme) {
    api.render({
      './src/element-variables.scss': './templates/src/element-variables.scss'
    })
    api.extendPackage({
      devDependencies: {
        "sass": "^1.26.5",
        "sass-loader": "^8.0.2"
      }
    })
  }

  api.afterInvoke(() => {
    const mainEntry = utils.getMain()
    const { EOL } = require('os')
    const fs = require('fs')
    const contentMain = fs.readFileSync(api.resolve(mainEntry), { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/createApp\(App\)/))
    lines[renderIndex] = lines[renderIndex].replace(/(createApp\(App\))/, '$1.use(installElementPlus)')
    fs.writeFileSync(api.resolve(mainEntry), lines.join(EOL), { encoding: 'utf-8' })
  })

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = ['component', {
          'libraryName': 'element-plus',
          'styleLibraryName': 'theme-chalk'
        }]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}
