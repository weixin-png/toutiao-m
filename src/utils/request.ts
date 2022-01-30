import axios from 'axios'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //如如果用户已登录，同一给接口设置 token 信息
    if (userStore.user && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }

    //处理完之后，一定要把config返回，否则请求就会停在这里。
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default instance
