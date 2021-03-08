<%_ if (options.import === 'full') { _%>
import Antd from 'ant-design-vue'
<%_ if (options.customTheme) { _%>
import '../antd-variables.less'
<%_ } else { _%>
import 'ant-design-vue/dist/antd.css'
<%_ } _%>
<%_ } else { _%>
import { Pagination, Button } from 'ant-design-vue'
import { LocaleProvider } from 'ant-design-vue'
<%_ } _%>

export default (app) => {
  <%_ if (options.import === 'full') { _%>
  app.use(Antd)
  <%_ } else { _%>
  <%_ if (options.lang !== 'en_US') { _%>
  app.use(LocaleProvider)
  <%_ } _%>
  app.use(Pagination).use(Button)
  <%_ } _%>
}