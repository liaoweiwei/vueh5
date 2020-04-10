import promise from 'es6-promise'
import axios from 'axios'

promise.polyfill()

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})
// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
