const localeList = require('./lang.js')

module.exports = [
  {
    type: 'list',
    name: 'import',
    message: '组件库引入方式?',
    choices: [
      { name: '全局引入', value: 'full' },
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
    message: '选择语言国际化',
    choices: localeList.map(locale => ({
      name: locale,
      value: locale
    })),
    default: 'zh-CN'
  }
]
