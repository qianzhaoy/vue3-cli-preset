const elementLang = require('./lang/element')
const vantLang = require('./lang/vant')
const { ELEMENT_PLUS, VANT, ELE_LOCALE_DEFAULT, VANT_LOCALE_DEFAULT } = require('./constant')

const uiLibLang = {
  [ELEMENT_PLUS]: elementLang,
  [VANT]: vantLang
}

const locale_defaults = {
  [ELEMENT_PLUS]: ELE_LOCALE_DEFAULT,
  [VANT]: VANT_LOCALE_DEFAULT
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
        name: 'vant', value: VANT
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
    name: '自定义主题',
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
  }
]