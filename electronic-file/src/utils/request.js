/* eslint-disable camelcase */
import axios from 'axios'

const apiKey_61 = '90a378c8bcc0a51dbc08b6f0e86753bd'
const apiKey_62 = '20773f30282bc6aac9f39f8527b231b0'
const apiKey_63 = '0ac4bf2381e32acef5ed199f5654316c'
const apiKey_64 = '816571cd92aec361d4e3de6cfdb4cb5b'
// const  baseURL = '/zzk'
const service = axios.create({
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   'token': 'one'
  // },
  // baseURL,
  withCredentials: true,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // config.headers['apiKey'] = apiKey;
  // console.log(config)
  switch (config.aim) {
    case '/62_op': {
      config.params['apiKey'] = apiKey_62
      break
    }
    case '/63_op': {
      config.params['apiKey'] = apiKey_63
      break
    }
    case '/64_op': {
      config.params['apiKey'] = apiKey_64
      break
    }
    default: {
      config.params['apiKey'] = apiKey_61
    }
  }
  config.headers['X-Content-Type-Options'] = 'nosniff'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  // console.log(response)
  // 如果返回的状态不是200 就主动报错
  if (response.status !== 200) {
    return Promise.reject(response.statusText || 'error')
  }
  return response
}, error => {
  return Promise.reject(error.response.data) // 返回接口返回的错误信息
})

export default service
