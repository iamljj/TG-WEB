import { createStore } from 'vuex'
import { GlobalDataProps } from './types'
import { storage } from '@/utils/storage'

export default createStore<GlobalDataProps>({
  state: {
    token: storage.get('token') || '',
    header: '@/assets/header.png',
    nickName: '111',
    dialogFormVisible: false
  },
  mutations: {
    login(state, rawData) {
      const { token } = rawData
      state.token = token
      storage.set('token', token)
    },
    user(state, { header, nickName }) {
      state.header = header
      state.nickName = nickName
    },
    changeStorage(state, rawData) {
      state.dialogFormVisible = rawData
    }
  },
  actions: {},
  modules: {}
})
