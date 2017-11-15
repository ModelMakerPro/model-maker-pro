/**
 * Created by Deboy on 2017/5/16.
 */
export default [
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
    title: 'camelToDash',
    comment: '驼峰转下划线',
    highlight: false,
    variable: {
      name: 'userAddress'
    },
    template: `{{camelToDash name}}`
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
  },
  {
    title: 'multiple helper',
    comment: '同时使用多个Helper',
    highlight: false,
    variable: {
      name: 'user_address'
    },
    template: `{{upperFirst (dashToCamel name)}}`
  },
]