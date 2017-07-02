export default [
  {
    path: '/',
    name: 'Home',
    component: require('views/Home')
  },
  {
    path: '/FieldEditor',
    name: 'FieldEditor',
    component: require('views/FieldEditor')
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: require('views/Settings'),
    redirect: to => {
      // 方法接收 目标路由 作为参数
      return '/Settings/base'
    },
    children: [
      {
        path: '/Settings/base',
        name: 'baseSettings',
        component: require('views/Settings/base')
      },
      {
        path: '/Settings/template',
        name: 'templateSettings',
        component: require('views/Settings/template')
      },
      {
        path: '/Settings/logs',
        name: 'logsSettings',
        component: require('views/Settings/logs')
      }
    ]
  },
  {
    path: '/ExportPage',
    name: 'ExportPage',
    component: require('views/ExportPage')
  },
  {
    path: '/Helper',
    name: 'Helper',
    component: require('views/Helper')
  },
  {
    path: '*',
    redirect: '/'
  }
]
