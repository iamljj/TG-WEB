import axios from '@/utils/axios'
/**
 * 业务类型相关接口
 */
//新增和修改业务类型
export const AddEditBusiness = (data) => {
  return axios.post(`/service/admin/business/save`, data)
}

//条件查询业务类型列表
export const QueryBusiness = (data) => {
  return axios.post(`/service/admin/business/query`, data)
}

//删除业务
export const BusinessDal = (id) => {
  return axios.get(`/service/admin/business/del?bsCode=${id}`)
}

//查询所有业务
export const BusinessAll = (params?:any) => {
  return axios.get(`/service/admin/business/queryAll`,{params})
}

//为组织架构中的节点绑定业务
export const NodeBusiness = (data) => {
  return axios.post(`/service/admin/node/business/bind`, data)
}

//为角色邦定业务
