module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    // 函数写有明确返回值
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 不能在顶层require
    '@typescript-eslint/no-var-requires': 'off',
    // 禁止空方法
    '@typescript-eslint/no-empty-function': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止未使用的变量
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 数组出现奇怪写法 [,1]
    'no-sparse-arrays': 'warn',
    // 非const变量未被重新赋值
    'prefer-const': 'warn',
    // 非必要的bind
    'no-extra-bind': 'warn',
    // 非必要的call,apply
    'no-useless-call': 'warn',
    // 禁止不可到达的代码
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止出现空代码块
    'no-empty': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //比较时显示的值应该在右边
    yoda: 'warn',
    //delete删除变量无效,只能删除对象属性
    'no-delete-var': 'error',
    // 禁止直接赋值未申明的变量
    'no-undef': 'error',
    // 禁止new require()
    'no-new-require': 'error',
    'prettier/prettier': 'warn'
  }
}
