/**
 * Created by Deboy on 2017/5/16.
 */
export default [
  {
    title: 'upperFirstAndDashToCamel',
    comment: '首字母大写驼峰式',
    highlight: false,
    variable: {
      name: 'user_address'
    },
    template: `class {{upperFirstAndDashToCamel name}}Controller extend Controller {
    // code somethings
}`
  },
  {
    title: 'dashToCamel',
    comment: '下划线转驼峰',
    highlight: false,
    variable: {
      name: 'user_address'
    },
    template: `class {{dashToCamel name}}Controller extend Controller {
    // code somethings
}`
  },
  {
    title: 'json',
    comment: 'JSON格式化变量',
    highlight: false,
    variable: {
      address: {
        text: 'addresstext'
      },
      user: {
        name: 'username'
      }
    },
    template: `{{{json this true}}}`
  }
]