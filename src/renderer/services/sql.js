import * as projectConfigs from '../project-configs'
const Sequelize = require('sequelize')
const requireFromString = require('require-from-string')
const path = require('path')
const fs = require('fs')

let isSelect = (comment = '') => {
  return comment && comment.indexOf('{') >= 0 && comment.indexOf('}') >= 0
}
let getType = (type, comment = '') => {
  if (typeof type === 'function') {
    return 'datetime'
  } else {
    // TODO 这里类型判断没有统一的写法 只是为了临时生成 需要改进
    if (isSelect(comment)) {
      return 'select'
    } else {
      return 'text'
    }
  }
}
let getTitle = (comment = '') => {
  let titleSplitStrLastIndex = comment.indexOf(']')
  let titleStr = comment.substring(0, titleSplitStrLastIndex)
  return titleStr && titleStr.replace('[', '').replace(']', '')
}
let getFilter = (comment = '') => {
  if (isSelect(comment)) {
    let titleIndex = comment.indexOf(']')
    let optionsStr = comment.substring(titleIndex + 1, comment.length)
    let afterRemoveSplitStr = optionsStr.replace('{', '').replace('}', '')
    return afterRemoveSplitStr.replace(',', ';')
  } else {
    return null
  }
}
let excludedFields = [
  'del',
  'delDtm'
]
export const transform = (modelPath = '', projectType = 'springboot') => {
  let tables = []
  if (modelPath) {
    let myTransform = {
      define: (name, model) => {
        let fields = []
        for (let fieldKey in model) {
          if (excludedFields.indexOf(fieldKey) < 0) {
            let field = model[fieldKey]
            // 取用户选中的项目类型相对应的默认字段配置合并
            fields.push(Object.assign({}, projectConfigs[projectType], {
              title: getTitle(field.comment),
              field: fieldKey,
              displayField: fieldKey,
              options: getFilter(field.comment),
              type: getType(field.type, field.comment)
            }))
          }
        }
        tables.push({
          fields: fields,
          name: name,
          comment: name
        })
      },
      literal: (type) => {}
    }
    let files = fs.readdirSync(modelPath)
    files.forEach((file) => {
      let filePath = path.resolve(modelPath, file)
      let fileContent = fs.readFileSync(filePath).toString()
      let tableMigration = requireFromString(fileContent)
      tableMigration(myTransform, Sequelize.DataTypes)
    })
  }
  return tables
}
