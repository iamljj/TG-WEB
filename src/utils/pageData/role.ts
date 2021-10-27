import { reactive, ref } from 'vue'
import { options } from './activityData'
import { tableType, tableDataType, rulesChange, formType, optionData } from './pageType'

export const table: tableType[] = [
  {
    name: '角色',
    prop: 'roleDesc',
    width: 400
  },
  {
    name: '状态',
    prop: 'status',
    width: 400
  },
  { name: '组织架构', prop: 'structure', width: 400 }
]
export const tableData = ref()
export const rules = { roleDesc: [{ required: true, message: '请填角色名称', trigger: 'blur' }] }

export const formRules: any = ref(null)
// 选中的id
export const formId = ref(null)

export const form = reactive({
  roleDesc: '',
  state: '',
  id: '',
  structure: '',
  jurisdiction: []
})
export const data = ref([
  {
    id: 1,
    label: '小程序',
    children: [
      {
        id: 3,
        label: '首页',
        children: [
          {
            id: 7,
            label: '客户管理',
            children: [
              {
                id: 8,
                label: '终端客户',
                children: [
                  {
                    id: 20,
                    label: '查看'
                  },
                  {
                    id: 21,
                    label: '操作'
                  }
                ]
              },
              {
                id: 9,
                label: '合伙人'
              },
              {
                id: 10,
                label: '关怀'
              },
              {
                id: 11,
                label: '影响人'
              },
              {
                id: 12,
                label: '客户检核'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        label: '待办'
      },
      {
        id: 5,
        label: '通讯录'
      },
      {
        id: 6,
        label: '我的'
      }
    ]
  },
  {
    id: 2,
    label: '后台',
    children: [
      {
        id: 13,
        label: '人员管理',
        children: [
          {
            id: 22,
            label: '查看架构图'
          },
          {
            id: 23,
            label: '查看人员'
          }
        ]
      },
      {
        id: 14,
        label: '系统设置',
        children: [
          { id: 15, label: '角色管理' },
          {
            id: 16,
            label: '组织框架'
          }
        ]
      },
      {
        id: 17,
        label: '陈列项管理',
        children: [
          {
            id: 18,
            label: '查看列表'
          },
          {
            id: 19,
            label: '操作列表'
          }
        ]
      }
    ]
  }
])
export const defaultProps = ref({
  children: 'children',
  label: 'label'
})
export const category = ref([
  {
    value: '内部框架',
    label: '内部框架'
  },
  {
    value: '外部框架',
    label: '外部框架'
  }
])
export const totol = ref(1)
export const tree = ref()
export const page = ref(1)
export const pagesize = ref(8)
export const rolelist = ref([])
export const formLabelWidth = ref<string>('100px;')

// 关闭dio时
export const handleClose = (done: any) => {
  for (const key in form) {
    form[key] = ''
  }
  done()
}
