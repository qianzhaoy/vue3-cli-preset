const elementPlus = require('../plugins/vue-cli-plugin-element-plus/generator')
const vantNextPlugin = require('../plugins/vue-cli-plugin-vant-next/generator')
const { ELEMENT_PLUS, VANT } = require('../constant')
const { cssPreprocessor } = require('./constants')

module.exports = function(api, opts, rootOptions) {
  const utils =require('./utils')(api)

  api.render('./template/src/common')
  api.render('./template/src/modules')

  api.extendPackage({
    dependencies: {
      'axios': '^0.21.1'
    },
    devDependencies: {
      ...cssPreprocessor[opts.cssPreprocessor]
    }
  })

  api.onCreateComplete(() => {
    utils.updateEslint((lintConfig) => {
      Object.assign(lintConfig.rules, {
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-unused-vars": "off"
      })
      return lintConfig
    })
  })

  switch (opts.ui_lib) {
    case ELEMENT_PLUS:
      elementPlus(api, opts, rootOptions)
      break;
    case VANT:
      vantNextPlugin(api, opts, rootOptions)
      break;
  }
}