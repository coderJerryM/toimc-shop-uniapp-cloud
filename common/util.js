import * as util from '@/utils/util'
import store from '@/store'




/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
export const getTabBarLinks = () => {
  const tabBarLinks = [
    'pages/home/home',
    'pages/cart/cart',
    'pages/center/center',
  ]
  return tabBarLinks
}



/**
 * 跳转到指定页面url
 * 支持tabBar页面
 * @param {string}  url   页面路径
 * @param {object}  query 页面参数
 * @param {string}  modo  跳转类型(默认navigateTo)
 */
export const navTo = (url, query = {}, modo = 'navigateTo') => {
  if (!url || url.length == 0) {
    return false
  }
  // tabBar页面, 使用switchTab
  if (util.inArray(url, getTabBarLinks())) {
    uni.switchTab({
      url: `/${url}`
    })
    return true
  }
  // 生成query参数
  const queryStr = !util.isEmpty(query) ? '?' + util.urlEncode(query) : ''
  // 普通页面, 使用navigateTo
  modo === 'navigateTo' && uni.navigateTo({
    url: `/${url}${queryStr}`
  })
  // 特殊指定, 使用redirectTo
  modo === 'redirectTo' && uni.redirectTo({
    url: `/${url}${queryStr}`
  })
  return true
}

/**
 * 获取购物车商品总数量
 * @param {*} value 
 */
export const getCartTotalNum = () => {
  const cartTotal = uni.getStorageSync('cartTotalNum') || 0
  return checkLogin() ? cartTotal : 0
}

/**
 * 记录购物车商品总数量
 * @param {*} value 
 */
export const setCartTotalNum = (value) => {
  uni.setStorageSync('cartTotalNum', Number(value))
}

/**
 * 设置购物车tabbar的角标
 * 该方法只能在tabbar页面中调用, 其他页面调用会报错
 */
export const setCartTabBadge = () => {
  const cartTabbarIndex = 2
  const cartTotal = getCartTotalNum()
  if (cartTotal > 0) {
    uni.setTabBarBadge({
      index: cartTabbarIndex,
      text: `${cartTotal}`
    })
  } else {
    uni.removeTabBarBadge({
      index: cartTabbarIndex
    })
  }
  return
}

/**
 * 验证是否已登录
 */
export const checkLogin = () => {
  return !!store.getters.userId
}
