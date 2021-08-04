import { reactive, ref, unref } from 'vue'
import { tableType, tableDataType, rulesChange, formType, optionData } from './pageType'
export const dialogFormVisible = ref<boolean>(false)
export const table: tableType[] = [
  {
    name: '编码',
    prop: 'id',
    width: 100
  },
  {
    name: '商品名称',
    prop: 'name',
    width: 200
  },
  {
    name: '规格属性',
    prop: 'type',
    width: 300
  },
  {
    name: '商品价格',
    prop: 'price',
    width: 200
  },
  {
    name: '图片',
    prop: 'img',
    width: 300
  },
  {
    name: '基本单位',
    prop: 'base',
    width: 200
  }
]

export const tableData = ref<tableDataType[]>([
  {
    id: 1,
    name: '张三',
    type: '200ml',
    price: '￥120',
    img: '',
    base: '瓶'
  },
  {
    id: 2,
    name: '张三',
    type: '200ml',
    price: '￥120',
    img: '',
    base: '瓶'
  },
  {
    id: 4,
    name: '张三',
    type: '200ml',
    price: '￥120',
    img: '',
    base: '瓶'
  },
  {
    id: 3,
    name: '张三',
    type: '200ml',
    price: '￥120',
    img: '',
    base: '瓶'
  }
])
export const rules: rulesChange = {
  id: [{ require: true, message: '请填写商品编号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
  type: [{ required: true, message: '请填写规格属性', trigger: 'blur' }],
  price: [{ required: true, message: '请填写商品价格', trigger: 'blur' }],
  img: [{ required: true, message: '请选择图片', trigger: 'blur' }],
  base: [{ required: true, message: '请选择基本单位', trigger: 'blur' }]
}
export const formRules: any = ref(null)
// 选中的id
export let form = reactive<formType>({
  id: '',
  name: '',
  type: '',
  price: '',
  img: '',
  base: '箱/个'
})
export const formLabelWidth = ref<string>('100px;')
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
// 修改的数据
export const handleClick = (scoped: any) => {
  dialogFormVisible.value = true
  for (let key in scoped) {
    form[key] = scoped[key]
  }
}
// 关闭dio时
export const handleClose = (done: any) => {
  for (let key in form) {
    form[key] = ''
  }
  done()
}
