import axios from '@/utils/axios'
/**
 * 角色管理相关的
 */

//条件查询所有角色
export const queryRole = (data) => {
  return axios.post('/service/admin/business/role/query', data)
}

// 新增、修改角色
export const putRole = (params) => {
  return axios.post(`/service/admin/business/role/save`, params)
}

// 删除角色
export const deleteRole = (params) => {
  return axios.get(`/service/admin/business/role/del`, { params })
}
