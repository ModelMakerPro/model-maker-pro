import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import BaseMixin from './mixins/base'
import App from './App'
import routes from './routes'
import store from './vuex/store'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import { remote } from 'electron'
import TreeView from 'vue-json-tree-view'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(iview)
Vue.mixin(BaseMixin)
Vue.use(require('./services/project'))
Vue.use(TreeView)
Vue.http = Vue.prototype.$http = axios
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

remote.globalShortcut.register('CommandOrControl+Shift+K', () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})

window.addEventListener('beforeunload', () => {
  remote.globalShortcut.unregisterAll()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
