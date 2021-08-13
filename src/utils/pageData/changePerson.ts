import { ref } from 'vue'
export const changePerson = ref({
  name: '',
  newPassword: '',
  repeatPassword: ''
})
// 点击修改时 允许修改
export const changeName = ref<boolean>(true)
// 登录账号
export const userName = ref('17390394258')
// ref
export const formRules = ref(null)
// 修改密码弹出model
export const showPassword = ref(false)
// 自定义规则
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (formRules.value.newPassword !== '') {
      formRules.value.validateField('newPassword')
    }
    callback()
  }
}
const validatePassRepeat = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formRules.value.model.newPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

// 规则
export const rules = {
  name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
  newPassword: { validator: validatePass, trigger: 'blur' },
  repeatPassword: { validator: validatePassRepeat, trigger: 'blur' }
}
