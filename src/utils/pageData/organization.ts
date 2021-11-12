import { reactive, ref } from 'vue'
import { tableType, tableDataType, rulesChange, formType, optionData } from './pageType'

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
export const rules = { roleName: [{ required: true, message: '请填角色名称', trigger: 'blur' }] }

export const formRules: any = ref(null)
// 选中的id
export const formId = ref(null)

export const form = reactive({
  roleName: '',
  state: '',
  roleid: ''
})
export const nodeitem = reactive({
  path: null,
  departmentName: '',
  addname: '',
  id: '',
  label: ''
})
export const data = ref([])
export const dealers = ref([])
export const Distribution = ref([])
export const defaultProps = ref({
  children: 'oaPeopleDepts',
  label: 'departmentName'
})
export const totol = ref(1)
export const tree = ref()
export const page = ref(1)
export const pagesize = ref(8)
export const formLabelWidth = ref<string>('100px;')
export const filterText = ref('')
export const dialogFormVisible1 = ref<Boolean>(false)
export const dialogFormVisible2 = ref<Boolean>(false)

// 关闭dio时
export const handleClose = (done: any) => {
  for (const key in form) {
    form[key] = ''
  }
  done()
}

export const seachtext: string = ''
