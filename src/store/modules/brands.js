import { makeAppendChildToParentMutation } from '@/store/assetHelpers'
import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    fetchAllBrands ({ state, commit }) {
      console.log('🔥', '🥇', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('brands').once('value', snapshot => {
          const brandsObject = snapshot.val()
          Object.keys(brandsObject).forEach(brandId => {
            const brand = brandsObject[brandId]
            commit('setItem', { resource: 'brands', id: brandId, item: brand }, { root: true })
          })
          resolve(Object.values(state.items))
        })
      })
    },
    fetchBrand: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'brands', id, emoji: '🌧' }, { root: true }),
    fetchBrands: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'brands', ids, emoji: '🌧' }, { root: true }),
  },

  mutations: {
    appendProductToBrand: makeAppendChildToParentMutation({ parent: 'brands', child: 'products' }),
  },
}
