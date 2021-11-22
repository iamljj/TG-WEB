import { reactive, ref } from 'vue'
import { BusinessAll, NodeBusiness, getNodeBusiness } from '@/service/business'
import { putFrameworkNode, delFrameworkNode } from '@/service/frameworkNode'
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
  bsCodeList: null,
  id: ''
}

//全部业务列表
export const Businessall = async (params) => {
  let business = []
  let { data } = await BusinessAll(params)
  if (data.code == 200) {
    business = data.data
  } else {
    business = []
  }
  return business
}
// 新增内部节点
export const put_framework_node = async (params) => {
  let { data } = await putFrameworkNode(params)
  if (data.code == 200) {
    return data
  } else {
    return data
  }
}

//给节点绑定业务
export const node_business = async (params) => {
  let { data } = await NodeBusiness(params)
  if (data.code == 200) {
    return data
  } else {
    return data
  }
}

//删除内部节点
export const delet_framework_node = async (params) => {
  let { data } = await delFrameworkNode(params)
  if (data.code == 200) {
    return data
  } else {
    return data
  }
}
//查询节点已绑定的业务
export const get_framework_node_business = async (params) => {
  let { data } = await getNodeBusiness(params)
  if (data.code == 200) {
    return data
  } else {
    return data
  }
}

export const data = ref([])
export const dealers = ref([])
export const totol = ref(1)
export const page = ref(1)
export const pagesize = ref(8)
