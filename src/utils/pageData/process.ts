let Mock = require('mockjs')

export interface processType {
  label: string
  value: string
  checked?:boolean
}
export const processData: Array<processType> = [
  {
    label: '全部',
    value: 'all',

  },
  {
    label: '团购',
    value: '团购'
  },
  {
    label: '直销',
    value: '直销'
  },
  {
    label: '费用项',
    value: '费用项'
  }
]
export const formRules = {
  name: [
    {
      required: true,
      message: '流程名称不能为空',
      trigger: 'blur'
    }
  ],
  sort: [
    {
      required: true,
      message: '流程分类不能为空',
      trigger: 'change'
    }
  ]
}
export const sorts: Array<processType> = [
  {
    label: '团购',
    value: '团购'
  },
  {
    label: '直销',
    value: '直销'
  },
  {
    label: '配送',
    value: '配送'
  },
  {
    label: '费用项',
    value: '费用项'
  },
  {
    label: '回厂游',
    value: '回厂游'
  }
]

// table
export const columns: Array<any> = [
  {
    type: 'index',
    label: '层级',
    width: '80'
  },
  {
    prop: 'id',
    label: 'id'
  },
  {
    prop: 'role',
    label: '审批人/审批角色'
  },
  {
    prop: 'conditions',
    label: '通过条件'
  }
]
export const processTableColumn: Array<any> = [
  {
    label: '流程名称',
    props: 'name'
  },
  {
    label: '流程分类',
    props: 'sort'
  },
  {
    label: '创建人',
    props: 'creater'
  },
  {
    label: '创建时间',
    props: 'createDate'
  },
  {
    label: '状态',
    props: 'status'
  }
]
const { processTableData } = Mock.mock({
  'processTableData|1-7': [
    {
      'id|+1': 1,
      name: '@name',
      sort: /^(团购|直销|费用项)$/,
      creater: '@first',
      'createDate|date': '2020-10-10',
      status: /^(启用|禁用)$/
    }
  ]
})

export const processTable: Array<any> = processTableData

const { tableList } = Mock.mock({
  'tableList|1-7': [
    {
      'id|+1': 1,
      role: /^(业务员|部门经理|销售主管)$/,
      conditions: /^(一人通过|全部通过)$/
    }
  ]
})

export const tableData: Array<any> = tableList

export const selectTab: Array<processType> = [
  {
    label: '岗位',
    value: 'job'
  },
  {
    label: '人员',
    value: 'person'
  }
]

export const jobs: Array<processType> = [
  {
    label: '销售主管1',
    value: '1001',
    checked: false
  },
  {
    label: '业务员1',
    value: '123',
    checked: false
  },
  {
    label: '团购经理1',
    value: '1456',
    checked: false
  },
  {
    label: '团购总监1',
    value: '12',
    checked: false
  },
  {
    label: '业务员2',
    value: '213',
    checked: false
  },
  {
    label: '销售主管2',
    value: '156',
    checked: false
  }
]

// 新增节点表格
export const personTableCol: Array<any> = [
  { type: 'selection' },
  { label: '姓名', prop: 'name' },
  { label: '电话号码', prop: 'phone' },
  { label: '角色', prop: 'role' },
  { label: '节点', prop: 'node' }
]

const { list } = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
      name: '@name',
      phone: /^1[3|5|7|8]\d{9}$/,
      role: '业务员',
      node: '节点',
      checked: false
    }
  ]
})

export const tpersonTableDatad: Array<any> = list;




