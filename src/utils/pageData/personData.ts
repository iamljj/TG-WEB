import { ref, reactive } from 'vue'
import { getOAframework } from '@/service/frameworkNode'

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

// tabPane数据
interface labelValueType {
  label: string
  value: string
}
export const tabs: Array<labelValueType> = [
  {
    label: '内部架构',
    value: '内部架构'
  },
  {
    label: '外部架构',
    value: '外部架构'
  }
]

// 组织架构
export interface treeDataType {
  label: string
  id: number
  children?: Array<treeDataType>
}

// 查询次数
let time = 0
let res: any = []
// 通过deep控制嵌套层级
export const treeData = async (deep: number, params?: any) => {
  time++
  let { data } = await getOAframework(params)
  if (data.code == 200) {
    res = res.concat(data.data)
    for (let i = 0; i < data.data.length; i++) {
      let { nodeCode, leaf } = data.data[i]
      if (deep == time) {
        time = 0
        break
      } else {
        if (leaf == false) {
          await treeData(deep, { path:nodeCode })
        }
      }
    }
    return res
  }
}

// 搜索条件
export const jobs: Array<labelValueType> = [
  {
    label: '总经理',
    value: '总经理'
  },
  {
    label: '业务员',
    value: '业务员'
  },
  {
    label: '团购经理',
    value: '团购经理'
  }
]

export const status: Array<labelValueType> = [
  {
    label: '启用',
    value: '启用'
  },
  {
    label: '停用',
    value: '停用'
  }
]

// 表格
export const columns: Array<any> = [
  { type: 'selection' },
  { type: 'index', label: '序号' },
  { label: '姓名', prop: 'name' },
  { label: '电话号码', prop: 'phone' },
  { label: '岗位', prop: 'job' },
  { label: '节点', prop: 'node' },
  { label: '创建人', prop: 'creater' },
  { label: '状态', prop: 'state' }
]
export const tableData = [
  {
    name: '张三',
    phone: '13012312345',
    job: '总经理',
    node: '',
    creater: '',
    state: ''
  }
]

// form 验证
export const formRules: Object = {
  name: [{ required: true, message: '人员姓名不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '人员电话不能为空', trigger: 'blur' }],
  roles: [{ required: true, message: '人员角色不能为空', trigger: 'change' }],
  node: [{ required: true, message: '架构节点不能为空', trigger: 'blur' }]
}

interface jobType {
  label: string
  value: string
}
