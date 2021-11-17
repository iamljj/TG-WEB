import axios from '@/utils/axios'

/**
 * 组织架构节点相关接口
 */
// 新增内部节点
export const putFrameworkNode = (params) => {
  return axios.post(`/service/admin/framework/save`, params)
}

// 根据节点编码查询节点
export const getFrameworkNode = (params) => {
  return axios.get(`/service/admin/framework`, {params})
}

// 根据节点查询子节点列表
export const getFrameworkNodeChildList = (params) => {
  return axios.post(`/service/admin/framework/query`, params)
}


