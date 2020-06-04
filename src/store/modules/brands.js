import { makeAppendChildToParentMutation } from '@/store/assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    fetchBrand: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'brands', id, emoji: '🌧' }, { root: true }),
    fetchBrands: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'brands', ids, emoji: '🌧' }, { root: true }),
  },

  mutations: {
    appendThreadToBrand: makeAppendChildToParentMutation({ parent: 'brands', child: 'threads' }),
  },
}
