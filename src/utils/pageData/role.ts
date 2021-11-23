import { queryRole, putRole, deleteRole } from '@/service/role'
import { getBusinessAll } from '@/service/business'
export const tabs: Array<labelValueType> = [
  {
    label: '酒业',
    value: '酒业'
  },
  {
    label: '经销商',
    value: '经销商'
  }
]
interface labelValueType {
  label: string
  value: string
}
export const columns: Array<any> = [
  { type: 'index', label: '序号' },
  { label: '角色名称', prop: 'bsrName' },
  { label: '业务类型', prop: 'businessList' }
]

export let list = []
interface getRoleType {
  bsrName?: string
  bsCode?: string
  belong: string
}
export const get_role = async (params: getRoleType) => {
  let { data } = await queryRole(params)
  if (data.code == 200) {
    return data
  } else {
    return false
  }
}
export let form = {
  bsrName: '',
  bsCode: ''
}

export let business = []

//全部业务类型列表
interface getAllBusinessType {
  pageNum: string
  pageSize: string
}
export const get_all_business = async (params: getAllBusinessType) => {
  let { data } = await getBusinessAll(params)
  if (data.code == 200) {
    return data.data
  } else {
    return []
  }
}

// 新增，修改角色
export const put_update_role = async (params) => {
  let { data } = await putRole(params)
  if (data.code == 200) {
    return data
  } else {
    return false
  }
}

// 删除角色
export const delete_role = async (params) => {
  let { data } = await deleteRole(params)
  if (data.code == 200) {
    return data
  } else {
    return false
  }
}
