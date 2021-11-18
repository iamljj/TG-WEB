export const columns: Array<any> = [
  { type: 'index', label: '序号' },
  { label: '业务类型', prop: 'bsName' }
]
export const tableData = []
export const form = {
  bsName: '',
  bsDescribe: '',
  bsCode: ''
}
export const rules = {
  bsName: [{ required: true, message: '此项不能为空', trigger: 'blur' }]
}
