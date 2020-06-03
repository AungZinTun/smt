import Vue from 'vue'
import Vuex from 'vuex'
import * as items from '@/store/modules/items.js'
import * as users from '@/store/modules/users.js'
import categories from './modules/categories'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
   items,
   users,
   categories,
  },
  state: {
    loading: false,
    error: null,
    barColor: 'rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)',
    drawer: false,
    snackbar: false,
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    // index
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SNACKBAR (state, payload) {
      state.snackbar = payload
    },
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    },
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
  },
})
