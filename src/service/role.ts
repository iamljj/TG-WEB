import axios from '@/utils/axios'
/**
 * 角色管理相关的
 */

//条件查询所有角色
export const queryRole = (data) => {
  return axios.post('/service/admin/business/role/query', data)
}
