import Vue from 'vue'
import Vuex from 'vuex'
import * as shop from '@/store/modules/shop.js'
import * as users from '@/store/modules/users.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
   shop,
   users,
  },
  state: {
    barColor: 'rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)',
    drawer: false,
    snackbar: false,
  },
  mutations: {
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

  },
})
