import { queryRole } from '@/service/role'
import { BusinessAll } from '@/service/business'
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
export const getrole = async (date?) => {
  if (!date) {
    const params = {
      bsrName: '',
      bsCode: ''
    }
    let { data } = await queryRole(params)
    list = data.data
  } else {
    let { data } = await queryRole(date)
    list = data.data
  }
}
export let form = {
  bsrName: '',
  bsCode: ''
}

export let business = []

//全部业务列表
export const Businessall = async (code: string, father: string) => {
  if (business.length > 0) {
    business = []
  }
  let res = await BusinessAll(code, father)
  res.data.data.forEach((item) => {
    let busines = {
      bsCode: item.bsCode,
      bsName: item.bsName
    }
    business.push(busines)
  })
}
