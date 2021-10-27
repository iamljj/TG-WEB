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
export const tableChange = (url: any, form: any) => {
  return axios.post(url, form)
}
//修改状态
export const statuChange = (id: Number, status: Number) => {
  return axios.get(`/proxy/7003/service/admin/updateStatus/${id}/${status}`)
}
// 新增
export const tablePost = (url: string, form: any) => {
  return axios.post(url, form)
}
// 删除
export const handleDel = (url: any, id: string) => {
  return axios.delete(url + id)
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
  return axios.get('/proxy/7003/service/admin/user/locals')
}
//查询所有职位
export const selectJobs = () => {
  return axios.get('/proxy/7003/service/admin/user/Roles')
}
//查询陈列箱
export const displayall = (data) => {
  return axios.post('/proxy/7003/service/admin/display/findAll', data)
}
//查询所有员工信息
export const usersall = (data) => {
  return axios.post('/proxy/7003/service/admin/users', data)
}
//查询所有的上级
export const getAllSuperior = () => {
  return axios.post('/proxy/7003/service/admin/users/getAllSuperior')
}
//查询所有下级
export const xj = (data) => {
  return axios.post('/proxy/7003/service/admin/subordinateList', data)
}
//查询所有角色
export const role = (data) => {
  return axios.post('/proxy/7003/service/admin/searchRole', data)
}
//获取组织架构
export const getOrganization = () => {
  return axios.get('/proxy/7003/service/admin/structureDetails')
}
//新增节点
export const addnode = (data) => {
  return axios.post('/proxy/7003/service/admin/addChildNode', data)
}
