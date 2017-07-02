import * as iview from 'iview'
import * as types from './mutation-types'
function saveLog (log, context) {
  let nowTime = new Date().toLocaleDateString() + new Date().toLocaleTimeString()
  let logObj = {
    time: nowTime + ': ',
    type: 'info',
    title: '通知',
    content: '内容',
    createdAt: new Date().getTime()
  }
  if (typeof log === 'string') {
    logObj.content = log
  } else {
    logObj = Object.assign({}, logObj, log)
  }
  context.commit(types.SAVE_LOG, logObj)
}
export const showNotice = function (context, payload) {
  if (typeof payload === 'string') {
    iview.Notice.success({
      title: payload,
      duration: 3
    })
  } else {
    iview.Notice[payload.type](Object.assign({}, {
      title: '通知',
      content: null,
      duration: 3
    }, payload))
  }
  saveLog(payload, context)
}
