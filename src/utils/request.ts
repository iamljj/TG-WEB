import axios from './axios'

interface ITest {
  data: {
    id: string
    code: number
  }
}
// 第一次进入页面请求头像等个人数据
export const getHeader: any = () => {
  return axios.get('/')
}
