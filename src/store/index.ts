import { createStore } from 'vuex'
import { storage } from '@/utils/storage'
import {Node} from "./modules/index"


export default createStore({
  state: {
    token: storage.get('token') || '',
    header: '@/assets/header.png',
    nickName: '',
    dialogFormVisible: false,
    scopedId: '',
    keepAliveRouter: []
  },
  mutations: {
    login(state, rawData) {
      const token = rawData
      state.token = token
      storage.set('token', token)
    },
    user(state, { header, name, role, id, roleName }) {
      const username = name
      state.header = header
      state.nickName = username
      storage.set('nickName', username)
      storage.set('role', role)
      storage.set('id', id)
      storage.set('roleName', roleName)
    },
    changeStorage(state, rawData) {
      state.dialogFormVisible = rawData
    },

    changeScopedId(state, scopedId) {
      state.scopedId = scopedId
    },
    SET_KEEP_ALIVE_ROUTER(state, payload = []) {
      state.keepAliveRouter = payload
    }
  },
  actions: {},
  modules: {
    // 访问的时候多加上模块名称，比如 store.Node.xxx
    Node: {
      namespaced: true,
      ...Node
    }
  }
})
