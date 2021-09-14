import { reactive, ref } from 'vue'
import { tableType, tableDataType, rulesChange, formType, optionData } from './pageType'

export const table: tableType[] = [
  {
    name: '费用项编码',
    prop: 'dispalyNumber',
    width: 620
  },
  {
    name: '费用项名称',
    prop: 'displayName',
    width: 620
  }
]
export const tableData = ref()
export const rules = {
  dispalyNumber: [{ required: true, message: '请填写费用项编码', trigger: 'blur' }],
  displayName: [{ required: true, message: '请填写费用项名称', trigger: 'blur' }]
}

export const formRules: any = ref(null)
// 选中的id
export const formId = ref(null)

export const form = reactive({
  displayId: '',
  number: null
})
export const totol = ref(1)
export const page = ref(1)
export const pagesize = ref(5)
export const formLabelWidth = ref<string>('100px;')

// 关闭dio时
export const handleClose = (done: any) => {
  for (const key in form) {
    form[key] = ''
  }
  done()
}
