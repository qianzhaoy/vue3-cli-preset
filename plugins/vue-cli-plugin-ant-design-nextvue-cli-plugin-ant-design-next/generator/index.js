module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)
  const hasTs = api.hasPlugin('typescript')

  api.extendPackage({
    dependencies: {
      'ant-design-vue': '^2.0.1'
    }
  })

  api.injectImports(utils.getMain(), `import installAntdVue from './plugins/ant-design-vue'`)

  api.render(hasTs ? {
    './src/plugins/ant-design-vue.ts': './templates/src/plugins/ant-design-vue.ts',
  } : {
    './src/plugins/ant-design-vue.js': './templates/src/plugins/ant-design-vue.js',
  })

  // if(opts.lang !== 'en_US') {
  //   api.render({
  //     './src/App.vue': './templates/src/customLangApp.vue'
  //   })
  // } else {
  //   api.render({
  //     './src/App.vue': './templates/src/App.vue'
  //   })
  // }

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-import': '^1.11.0'
      }
    })
    api.extendPackage({
      devDependencies: {
        'less-loader': '^5.0.0',
        'less': '3.0.4'
      }
    })
  } else if (opts.customTheme) {
    api.render({
      './src/antd-variables.less': './templates/src/antd-variables.less'
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
    lines[renderIndex] = lines[renderIndex].replace(/(createApp\(App\))/, '$1.use(installAntdVue)')
    fs.writeFileSync(api.resolve(mainEntry), lines.join(EOL), { encoding: 'utf-8' })
  })

  api.afterInvoke(() => {
    let config
    const fs = require('fs')
    const vueconfPath = api.resolve('./vue.config.js')
    const cssloaderOpts = {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
    if (fs.existsSync(vueconfPath)) {
      config = require(vueconfPath)
      config.css = cssloaderOpts
    } else {
      config = {
        css: cssloaderOpts
      }
      
    }
    const moduleExports = 'module.exports = '
    fs.writeFileSync(
      vueconfPath,
      `${moduleExports}${JSON.stringify(config, null, 2)}`,
      { encoding: 'utf8' }
    )
  })

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = ['import', {
          'libraryName': 'ant-design-vue',
          'libraryDirectory': 'es', 
          'style': true
        }]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}
