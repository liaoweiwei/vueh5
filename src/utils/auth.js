import Cookies from 'js-cookie'

const userId = 'user_id'
const nickName = 'nick_name'
const userPhone = 'user_phone'
const headPortrait = 'head_portrait'
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

// 用户昵称
export function getNickName() {
  return Cookies.get(nickName)
}
export function setNickName(data) {
  return Cookies.set(nickName, data)
}
export function removeNickName() {
  return Cookies.remove(nickName)
}

// 用户手机号
export function getUserPhone() {
  return Cookies.get(userPhone)
}
export function setUserPhone(data) {
  return Cookies.set(userPhone, data)
}
export function removeUserPhone() {
  return Cookies.remove(userPhone)
}

// 用户头像
export function getHeadPortrait() {
  return Cookies.get(headPortrait)
}
export function setHeadPortrait(data) {
  return Cookies.set(headPortrait, data)
}
export function removeHeadPortrait() {
  return Cookies.remove(headPortrait)
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
