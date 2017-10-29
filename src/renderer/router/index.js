import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('../views/Home.vue').default
    },
    {
      path: '/NewProject',
      name: 'NewProject',
      component: require('../views/NewProject.vue').default
    },
    {
      path: '/FieldEditor',
      name: 'FieldEditor',
      component: require('../views/FieldEditor.vue').default
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: require('../views/Settings.vue').default,
      redirect: to => {
        // 方法接收 目标路由 作为参数
        return '/Settings/base'
      },
      children: [
        {
          path: '/Settings/base',
          name: 'baseSettings',
          component: require('../views/Settings/Base.vue').default
        },
        {
          path: '/Settings/template',
          name: 'templateSettings',
          component: require('../views/Settings/Template.vue').default
        },
        {
          path: '/Settings/logs',
          name: 'logsSettings',
          component: require('../views/Settings/Logs.vue').default
        }
      ]
    },
    {
      path: '/ExportPage',
      name: 'ExportPage',
      component: require('../views/ExportPage.vue').default
    },
    {
      path: '/Helper',
      name: 'Helper',
      component: require('../views/Helper.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
