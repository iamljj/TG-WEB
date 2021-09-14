import axios from './axios'
// 分页查询
export const pageSize = (url: string, page: number) => {
  return axios.post(url + '/id=' + page)
}
// 请求当前页面数据 加上url转变为通用，所有不需要传参的请求都可以走这个方法
// 第一次进入页面请求头像等个人数据
// 请求商品列表数据
export const tableData = (url: string) => {
  return axios.get(url)
}
// 修改
export const tableChange = (url: string, form: any) => {
  return axios.post(url + '?id=' + form.id, form)
}
// 新增
export const tablePost = (url: string, form: any) => {
  return axios.post(url, form)
}
// 删除
export const handleDel = (url: any, id: string) => {
  return axios.delete(url + '?id=' + id)
}
// 搜索
export const searchAxios = (url: string, searchText: string) => {
  return axios.post(url, { data: searchText })
}
// 查询tab页数据
export const getTab = (index: number) => {
  return axios.get('/a?index=' + index)
}
// 查询对应page页的tab页数据
export const getTabCurrent = (index: number, currIndex: number) => {
  return axios.get('/?index=' + index + '?currIndex=' + currIndex)
}
// 提交个人信息修改
export const putInformation = (name: any, newPassword: string) => {
  return axios.put('/', { name: name, password: newPassword })
}
// 选择职位查询信息
export const selectJobs = (selectID: string) => {
  return axios.get('person?selectID=' + selectID)
}
// 选择活动页面tab页
export const getTabActivity = (index: number) => {
  return axios.get('/proxy/7003/activity?index=' + index)
}
// 选择活动页面tab+index页
export const getCurrentActivity = (index: number, currIndex: number) => {
  return axios.get('/?index=' + index + '?currIndex=' + currIndex)
}
// 查询所有地区
export const seletlocals = () => {
  return axios.get('/service/admin/user/locals')
}
//查询所有职位
export const selectJob = () => {
  return axios.get('/proxy/7003/service/admin/user/Roles')
}
//查询陈列箱
export const displayall = (data) => {
  return axios.post('/proxy/7003/service/admin/display/findAll', data)
}
