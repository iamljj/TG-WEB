import { ref, reactive } from 'vue'
import { storage } from '../storage'
export const dioJobData = []
export const selectSuperiorData = []
export const selectSexData = [
  {
    value: '0',
    label: '男'
  },
  {
    value: '1',
    label: '女'
  }
]
export const formLabelWidth = '100px'
export const form = reactive({
  id: '',
  local: '',
  name: '',
  phone: '',
  sex: '',
  role: '',
  superior: '',
  roleName: ''
})
export const job = ref('')
export const local = ref('')
export const optionsJob = ref([])
export const optionslocal = ref([])
export const page = ref(1)
export const pagesize = ref(8)
export const total = ref(1)
export const optionsSuperior = ref([])
export const title = ref('')
export const id = ref('')

export const table = [
  { name: '姓名', prop: 'name', width: 180 },
  { name: '地区', prop: 'local', width: 180 },
  { name: '登录账号', prop: 'phone', width: 200 },
  { name: '手机号', prop: 'phone', width: 200 },
  { name: '上级', prop: 'superior', width: 200 },
  { name: '职务', prop: 'roleName', width: 200 },
  { name: '性别', prop: 'sex', width: 200 },
  { name: '创建时间', prop: 'refreshTime', width: 200 }
]
export const tableData = ref([])
// 电话号码修改是否展示
export const phoneShow = ref<boolean>(false)
// 规则
export const rules = {
  name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur' }
  ],
  sex: [{ message: '请选择性别', trigger: 'change' }],
  roleName: [{ required: true, message: '请选择职务', trigger: 'change' }],
  superior: [{ required: true, message: '请选择上级', trigger: 'change' }]
}

export const formRules: any = ref(null)
