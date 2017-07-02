'use strict'

import { app, BrowserWindow, Menu } from 'electron'
console.log(Menu)
// Install `electron-debug` with `devtron`
require('electron-debug')({showDevTools: process.env.NODE_ENV === 'development'})

// Install `vue-devtools`

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../.electron-vue/config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  let installExtension = require('electron-devtools-installer')
  if (process.env.NODE_ENV === 'development') {
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {})
      .catch(err => {
        console.log('Unable to install `vue-devtools`: \n', err)
      })
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1690
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })
  // 创建菜单
  let template = [{
    label: '应用',
    submenu: [
      {
        label: '关于ModelMakerPro',
        click: (e) => {
          console.log(e)
        }
      },
      {type: 'separator'},
      {label: '退出', accelerator: 'Command+Q', click: function () { app.quit() }}
    ]
  }, {
    label: '编辑',
    submenu: [
      {label: '返回', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
      {label: '重新执行', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
      {type: 'separator'},
      {label: '剪切', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
      {label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
      {label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
      {label: '全选', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
    ]
  }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
