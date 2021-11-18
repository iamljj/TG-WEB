import { reactive, ref } from 'vue'
import{BusinessAll} from '@/service/business'
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
  childNodeName: [{ required: true, message: '请填写节点名称', trigger: 'blur' }],
  bsCode: [{ required: true, message: '请选择业务', ttrigger: 'blur' }]
}

export const formRules: any = ref(null)
// 选中的id
export const formId = ref(null)

export const form = {
  nodeName: '',
  parentCode: null,
  bsCode: '',
  childNodeName: ''
}

export const business = [
  // {
  //   label: '团购',
  //   value: '团购'
  // },
  // {
  //   label: '直销',
  //   value: '直销'
  // },
  // {
  //   label: '配送',
  //   value: '配送'
  // },
  // {
  //   label: '费用',
  //   value: '费用'
  // },
  // {
  //   label: '全部',
  //   value: '全部'
  // }
]
export const data = ref([])
export const dealers = ref([])
export const totol = ref(1)
export const page = ref(1)
export const pagesize = ref(8)
