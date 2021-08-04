import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN = 'token_key'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(TOKEN)) || '',
    user: getItem(TOKEN),
  },
  mutations: {
    getToken(state, data) {
      state.user = data
      // localStorage.setItem(TOKEN, JSON.stringify(state.user))
      setItem(TOKEN, data)
    },
  },
  actions: {},
  modules: {},
})
