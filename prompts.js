const { ELEMENT_PLUS, VANT, ANDT_VUE, ANTD_LOCALE_DEFAULT, ELE_LOCALE_DEFAULT, VANT_LOCALE_DEFAULT } = require('./constant')
const elementLang = require('./plugins/vue-cli-plugin-element-plus/lang')
const vantLang = require('./plugins/vue-cli-plugin-vant-next/lang')
const antdLang = require('./plugins/vue-cli-plugin-ant-design-next/lang')

const uiLibLang = {
  [ELEMENT_PLUS]: elementLang,
  [VANT]: vantLang,
  [ANDT_VUE]: antdLang
}

const locale_defaults = {
  [ELEMENT_PLUS]: ELE_LOCALE_DEFAULT,
  [VANT]: VANT_LOCALE_DEFAULT,
  [ANDT_VUE]: ANTD_LOCALE_DEFAULT,
}

module.exports = [
  {
    type: 'list',
    name: 'ui_lib',
    message: '选择组件库',
    choices: [
      {
        name: 'element-ui',  value: ELEMENT_PLUS,
      },
      {
        name: 'vant-next', value: VANT
      },
      {
        name: 'antd-vue-next', value: ANDT_VUE
      },
    ]
  },
  {
    type: 'list',
    name: 'import',
    message: '组件引入方式',
    choices: [
      { name: '全量引入', value: 'full' },
      { name: '按需引入', value: 'partial' }
    ],
    default: 'full',
  },
  {
    when: answers => answers.import === 'full',
    type: 'confirm',
    name: 'customTheme',
    message: '是否覆写组件库的主题变量?',
    default: false,
  },
  {
    type: 'list',
    name: 'lang',
    message: "组件库国际化",
    default: answers => locale_defaults[answers.ui_lib],
    choices: answers => uiLibLang[answers.ui_lib].map(locale => ({
      name: locale,
      value: locale
    }))
  },
  {
    type: 'list',
    name: 'cssPreprocessor',
    message: 'css预处理器(和组件库一致即可)',
    choices: [
      {
        name: 'Sass/SCSS (with dart-sass)', value: 'dartSass',
      },
      {
        name: 'Sass/SCSS (with node-sass) ', value: 'nodeSass',
      },
      {
        name: 'less', value: 'less',
      },
      {
        name: 'stylus', value: 'stylus',
      }
    ]
  }
]