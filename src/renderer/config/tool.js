/**
 * Created by Deboy on 2017/5/12.
 */
import defaultRow from './default-row'
import _ from 'lodash'
/**
 * 根据类型 来合并某个字段 并返回合并后的字段列表
 * @param type
 * @param rows
 * @returns {Array}
 */
export const mergeDefaultRow = (type = 'laravel', rows) => {
  if (rows instanceof Object) {
    return _.merge({}, defaultRow[type], rows)
  } else {
    let list = []
    rows.forEach((row) => {
      list.push(_.merge({}, defaultRow[type], row))
    })
    return list
  }
}

/**
 * 获取指定类型的的 字段配置
 * @param type
 * @returns {*}
 */
export const getDefaultRow = (type = 'laravel') => {
  return defaultRow[type]
}

// 将属性的值直接赋给属性 不用多一层属性 减少项目结构
let setValue = (obj = {}) => {
  for (let key in obj) {
    if (!key || obj[key].value === undefined) {
      continue
    }
    obj[key] = obj[key].value
  }
  return obj
}
// [{key: 'host', value: '127.0.0.1'}] => {host: '127.0.0.1'}
let arrayToObject = (list = []) => {
  let obj = {}
  list.forEach(item => {
    obj[item.key] = item.value
  })
  return obj
}
let splitToArray = (str) => {
  if (!str) {
    return null
  }
  let props = (str && str.split(';')) || []
  let obj = {}
  props.forEach(prop => {
    let propArr = prop.split(':')
    obj[propArr[0]] = propArr[1]
  })
  return obj
}
/**
 * 遍历一个字段属性 是数组的都转成 key -> value 对象
 * @param field
 * @returns {*}
 */
let setObjectPropToKeyValue = (field) => {
  Object.keys(field).forEach((key) => {
    if (field[key] instanceof Object && key !== 'filter') {
      field[key] = setValue(field[key])
    }
  })
  return field
}
let dealWithFields = (field) => {
  field = setObjectPropToKeyValue(field)
  if (field.customFilter) {
    field.customFilter = splitToArray(field.customFilter)
  }
  return field
}
// 查找关联表并设置one属性
export const transformProjectInfo = (project) => {
  let originProject = JSON.parse(JSON.stringify(project))
  project.props = arrayToObject(project.props)
  project.tables.forEach(table_1 => {
    // 将项目的属性也插入到表中
    table_1.projectProps = project.props
    table_1.props = arrayToObject(table_1.props)
    table_1.fields.forEach(originField => {
      let field
      // 将db vue 及项目自有属性都转化为 key=>vlaue 形式 方便模版渲染调用
      field = dealWithFields(originField)
      if (field.relTable) {
        originProject.tables.forEach(table_2 => {
          if (field.one) {
            return
          }
          if (table_2.id === field.relTable) {
            let newTable = JSON.parse(JSON.stringify(table_2))
            // 删除关联表的关联信息 防止死循环关联
            delete newTable.one
            delete newTable.relTable
            newTable.fields.map(_field => {
              return dealWithFields(_field)
            })
            field.one = table_2.fields
            field.relTable = table_2.name
            return
          }
        })
      }
    })
  })
  return project
}
