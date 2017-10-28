/**
 * Created by Deboy on 2017/4/2.
 * TODO 重新规划插件目录 重新封装插件
 */
const {dialog} = require('electron').remote
const {shell} = require('electron')
export function openDialog (callback) {
  dialog.showOpenDialog({
    properties: [
      'openDirectory'
    ]
  }, callback)
}
export function openFileExplorer (target) {
  return shell.showItemInFolder(target)
}
