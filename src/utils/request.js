import axios from 'axios'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/',
  baseURL: 'http://192.168.17.40:8000/',
})
export default request
