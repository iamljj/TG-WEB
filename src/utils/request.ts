import axios from './axios'
// 分页查询
export const pageSize = (page: number) => {
  return axios.post('/', { page: page })
}
// 请求当前页面数据 加上url转变为通用，所有不需要传参的请求都可以走这个方法
// 第一次进入页面请求头像等个人数据
// 请求商品列表数据
export const tableData = (url: string) => {
  return axios.get(url)
}
// 商品页面数据修改
export const tableChange = ({ name, phone, date }: any, id: string) => {
  return axios.put('/' + id, { name, phone, date })
}
// 删除列表中一条数据
export const handleDel = (url: string, id: string) => {
  return axios.delete(url + 'id=' + id)
}
// 搜索
export const searchAxios = (url: string, searchText: string) => {
  return axios.post(url, { data: searchText })
}
