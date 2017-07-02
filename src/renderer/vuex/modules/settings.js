/**
 * Created by Deboy on 2017/3/26.
 */
import * as types from '../mutation-types'
import { get } from '../../utils/localstorage'
import { SETTINGS } from './store-keys'
const defaultSettings = {
  workspace: null,
  // 模版存放文件夹
  templateDir: null,
  // 日志记录
  logs: [],
  // 在新建表的时候自动添加字段
  autoAddFieldWhenTableCreate: true,
  // 超过100条自动清理日志
  autoClearLogs: true
}
const state = get({
  key: SETTINGS,
  defaultVal: defaultSettings
})
const getters = {
  allSettings () {
    return state
  },
  workspace (state) {
    return state.workspace
  },
  autoClearLogs () {
    return state.autoClearLogs
  },
  autoAddFieldWhenTableCreate () {
    return state.autoAddFieldWhenTableCreate
  },
  logs (state) {
    return state.logs
  }
}
const mutations = {
  [types.UPDATE_SETTINGS] (state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  },
  [types.SAVE_LOG] (state, payload) {
    state.logs.push(payload)
    // 保留前100条日志
    if (state.autoClearLogs && state.logs.length > 100) {
      state.logs = state.logs.slice(state.logs.length - 100)
    }
  },
  [types.CLEAR_LOG] (state) {
    state.logs = []
  },
  [types.RESET_SETTINGS] (state) {
    Object.keys(defaultSettings).forEach((keys) => {
      state[keys] = defaultSettings[keys]
    })
  }
}
export default {
  state,
  getters,
  mutations
}
