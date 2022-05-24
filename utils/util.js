


/**
 * 对象转URL
 * @param {object} obj
 */
export const urlEncode = (obj = {}) => {
  const result = []
  for (const key in obj) {
    const item = obj[key]
    if (!item) {
      continue
    }
    if (isArray(item)) {
      item.forEach(val => {
        result.push(key + '=' + val)
      })
    } else {
      result.push(key + '=' + item)
    }
  }
  return result.join('&')
}


/**
 * 是否在数组内
 */
export const inArray = (search, array) => {
  for (var i in array) {
    if (array[i] == search) return true
  }
  return false
}

/**
 * 判断是否为空对象
 * @param {*} object 源对象
 */
export const isEmptyObject = (object) => {
  return Object.keys(object).length === 0
}

/**
 * 判断是否为对象
 * @param {*} object
 */
export const isObject = (object) => {
  return Object.prototype.toString.call(object) === '[object Object]'
}


/**
 * 判断是否为数组
 * @param {*} array
 */
export const isArray = (array) => {
  return Object.prototype.toString.call(array) === '[object Array]'
}



/**
 * 判断是否为空
 * @param {*} object 源对象
 */
export const isEmpty = (value) => {
  if (isArray(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return isEmptyObject(value)
  }
  return !value
}

/**
 * 对象深拷贝
 * @param {*} obj 源对象
 */
export const cloneObj = (obj) => {
  let newObj = isArray(obj) ? [] : {};
  if (typeof obj !== 'object') {
    return;
  }
  for (let i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
  }
  return newObj
}

// 节流函数
// 思路： 第一次先设定一个变量true，
// 第二次执行这个函数时，会判断变量是否true，
// 是则返回。当第一次的定时器执行完函数最后会设定变量为flase。
// 那么下次判断变量时则为flase，函数会依次运行。
export function throttle(fn, delay = 100) {
  // 首先设定一个变量，在没有执行我们的定时器时为null
  var timer = null
  return function() {
    // 当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 防抖函数
// 首次运行时把定时器赋值给一个变量， 第二次执行时，
// 如果间隔没超过定时器设定的时间则会清除掉定时器，
// 重新设定定时器， 依次反复， 当我们停止下来时，
// 没有执行清除定时器， 超过一定时间后触发回调函数。
// 参考文档：https://segmentfault.com/q/1010000021145192
export function debounce(fn, delay = 100) {
  let timer
  return function() {
    const that = this
    const _args = arguments // 存一下传入的参数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(that, _args)
    }, delay)
  }
}