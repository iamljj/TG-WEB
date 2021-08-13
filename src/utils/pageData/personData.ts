import { ref, reactive } from 'vue'
export const optionsJob = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
export const dioJobData = [
  {
    value: '选项1',
    label: 'a'
  },
  {
    value: '选项2',
    label: 'b'
  },
  {
    value: '选项3',
    label: 'c'
  },
  {
    value: '选项4',
    label: 'd'
  },
  {
    value: '选项5',
    label: 'e'
  }
]
export const selectSuperiorData = [
  {
    value: '选项1',
    label: 'n'
  },
  {
    value: '选项2',
    label: 'f'
  },
  {
    value: '选项3',
    label: 'g'
  },
  {
    value: '选项4',
    label: 'h'
  },
  {
    value: '选项5',
    label: 'e'
  }
]
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
  name: '',
  phone: '',
  sex: '',
  job: '',
  superior: ''
})
export const job = ref('')
export const table = [
  { name: '姓名', prop: 'name', width: 180 },
  { name: '登录账号', prop: 'userName', width: 200 },
  { name: '手机号', prop: 'phone', width: 200 },
  { name: '上级', prop: 'superior', width: 200 },
  { name: '职务', prop: 'job', width: 200 },
  { name: '性别', prop: 'sex', width: 200 },
  { name: '创建时间', prop: 'time', width: 200 }
]
export const tableData = ref([
  {
    name: '刘恩纶',
    phone: '17390394258',
    userName: '17390394258',
    superior: '我自己',
    job: '业务员',
    sex: '男',
    time: '2021年8月11日 11:53:27'
  },
  {
    name: '刘恩纶',
    phone: '17390394258',
    userName: '17390394258',
    superior: '我自己',
    job: '业务员',
    sex: '男',
    time: '2021年8月11日 11:53:27'
  },
  {
    name: '刘恩纶',
    phone: '17390394258',
    userName: '17390394258',
    superior: '我自己',
    job: '业务员',
    sex: '男',
    time: '2021年8月11日 11:53:27'
  }
])
// 电话号码修改是否展示
export const phoneShow = ref<boolean>(false)
// 规则
export const rules = {
  name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
  sex: [{ message: '请选择性别', trigger: 'change' }],
  job: [{ required: true, message: '请选择职务', trigger: 'change' }],
  superior: [{ required: true, message: '请选择上级', trigger: 'change' }]
}

export const formRules: any = ref(null)
