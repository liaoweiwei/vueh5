import request from '@/utils/request'
import { getMd5 } from '@/utils/md5'

// 设置昵称和登录密码
export function getSetUserPassword(data) {
  return request({
    url: '/api/v1/user/set/password',
    method: 'post',
    data: getMd5(data)
  })
}

// 手机验证码验证
export function getSendCheckcode(data) {
  return request({
    url: '/api/v1/sms/send/checkcode',
    method: 'post',
    data: getMd5(data)
  })
}

// 发送验证码
export function getSend(data) {
  return request({
    url: '/api/v1/sms/send/mobile',
    method: 'post',
    data: getMd5(data)
  })
}

// 手机密码登录
export function getLogin(data) {
  return request({
    url: '/api/v1/user/mobile/login',
    method: 'post',
    data: getMd5(data)
  })
}
