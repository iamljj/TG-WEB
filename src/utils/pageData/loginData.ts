import { ref } from 'vue'
import { User, Rules } from './pageType'
import {getVerCode, login} from "@/service/login"
// password username
export const loginUser = ref<User>({
  phone: null, // 手机号
  code: null, // 验证码
  sandbox: true //是否沙盒
})

// input rules
export const rules: Rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur' }
  ],
  code: [{ required: false, message: '请输入验证码', trigger: 'blur' }]
}
// DOM Ref
export const formRules = ref<null | HTMLFormElement>(null)
// 倒计时方法
export let isVercode = ref(true)
export let time = ref(60)
export let vercodeText = ref('获取验证码')

export const countDown = () => {
  let timer = null;
  if (time.value == 0) {
    vercodeText.value = '重新获取验证码'
    isVercode.value = true
    time.value = 60;
    clearTimeout(timer)
  } else {
    time.value--
    timer = setTimeout(() => {
      countDown()
    }, 1000)

  }
}

// 获取验证码
export const get_ver_code =async (params) => {
  let { data } = await getVerCode(params);
  if (data.code !== 200) {
    //TODO:根据后端错误处理方式修改
    return '请输入正确的手机号'
  }
  return {
    data
  }
}

// 登录
export const log_in =async (params) => {
  let { data } = await login(params);
  if (data.code == 200) {
    return data;
  } else {
    //TODO:根据后端错误处理方式修改
    return '请输入正确的手机号或验证码'
  }
}
