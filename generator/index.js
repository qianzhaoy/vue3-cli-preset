const elementPlus = require('../plugins/vue-cli-plugin-element-plus/generator')
const { ELEMENT_PLUS, VANT } = require('../constant')
module.exports = function(api, opts, rootOptions) {
  api.render({
    './src/constants/enums.ts': './template/src/constants/enums.ts',
    './src/constants/config.ts': './template/src/constants/config.ts',
  })

  switch (opts.ui_lib) {
    case ELEMENT_PLUS:
      elementPlus(api, opts, rootOptions)
      break;
    case VANT:
      break;
  }
}