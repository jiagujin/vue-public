import axios from 'axios'
import { Loading } from 'element-ui'
// 创建axios实例
const request = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 15000 // 请求超时时间
})
// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    Loading.service().close()
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export { request }
