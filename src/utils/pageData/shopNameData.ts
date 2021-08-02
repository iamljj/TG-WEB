import { reactive, ref } from 'vue'
import { tableType, tableDataType } from './pageType'
export const table: tableType[] = [
  {
    name: '商品名称',
    prop: 'name',
    width: 200
  },
  {
    name: '电话号码',
    prop: 'phone',
    width: 600
  },
  {
    name: '注册日期',
    prop: 'time',
    width: 550
  }
]

export const tableData = ref<tableDataType[]>([
  {
    name: '张三',
    phone: '12345678901',
    time: '2021-08-02'
  },
  {
    name: '张三',
    phone: '12345678901',
    time: '2021-08-02'
  },
  {
    name: '张三',
    phone: '12345678901',
    time: '2021-08-02'
  },
  {
    name: '李四',
    phone: '12345678901',
    time: '2021-08-02'
  }
])
