import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  // baseURL: 'http://192.168.17.40:8000/',
})

request.interceptors.request.use(
  function(config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default request
