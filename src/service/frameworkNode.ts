import axios from '@/utils/axios'

/**
 * 组织架构节点相关接口
 */
// 查询OA组织架构
export const getOAframework = (params?: any) => {
  return axios.get(`/service/external/oa/framework`, { params })
}

// 新增内部节点
export const putFrameworkNode = (params) => {
  return axios.post(`/service/admin/framework/save`, params)
}

// 根据节点编码查询节点
export const getFrameworkNode = (params) => {
  return axios.get(`/service/admin/framework`, { params })
}

// 根据节点查询子节点列表
export const getFrameworkNodeChildList = (params) => {
  return axios.post(`/service/admin/framework/query`, params)
}

//删除内部节点
export const delFrameworkNode = (id) => {
  return axios.get(`/service/admin/framework/del?id=${id}`)
}
