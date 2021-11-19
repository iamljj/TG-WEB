import { reactive, ref } from 'vue'
import { BusinessAll } from '@/service/business'
//表格
// 表格
export const columns: Array<any> = [
  { type: 'index', label: '序号' },
  { label: '经销商', prop: 'name' },
  { label: '节点', prop: 'node' }
]
export const tableData = [
  {
    name: '顺达',
    node: '淮北办事处'
  }
]
export const rules = {
  childNodeName: [{ required: true, message: '请填写节点名称', trigger: 'blur' }]
}

export const formRules: any = ref(null)
// 选中的id
export const formId = ref(null)

export const form = {
  nodeName: '',
  parentCode: null,
  bsCode: null,
  childNodeName: '',
  id: ''
}

export let business = []

//全部业务列表
export const Businessall = async (code: string, father: string) => {
  let res = await BusinessAll(code, father)
  res.data.data.forEach((item) => {
    let busines = {
      bsCode: item.bsCode,
      bsName: item.bsName
    }
    business.push(busines)
  })
}

export const data = ref([])
export const dealers = ref([])
export const totol = ref(1)
export const page = ref(1)
export const pagesize = ref(8)
