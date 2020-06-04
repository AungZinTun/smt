import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import shared from './modules/shared.js'
import brands from './modules/brands.js'
import products from '@/store/modules/products.js'
import users from '@/store/modules/users.js'
import categories from '@/store/modules/categories'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
   categories,
   brands,
   products,
   shared,
   auth,
   users,
  },
  state: { },
  mutations,
  actions,
  getters,
})
