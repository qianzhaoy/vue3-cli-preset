exports.ELEMENT_PLUS = 'element-plus'
exports.VANT = 'vant'

exports.ELE_LOCALE_DEFAULT = 'zh-cn'
exports.VANT_LOCALE_DEFAULT = 'zh-CN'

const cssPreprocessor = {
  nodeSass: {
    "node-sass": "^4.14.1",
    "sass-loader": "^8.0.2",
  },
  dartSass: {
    "sass": "^1.26.5",
    "sass-loader": "^8.0.2"
  },
  less: {
    "less": "^3.0.4",
    "less-loader": "^5.0.0"
  },
  stylus: {
    "stylus": "^0.54.7",
    "stylus-loader": "^3.0.2"
  }
}

exports.cssPreprocessor = cssPreprocessor