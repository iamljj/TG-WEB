import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { storage } from './storage'
import { CODE_VERIFICATION, LEGAL_CODES, TOKEN_FIELD, REQUEST_ADDRESS } from '@/config'
interface extendAxiosRequestConfig extends AxiosRequestConfig {
  TOKEN_FIELD?: string
}
export class axiosInstance {
  private instance: AxiosInstance
  private readonly options: extendAxiosRequestConfig

  constructor(options: extendAxiosRequestConfig) {
    // init
    this.options = options
    this.instance = axios.create(options)
    this.instance.defaults.baseURL = this.options.baseURL || REQUEST_ADDRESS
    this.instance.defaults.timeout = this.options.timeout || 3000

    //axios request interceptors
    this.instance.interceptors.request.use((config) => {
      const token_field = this.options.TOKEN_FIELD || TOKEN_FIELD
      const token = storage.get(token_field)
      // if have token , then carry token
      token && (config.headers[token_field] = token)
      //解决vue/cli与axios的baseURL冲突问题
      config.url?.includes('/proxy/') && (config.baseURL = '')
      console.log(config)
      return config
    })

    //axios response interceptors
    this.instance.interceptors.response.use(
      (response) => {
        try {
          // 返回code验证
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
        } catch (error) {
          return Promise.reject(error.message)
        }
      },
      (error) => {
        if (error.response)
          return Promise.reject({ status: error.response.status, data: error.response.data })
        return Promise.reject(error.message)
      }
    )
  }

  get(url: string, data?, config?: extendAxiosRequestConfig) {
    return this.instance.get(url, { params: data, ...config })
  }

  post(url: string, data?, config?: extendAxiosRequestConfig) {
    return this.instance.post(url, data, { ...config })
  }

  put(url: string, data?, config?: extendAxiosRequestConfig) {
    return this.instance.put(url, data, { ...config })
  }

  delete(url: string, data?, config?: extendAxiosRequestConfig) {
    return this.instance.delete(url, { params: data, ...config })
  }
}
