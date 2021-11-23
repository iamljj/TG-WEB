/**
 * 经销商绑定相关
 */
import axios from '@/utils/axios'
//查询经销商
export const binddealer = (data) => {
  return axios.post(`/service/agency/query/Agency`, data)
}
//绑定经销商
export const bind = (data) => {
  return axios.post(`/service/agency/bind`, data)
}

//查询已绑定的经销商
export const bindedAgency = (data) => {
  return axios.post(`/service/agency/query/bindedAgency`, data)
}
