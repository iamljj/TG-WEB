import { reactive, ref } from 'vue'
import { activeNameType, allTableDataType, activityForm, optionData } from './pageType'
export const activeName = ref<activeNameType[]>([
  { label: '全部' },
  { label: '进行中' },
  { label: '已完成' }
])
export const formLabelWidth = ref<string>('300px;')
export const allTable: allTableDataType[] = [
  {
    name: '编码',
    prop: 'number',
    width: 100
  },
  {
    name: '活动名称',
    prop: 'name',
    width: 200
  },
  {
    name: '活动状态',
    prop: 'type',
    width: 300
  },
  {
    name: '开展时间',
    prop: 'time',
    width: 200
  },
  {
    name: '活动地点',
    prop: 'address',
    width: 300
  },
  {
    name: '活动说明',
    prop: 'explain',
    width: 200
  }
]
export const options = ref<optionData[]>([
  {
    value: '选项1',
    label: '箱/个'
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
])
export const allTableData = ref([
  {
    number: 1,
    name: '第一个活动',
    type: '进行中',
    address: '西部智谷',
    time: '2021.2.1-2021.7.1',
    explain: '俺是馁爹'
  },
  {
    number: 2,
    name: '第一个活动',
    type: '进行中',
    address: '西部智谷',
    time: '2021.2.1-2021.7.1',
    explain: '俺是馁爹'
  },
  {
    number: 4,
    name: '第一个活动',
    type: '进行中',
    address: '西部智谷',
    time: '2021.2.1-2021.7.1',
    explain: '俺是馁爹'
  },
  {
    number: 3,
    name: '第一个活动',
    type: '进行中',
    address: '西部智谷',
    time: '2021.2.1-2021.7.1',
    explain: '俺是馁爹'
  }
])
export const formId = ref<string>('')
export const form = reactive({
  id: '',
  number: null,
  name: '',
  type: '',
  address: '',
  //   startTime:null,
  time: [],
  //   endTime:null,
  explain: ''
})
export const time: any = ref(null)
export const formRules: any = ref(null)
export const activeShow = ref<boolean>(false)
export const rules = {
  number: [{ required: true, message: '请填写编号' }],
  name: [{ required: true, message: '请填写活动名称', trigger: 'blur' }],
  explain: [{ required: true, message: '请填写活动说明', trigger: 'blur' }],
  time: [{ type: 'array', required: true, message: '请选择日期', trigger: 'blur' }],
  price: [{ required: true, message: '请填写商品价格', trigger: 'blur' }],
  img: [{ required: true, message: '请选择图片', trigger: 'blur' }],
  address: [{ required: true, message: '请填写活动地点', trigger: 'blur' }]
}

// 关闭dio时
export const handleClose = (done: any) => {
  for (const key in form) {
    form[key] = ''
  }
  done()
}
