/**
 * 经销商绑定相关
 */
import axios from '@/utils/axios'
//查询经销商
export const binddealer = (data) => {
  return axios.post(`/service/agency/query/Agency`, data)
}
export const bind = (data) => {
  return axios.post(`/service/agency/bind`, data)
}
