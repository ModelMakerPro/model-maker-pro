import { openDialog, openFileExplorer } from '../utils/electron-helper'
import store from '../vuex/store'
import * as types from '../vuex/mutation-types'
const fs = require('fs')
const path = require('path')
require('../utils/handlebars-helper')
require('../utils/my-handlebars-helper')
let Handlebars = require('handlebars')
require('handlebars-helpers')({
  handlebars: Handlebars
})
import * as customHelper from '../utils/helper'
import * as tools from '../config/tool'
const projectConfPostfix = '.project.json'
/**
 * 写入本地文件
 * @param fullpath
 * @param data
 * @param needOpenDir
 * @param callback
 */
function writeToLocalFile (fullpath, data, needOpenDir = true, callback) {
  fs.open(fullpath, 'a', (err, fd) => {
    if (err) {
      store.dispatch('showNotice', {type: 'error', title: '导出项目失败', desc: err})
      return
    }
    let content = typeof data === 'object' ? JSON.stringify(data) : data
    fs.writeFile(fullpath, content, (err) => {
      if (err) {
        store.dispatch('showNotice', {type: 'error', title: '写入文件失败', desc: err})
        return
      }
      if (typeof callback === 'function') {
        callback()
      } else {
        store.dispatch('showNotice', '导出成功')
      }
      if (needOpenDir) {
        openFileExplorer(fullpath)
      }
    })
    fs.close(fd)
  })
}
export function install (Vue) {
  Vue.prototype.$project = {
    // 读取模版文件夹下所有的模版
    listTpl (templateDir) {
      let res = []
      let files = fs.readdirSync(templateDir)
      files.forEach((file) => {
        let fullpath = path.resolve(templateDir, file)
        res.push({
          name: file,
          path: fullpath
        })
      })
      return res
    },
    /**
     * 根据传过来的变量和字符串传渲染
     * @param variables
     * @param template
     */
    renderTemplate (variables, template) {
      try {
        let tpl = Handlebars.compile(template)
        return tpl(variables)
      } catch (e) {
        store.dispatch('showNotice', {type: 'error', title: '编译模版文件失败', desc: e.message, duration: 0})
        return null
      }
    },
    /**
     * 为项目文件做兼容性处理
     */
    polyfillProject (targetProject) {
      targetProject.tables.forEach((table) => {
        table.fields = tools.mergeDefaultRow(targetProject.type, JSON.parse(JSON.stringify(table.fields)))
      })
      return targetProject
    },
    getTablePreview (index = 0, exportType = 'list') {
      let project = store.getters.projectList[store.getters.projectIndex]
      if (project && project.id) {
        let exportProjectObj = JSON.parse(JSON.stringify(project))
        exportProjectObj = tools.transformProjectInfo(exportProjectObj)
        console.log(exportProjectObj)
        if (exportType === 'list') {
          return exportProjectObj.tables[index]
        } else {
          delete exportProjectObj.defaultFields
          return exportProjectObj
        }
      } else {
        return '没有选中项目'
      }
    },
    /**
     * 循环表导出文件
     */
    exportFileByCustomTemplate (tplInfo, previewMode = false, customTableIndex = 0) {
      let project = store.getters.projectList[store.getters.projectIndex]
      if (project && project.id) {
        let exportProjectObj = JSON.parse(JSON.stringify(project))
        exportProjectObj = tools.transformProjectInfo(exportProjectObj)
        let template = fs.readFileSync(tplInfo.path).toString()
        try {
          let tpl = Handlebars.compile(template)
          // 如果是预览模式 默认取第一个表来预览
          if (previewMode) {
            // 如果导出类型是list
            if (tplInfo.type === 'list') {
              return tpl(exportProjectObj.tables[customTableIndex])
            } else {
              return tpl(exportProjectObj)
            }
          } else {
            openDialog((res) => {
              if (res && res.length > 0) {
                let filename = ''
                if (tplInfo.type === 'list') {
                  exportProjectObj.tables.forEach((table, index) => {
                    if (tplInfo.filenameFormat) {
                      filename = customHelper[tplInfo.filenameFormat](table.name)
                    } else {
                      filename = table.name
                    }
                    writeToLocalFile(path.resolve(res[0], `./${filename + tplInfo.suffix}`), tpl(table), false)
                    if (index === exportProjectObj.tables.length - 1) {
                      openFileExplorer(res[0])
                    }
                  })
                } else {
                  filename = tplInfo.suffix || tplInfo.name || exportProjectObj.name
                  let content = tpl(exportProjectObj)
                  writeToLocalFile(path.resolve(res[0], `./${filename}`), content, false)
                  openFileExplorer(res[0])
                }
              }
            })
          }
        } catch (e) {
          store.dispatch('showNotice', {type: 'error', title: '编译模版文件失败', desc: e.message, duration: 0})
        }
      }
    },
    /**
     * 导出项目的整个文件 只能被ModelMaker识别 请勿用其他软件识别修改 否则将损坏该文件
     */
    exportProjectFile () {
      let project = store.getters.projectList[store.getters.projectIndex]
      if (project && project.id) {
        openDialog((res) => {
          if (res && res.length > 0) {
            fs.open(path.resolve(res[0], `./${project.name}${projectConfPostfix}`), 'a', (err, fd) => {
              if (err) {
                store.dispatch('showNotice', {type: 'error', title: '导出项目失败', desc: err})
                return
              }
              let writeBuffer = new Buffer(JSON.stringify(project))
              let offset = 0
              let len = writeBuffer.length
              let filePostion = null
              fs.write(fd, writeBuffer, offset, len, filePostion, (err, readByte) => {
                if (err) {
                  store.dispatch('showNotice', {type: 'error', title: '导出项目失败', desc: err})
                  return
                }
                store.dispatch('showNotice', '导出成功')
                fs.close(fd)
              })
            })
          }
        })
      } else {
        store.dispatch('showNotice', {type: 'info', title: '没有项目可以导出'})
      }
    },
    /**
     * 从本地读取文件 同步到软件中
     * @param showNotice
     * @param workspace
     */
    syncProject (showNotice = true, workspace = null, repeat = true) {
      const syncWorkspace = workspace || store.getters.workspace || null
      if (!syncWorkspace) {
        store.dispatch('showNotice', {type: 'warning', title: '同步项目失败', desc: '请先点击右上角的齿轮设置 工作空间'})
      } else {
        let files = fs.readdirSync(syncWorkspace)
        let count = {
          success: 0,
          fail: 0
        }
        files.forEach((filename) => {
          let fullname = path.join(syncWorkspace, filename)
          if (filename.indexOf(projectConfPostfix) < 0) {
            return
          }
          let stats = fs.statSync(fullname)
          if (!stats.isDirectory()) {
            let fileContent = fs.readFileSync(fullname, 'UTF-8')
            let project = null
            try {
              project = JSON.parse(fileContent)
            } catch (e) {
              count.fail++
            }
            if (project && project.id) {
              let afterPolyfillProject = this.polyfillProject(project)
              store.commit(types.MERGE_PROJECT_LIST, afterPolyfillProject)
              count.success++
            } else {
              store.dispatch('showNotice', {type: 'warning', title: `${filename}文件导入失败`, desc: '不是标准的项目文件！请检查后重试'})
            }
          }
        })
        if (showNotice) {
          store.dispatch('showNotice', {
            type: 'success',
            title: '同步工作空间项目完成',
            desc: `成功: ${count.success} 失败：${count.fail}`
          })
        }
      }
    },
    /**
     * 将已存在的项目写入本地文件
     * @param projectList
     * @param callback
     */
    syncToLocalFile (projectList, callback) {
      let workspace = store.getters.workspace || null
      if (workspace && projectList.length > 0) {
        projectList.forEach((project, index) => {
          let filename = project.name + projectConfPostfix
          let fullpath = path.resolve(workspace, filename)
          fs.open(fullpath, 'w+', (err, fd) => {
            if (err) {
              store.dispatch('showNotice', {type: 'error', title: '保存项目失败', desc: err})
              return
            }
            let writeBuffer = new Buffer(JSON.stringify(project))
            let offset = 0
            let len = writeBuffer.length
            let filePostion = null
            fs.write(fd, writeBuffer, offset, len, filePostion, (err, readByte) => {
              if (err) {
                store.dispatch('showNotice', {type: 'error', title: '保存项目失败', desc: err})
                return
              } else {
                console.log('同步完成 项目文件大小:', readByte)
              }
              fs.close(fd, () => {
                if (index === projectList.length - 1) {
                  callback && callback(true)
                }
              })
            })
          })
        })
      } else if (projectList.length === 0) {
        console.info('当前没有项目 快点新建啊')
        if (typeof callback === 'function') {
          callback(false)
        }
      } else {
        store.dispatch('showNotice', {type: 'error', title: '保存失败', desc: '请先点击右上角齿轮按钮设置工作空间 否则项目无法保存!'})
        if (typeof callback === 'function') {
          callback(false)
        }
      }
    },
    /**
     * 同步删除项目
     * @param project
     * @param workspace
     */
    syncDeleteProject (project, workspace) {
      let projectFile = path.resolve(workspace || store.getters.workspace, project.name + projectConfPostfix)
      try {
        fs.unlinkSync(projectFile)
      } catch (e) {
      }
    },
    /**
     * 重命名项目
     * @param oldName
     * @param newName
     * @param callback
     */
    reNameProject (oldName, newName, callback) {
      const workspace = store.getters.workspace
      if (workspace) {
        let oldPath = path.resolve(workspace, oldName + projectConfPostfix)
        let newPath = path.resolve(workspace, newName + projectConfPostfix)
        if (fs.renameSync(oldPath, newPath)) {
          callback && callback()
        }
      } else {
        store.dispatch('showNotice', {type: 'error', title: '保存失败', desc: '请先点击右上角齿轮按钮设置工作空间 否则项目无法保存到本地!'})
        callback && callback()
      }
    }
  }
}
