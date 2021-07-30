import { ref } from 'vue'
import { User, Rules } from './pageType'
// password username
export const loginUser = ref<User>({
  phone: null, // 手机号
  vercode: null // 验证码
})

// input rules
export const rules = ref<Rules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur' }
  ],
  vercode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
// DOM Ref
export const formRules = ref<null | HTMLFormElement>(null)
// vercode show Time
export const isVercode = ref(true)
// count down
export const time = ref(60)
// vercode Text
export const vercodeText = ref('获取验证码')
