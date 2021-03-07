module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      'vant': '^3.0.6'
    }
  })

  api.injectImports(api.entryFile, `import installVant from './plugins/vant'`)

  const hasTs = api.hasPlugin('typescript')
  api.render(hasTs ? {
    './src/plugins/vant.ts': './templates/src/plugins/vant.ts',
  } : {
    './src/plugins/vant.js': './templates/src/plugins/vant.js',
  })

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-import': '^1.13.3'
      }
    })
  } else if (opts.customTheme) {
    api.render({
      './src/vant-variables.less': './templates/src/vant-variables.less'
    })
    api.extendPackage({
      devDependencies: {
        'less-loader': '^5.0.0',
        'less': '3.0.4'
      }
    })
  }

  api.afterInvoke(() => {
    const { EOL } = require('os')
    const fs = require('fs')
    const mainEntry = utils.getMain()
    const contentMain = fs.readFileSync(api.resolve(mainEntry), { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/createApp\(App\)/))
    lines[renderIndex] = lines[renderIndex].replace(/(createApp\(App\))/, '$1.use(installVant)')
    fs.writeFileSync(api.resolve(mainEntry), lines.join(EOL), { encoding: 'utf-8' })
  })

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = ['import', {
          'libraryName': 'vant',
          libraryDirectory: 'es',
          style: true
        }, 'vant']
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}