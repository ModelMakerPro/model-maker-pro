/**
 * Created by Deboy on 2017/4/2.
 */
/**
 * 保存到本地储存
 * key: 保存的key值
 * value: 对应的value
 * saveAsSession: 是否保存到session
 * isObject: 需要储存的值 是否是对象 默认是
 * @param params
 */
export function save (args) {
  let params = Object.assign({}, {key: '', value: null, saveAsSession: false, isObject: true}, args)
  let saveString = params.isObject ? JSON.stringify(params.value) : params.value
  if (params.saveAsSession) {
    window.sessionStorage.setItem(params.key, saveString)
  } else {
    window.localStorage.setItem(params.key, saveString)
  }
}

/**
 * 从本地储存中区
 * key: 保存的key值
 * value: 对应的value
 * getFromSession: 是否从session中获取的
 * isObject: 需要储存的值 是否是对象 默认是
 * defaultVal: 如果获取到时undefined或者空 则默认返回的值 默认是null
 * @param params
 */
export function get (args) {
  let params = Object.assign({}, {key: '', getFromSession: false, isObject: true, defaultVal: null}, args)
  let val = null
  if (params.getFromSession) {
    val = window.sessionStorage.getItem(params.key)
  } else {
    val = window.localStorage.getItem(params.key)
  }
  return params.isObject ? (JSON.parse(val) ? JSON.parse(val) : params.defaultVal) : (val === undefined ? params.defaultVal : val)
}
