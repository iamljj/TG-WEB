const dev = process.env.NODE_ENV === 'development'
let REQUEST_ADDRESS = 'Online' //线上请求地址 baseurl
if (dev) {
  REQUEST_ADDRESS = 'http://rap2api.taobao.org/app/mock/data/' //本地请求地址
}
// 传递给后端的token字段名
const TOKEN_FIELD = 'token'
// 返回的code是否验证合法
const CODE_VERIFICATION = true
// 返回数据合法的code定义,接收到未定义的code会抛出异常。
const LEGAL_CODES = {
  200: 'success',
  301: 'redirect',
  304: 'redirect'
}
export { REQUEST_ADDRESS, TOKEN_FIELD, LEGAL_CODES, CODE_VERIFICATION, dev }
