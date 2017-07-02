/**
 * Created by Deboy on 2017/4/24.
 */
let hbs = require('handlebars')
hbs.registerHelper('expression', function () {
  let exps = []
  try {
    // 最后一个参数作为展示内容，也就是平时的options。不作为逻辑表达式部分
    var arg_len = arguments.length
    var len = arg_len - 1
    for (var j = 0; j < len; j++) {
      exps.push(arguments[j])
    }
    var result = eval(exps.join(' '))
    if (result) {
      return arguments[len].fn(this)
    } else {
      return arguments[len].inverse(this)
    }
  } catch (e) {
    throw new Error('Handlerbars Helper "expression" can not deal with wrong expression:' + exps.join(' ') + '.')
  }
})
hbs.registerHelper('upperFirstAndDashToCamel', function (str) {
  if (!str) {
    return console.error('错误: upperFirstAndDashToCamel 方法需要传入字符串类型的值')
  }
  return str.split('_').map(x => {
    return x.charAt(0).toUpperCase() + x.slice(1)
  }).join('')
})
hbs.registerHelper('dashToCamel', function (str) {
  if (!str) {
    return console.error('错误: dashToCamel 方法需要传入字符串类型的值')
  }
  return str.split('_').map((x, index) => {
    return index > 0 ? (x.charAt(0).toUpperCase() + x.slice(1)) : x
  }).join('')
})
hbs.registerHelper('json', function (obj, withSpace) {
  try {
    return JSON.stringify(obj, null, withSpace ? 4 : 0)
  } catch (e) {
    return null
  }
})