import { AxiosResponse } from 'axios'
import axios from './axios'

interface ITest {
  data: {
    id: string
    code: number
  }
}
// 分页查询
export const pageSize: (page: number) => Promise<AxiosResponse<any>> = (page: number) => {
  return axios.post('/', page)
}
// 请求当前页面数据 加上url转变为通用，所有不需要传参的请求都可以走这个方法
// 第一次进入页面请求头像等个人数据
// 请求商品列表数据
export const tableData: (url: string) => Promise<AxiosResponse<any>> = (url) => {
  return axios.get(url)
}
// 商品页面数据修改
export const tableChange: (
  {
    name,
    phone,
    date
  }: {
    name: any
    phone: any
    date: any
  },
  id: any
) => Promise<AxiosResponse<any>> = ({ name, phone, date }, id) => {
  return axios.put('/', { name, phone, date })
}
// 删除列表中一条数据
export const handleDel: (url: string, id: string) => Promise<AxiosResponse<any>> = (url, id) => {
  return axios.delete(url)
}
