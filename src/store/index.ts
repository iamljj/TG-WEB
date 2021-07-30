import { createStore } from 'vuex'
import { GlobalDataProps } from './types'
import { storage } from '@/utils/storage'

export default createStore<GlobalDataProps>({
  state: {
    token: storage.get('token') || ''
  },
  mutations: {
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      storage.set('token', token)
    }
  },
  actions: {},
  modules: {}
})
