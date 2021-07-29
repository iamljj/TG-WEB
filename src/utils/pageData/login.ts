import { reactive, ref } from 'vue'
import { User, Rules } from './pageType'
// password username
const loginUser = ref<User>({
  phone: null, // 手机号
  vercode: null // 验证码
})

// input rules
const rules = ref<Rules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur' }
  ],
  vercode: [{ required: true, message: '请输入手机号', trigger: 'change' }]
})

export default {
  loginUser,
  rules
}
