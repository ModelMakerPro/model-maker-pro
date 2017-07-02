/**
 * Created by Deboy on 2017/4/2.
 */
import * as types from '../mutation-types'
import UUID from 'uuid'
import { PROJECTS, PROJECTS_INDEX, ON_EDIT_TABLE_INDEX } from './store-keys'
import { get } from '@/utils/localstorage'
const state = {
  list: get({key: PROJECTS, defaultVal: []}),
  index: parseInt(get({key: PROJECTS_INDEX, isObject: false, defaultVal: null})),
  editTableIndex: parseInt(get({key: ON_EDIT_TABLE_INDEX, isObject: false, defaultVal: null}))
}
const getters = {
  projectList (state) {
    return state.list
  },
  // 当起那选中项目的索引
  projectIndex (state) {
    return state.index
  },
  // 当前编辑的项目
  onEditProject () {
    if (state.list.length > 0 && state.index !== null) {
      return state.list[state.index]
    } else {
      return null
    }
  },
  projectTableIndexAndLabels (state) {
    let tables = state.list.length ? (state.index !== null && state.list[state.index] && state.list[state.index].tables) : []
    let indexs = []
    if (tables && tables.length > 0) {
      tables.forEach((table, index) => {
        indexs.push({
          index: index,
          name: table.name,
          comment: table.comment
        })
      })
    }
    return indexs
  },
  // 当前项目所有表
  projectTables (state) {
    return state.list.length ? (state.index !== null && state.list[state.index] && state.list[state.index].tables) : []
  },
  // 当前编辑的表格索引
  onEditTableIndex (state) {
    return state.editTableIndex
  },
  // 当前编辑的表格
  onEditTable (state) {
    return state.list.length ? (state.index !== null && state.list[state.index] && state.list[state.index].tables[state.editTableIndex || 0]) : {}
  }
}
const mutations = {
  // 新建项目
  [types.ADD_PROJECT] (state, payload) {
    state.list.push(Object.assign({}, {
      id: UUID.v1(),
      tables: [],
      type: payload.type,
      props: [
        {key: 'host', value: 'localhost', name: '数据库主机', extend: false, editable: true},
        {key: 'port', value: '3306', name: '数据库端口', extend: false, editable: true},
        {key: 'user', value: 'root', name: '数据库用户名', extend: false, editable: true},
        {key: 'password', value: '', name: '数据库密码', extend: false, editable: true},
        {key: 'database', value: payload.name, name: '数据库名称', extend: false, editable: true}
      ],
      defaultFields: []
    }, payload))
  },
  // 更新选中的项目索引
  [types.UPDATE_SELECT_INDEX] (state, index) {
    state.index = index
  },
  // 删除某个项目
  [types.DELETE_PROJECT] (state, payload) {
    state.list.splice(payload, 1)
  },
  // 更新某个项目
  [types.UPDATE_PROJECT] (state, payload) {
    Object.keys(state.list[state.index]).forEach(key => {
      state.list[state.index][key] = payload[key]
    })
  },
  // 添加表
  [types.ADD_PROJECT_TABLE] (state, payload) {
    let table = Object.assign({}, {
      id: UUID.v1(),
      props: [
        {key: 'deleteBatch', value: 0, name: '是否允许批量删除'}
      ]
    }, payload)
    state.list[state.index].tables.push(table)
  },
  [types.UPDATE_PROJECT_TABLE] (state, payload) {
    let tables = state.list[state.index].tables
    tables.forEach((table, index) => {
      if (table.id === payload.id) {
        tables[index] = Object.assign({}, table, payload)
        return true
      }
    })
    state.list[state.index].tables = Object.assign([], state.list[state.index].tables, tables)
  },
  [types.UPDATE_ON_EDIT_TABLE_INDEX] (state, id) {
    state.list[state.index].tables.forEach((table, index) => {
      if (table.id === id) {
        state.editTableIndex = index
        return true
      }
    })
  },
  [types.DELETE_PROJECT_TABLE] (state, index) {
    state.list[state.index].tables.splice(index, 1)
  },
  [types.MERGE_PROJECT_LIST] (state, payload) {
    let isExit = false
    let findIndex = -1
    state.list.forEach((item, index) => {
      if (item.id === payload.id) {
        findIndex = index
        isExit = true
      }
    })
    if (!isExit) {
      state.list.push(payload)
    } else {
      state.list.splice(findIndex, 1)
      state.list.splice(findIndex, 0, payload)
    }
  }
}
export default {
  state,
  getters,
  mutations
}
