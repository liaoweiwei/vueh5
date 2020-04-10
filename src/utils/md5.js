import md5 from 'js-md5'

export function getMd5(data) {
  const resut = sortByKey(data)
  let App_key = 'QHnJFHTSAvigToL2'
  Object.keys(resut).forEach(key => {
    if (resut[key] !== undefined) {
      if (resut[key] instanceof Array) {
        App_key += key + JSON.stringify(resut[key])
      } else {
        App_key += key + resut[key]
      }
    }
  })
  const sign = md5(App_key).toUpperCase()
  return {
    sign: sign,
    ...data
  }
}

function sortByKey(obj) {
  const newkey = Object.keys(obj).sort()
  var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]] // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj
}
