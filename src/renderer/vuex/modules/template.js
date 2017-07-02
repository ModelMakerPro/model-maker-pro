import * as types from '../mutation-types'
import { get, save } from '../../utils/localstorage'
import { TEMPLATE_SETTINGS } from './store-keys'
const defaultConfigs = {
  dir: null,
  list: get(TEMPLATE_SETTINGS, [])
}
const state = get({
  key: TEMPLATE_SETTINGS,
  defaultVal: defaultConfigs
})
const getters = {
  templateDir () {
    return state.dir
  },
  templateList (state) {
    return state.list
  },
  templateSettings () {
    return state
  }
}
const mutations = {
  [types.UPDATE_TEMPLATE_SETTINGS] (state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
    save({key: TEMPLATE_SETTINGS, value: state})
  },
  [types.UPDATE_TEMPLATE_LIST] (state, payload) {
    state.list = payload
    save({key: TEMPLATE_SETTINGS, value: state})
  },
  [types.MERGE_TEMPLATE_LIST] (state, payload) {
    payload.forEach((template, index) => {
      payload[index] = Object.assign({}, {
        // 导出文件的后缀
        suffix: '',
        // 首字母大写
        filenameFormat: '',
        // 默认的导出类型
        type: 'list'
      }, template)
    })
    state.list = payload
    save({key: TEMPLATE_SETTINGS, value: state})
  }
}
export default {
  state,
  getters,
  mutations
}
