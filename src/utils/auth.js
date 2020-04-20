import Cookies from 'js-cookie'

const userId = 'user_id'
const isAuthenticate = 'isAuthenticate'

// 用户ID
export function getUserId() {
  return Cookies.get(userId)
}
export function setUserId(data) {
  return Cookies.set(userId, data)
}
export function removeUserId() {
  return Cookies.remove(userId)
}

// 是否登录
export function getIsAuthenticate() {
  return Cookies.get(isAuthenticate)
}
export function setIsAuthenticate(data) {
  return Cookies.set(isAuthenticate, data)
}
export function removeIsAuthenticate() {
  return Cookies.remove(isAuthenticate)
}
