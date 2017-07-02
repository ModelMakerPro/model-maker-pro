/**
 * Created by Deboy on 2017/4/4.
 */
const swapItems = function (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}
export function clone (val) {
  let newVal = JSON.stringify(val)
  return JSON.parse(newVal)
}
export function moveUp (arr, $index) {
  if ($index === 0) {
    return
  }
  swapItems(arr, $index, $index - 1)
}
export function moveDown (arr, $index) {
  if ($index === arr.length - 1) {
    return
  }
  swapItems(arr, $index, $index + 1)
}
export function insert (arr, position, item) {
  return arr.splice(position, 0, item)
}

export function upperFirstAndDashToCamel (str) {
  if (!str) {
    return str
  }
  return str.split('_').map(x => {
    return x.charAt(0).toUpperCase() + x.slice(1)
  }).join('')
}

export function dashToCamel (str) {
  if (!str) {
    return str
  }
  return str.split('_').map(x => {
    return x.charAt(0).toUpperCase() + x.slice(1)
  }).join('')
}

