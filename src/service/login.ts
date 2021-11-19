import axios from '@/utils/axios'

// 获取验证码
export const getVerCode = ({phone}) => {
  return axios.get(`/service/sms/LoginCode/${phone}`)
}

// 登录
export const login = (params) => {
  return axios.post(`/service/auth/login`,params)
}

