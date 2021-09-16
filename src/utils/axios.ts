import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  REQUEST_ADDRESS,
  TOKEN_FIELD,
  LOGIN_ADDRESS,
  LEGAL_CODES,
  CODE_VERIFICATION
} from '@/config'
import { ElLoading } from 'element-plus'
import { storage } from './storage'
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODQwODI1MTU0MyIsInJvbGVzIjoiW3tcImF1dGhvcml0eVwiOlwibWFuYWdlclwifV0iLCJpZCI6MTQyLCJ1c2VybmFtZSI6IjE4NDA4MjUxNTQzIiwiaWF0IjoxNjMxNjc0MDM1LCJleHAiOjE2MzIyNzg4MzV9.4qAer66fk_2mPv-bopERWic31meGUVUeUb9B4CLLI9M'
token && (axios.defaults.baseURL = REQUEST_ADDRESS)
!token && (axios.defaults.baseURL = LOGIN_ADDRESS)
axios.defaults.timeout = 3000
// loading
let loading: any
const startLoading = () => {
  interface options {
    lock: boolean
    text: string
    background: string
  }
  const options = {
    lock: true,
    text: '加载中'
  }
  loading = token && ElLoading.service(options)
}
const endLoading = () => {
  token && loading.close()
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  startLoading()
  token && (config.headers[TOKEN_FIELD] = token)
  config.url?.includes('/proxy/') && (config.baseURL = '')

  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    endLoading()
    try {
      if (response.data && CODE_VERIFICATION) {
        const { code, msg } = response.data
        let isLegal = false
        for (const item in LEGAL_CODES) {
          if (item == code) isLegal = true
        }
        if (!isLegal) return Promise.reject({ code, msg, data: response.data })
      }
      if (response.data) return response
      return Promise.reject({ response })
    } catch (e) {
      endLoading()
      return Promise.reject(e)
    }
  },
  (error) => {
    endLoading()
    if (error.response)
      return Promise.reject({ status: error.response.status, data: error.response.data })
    return Promise.reject(error.message)
  }
)
export default axios
