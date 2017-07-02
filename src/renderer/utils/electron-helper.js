/**
 * Created by Deboy on 2017/4/2.
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
