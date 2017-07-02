/**
 * Created by Deboy on 2017/5/16.
 */
// https://github.com/NEYouFan/nei-toolkit/blob/master/doc/Handlebars%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0%E9%9B%86.md
export default [
  {
    title: 'raw',
    comment: '用它包裹的内容按原样输出',
    highlight: false,
    variable: {
      name: 'myname'
    },
    template: `{{{{raw}}}}
  {{name}}
{{{{/raw}}}}`
  },
  {
    title: 'lowerFirst',
    comment: '将首字母小写',
    highlight: false,
    variable: {
      name: 'ProjectGroup'
    },
    template: `{{lowerFirst name}}`
  },
  {
    title: 'lowerFirst',
    comment: '将首字母小写',
    highlight: false,
    variable: {
      name: 'ProjectGroup'
    },
    template: `{{lowerFirst name}}`
  },
  {
    title: 'upperFirst',
    comment: '将首字母大写',
    highlight: false,
    variable: {
      name: 'id'
    },
    template: `{{upperFirst name}}`
  }
]