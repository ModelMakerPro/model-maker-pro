import Vue from 'vue'
import axios from 'axios'
import BaseMixin from './mixins/base'
import App from './App'
import router from './router'
import store from './store'
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
Vue.config.productionTip = false
Vue.config.debug = true

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
