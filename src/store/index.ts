import { createStore } from 'vuex'
import { GlobalDataProps } from './types'
import { storage } from '@/utils/storage'

export default createStore({
  state: {
    token: storage.get('token') || '',
    header: '@/assets/header.png',
    nickName: '',
    dialogFormVisible: false,
    meta: [],
    scopedId: ''
  },
  mutations: {
    login(state, rawData) {
      const token = rawData
      state.token = token
      storage.set('token', token)
    },
    user(state, { header, name, role, id }) {
      const username = name
      state.header = header
      state.nickName = username
      storage.set('nickName', username)
      storage.set('role', role)
      storage.set('id', id)
    },
    changeStorage(state, rawData) {
      state.dialogFormVisible = rawData
    },
    pathRouter(state, meta) {
      state.meta = meta.map((item) => {
        return item.meta
      })
    },
    changeScopedId(state, scopedId) {
      state.scopedId = scopedId
    }
  },
  actions: {},
  modules: {}
})
