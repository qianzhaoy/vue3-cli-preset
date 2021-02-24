  <%_ if (options.import === 'full') { _%>
  <%_ if (options.lang !== 'zh-CN') { _%>
  import Vant, { Locale } from 'vant'
  <%_ } else { _%>
  import Vant from "vant";
  <%_ } _%>
  <%_ if (options.customTheme) { _%>
  import '../vant-variables.less'
  <%_ } else { _%>
  import 'vant/lib/index.css'
  <%_ } _%> 
  <%_ } else { _%>
  import { Button, Locale } from 'vant'
  <%_ } _%>
  <%_ if (options.lang !== 'zh-CN') { _%>
  // @ts-ignore
  import lang from 'vant/es/locale/lang/<%= options.lang %>'
  <%_ } _%>
  
  export default (app) => {
    <%_ if (options.lang !== 'zh-CN') { _%>
    Locale.use('<%= options.lang %>', lang)
    <%_ } _%>
    <%_ if (options.import === 'full') { _%>
    app.use(Vant)
    <%_ } else { _%>
    app.use(Button)
    <%_ } _%>
  }