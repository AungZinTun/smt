import { countObjectProperties } from '@/utils'
import firebase from 'firebase'
import Vue from 'vue'
import { makeAppendChildToParentMutation } from '@/store/assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  getters: {
    productRepliesCount: state => id => countObjectProperties(state.items[id].prices) - 1,
  },

  actions: {
    createProduct ({ state, commit, dispatch, rootState }, { text, name, brandId, categoryId, retailPrice, image }) {
      return new Promise((resolve, reject) => {
        const productId = firebase.database().ref('products').push().key

        const filename = image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        const src = firebase.storage().ref('products/' + productId + '.' + ext).put(image)
          .then(fileData => {
            fileData.ref.getDownloadURL().then((imageUrl) => {
            return imageUrl
          })
          })
        const priceId = firebase.database().ref('prices').push().key
        const userId = rootState.auth.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const product = { name, text, brandId, categoryId, publishedAt, userId, retailPriceId: priceId, prices: {}, image: src }
        product.prices[priceId] = priceId
        const price = { publishedAt, productId, userId, quanity: 1, retailPrice }

        const updates = {}
        updates[`products/${productId}`] = product
        updates[`brands/${brandId}/products/${productId}`] = productId
        updates[`users/${userId}/products/${productId}`] = productId
        updates[`categories/${categoryId}/products/${productId}`] = productId

        updates[`prices/${priceId}`] = price
        firebase.database().ref().update(updates)
          .then(() => {
            // update product
            commit('setItem', { resource: 'products', id: productId, item: product }, { root: true })
            commit('brands/appendProductToBrand', { parentId: brandId, childId: productId }, { root: true })
            commit('categories/appendProductToBrand', { parentId: brandId, childId: productId }, { root: true })
            commit('users/appendProductToUser', { parentId: userId, childId: productId }, { root: true })
            // update price
            commit('setItem', { resource: 'prices', item: price, id: priceId }, { root: true })
            commit('appendPriceToProduct', { parentId: price.productId, childId: priceId })
            commit('users/appendPriceToUser', { parentId: price.userId, childId: priceId }, { root: true })

            resolve(state.items[productId])
          })
      })
    },

    updateProduct ({ state, commit, dispatch, rootState }, { title, text, id }) {
      return new Promise((resolve, reject) => {
        const product = state.items[id]
        const price = rootState.prices.items[product.firstPriceId]

        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId,
        }

        const updates = {}
        updates[`prices/${product.firstPriceId}/text`] = text
        updates[`prices/${product.firstPriceId}/edited`] = edited
        updates[`products/${id}/title`] = title

        firebase.database().ref().update(updates)
          .then(() => {
            commit('setProduct', { product: { ...product, title }, productId: id })
            commit('prices/setPrice', { priceId: product.firstPriceId, price: { ...price, text, edited } }, { root: true })
            resolve(price)
          })
      })
    },
    fetchAllProducts ({ state, commit }) {
      console.log('🔥', '👜', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('products').once('value', snapshot => {
          const productsObject = snapshot.val()
          Object.keys(productsObject).forEach(productId => {
            const product = productsObject[productId]
            commit('setItem', { resource: 'products', id: productId, item: product }, { root: true })
          })
          resolve(Object.values(state.items))
        })
      })
    },
    fetchProduct: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'products', id, emoji: '📄' }, { root: true }),
    fetchProducts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'products', ids, emoji: '🌧' }, { root: true }),
  },
  mutations: {
    setProduct (state, { product, productId }) {
      Vue.set(state.items, productId, product)
    },

    appendPriceToProduct: makeAppendChildToParentMutation({ parent: 'products', child: 'prices' }),
    appendContributorToProduct: makeAppendChildToParentMutation({ parent: 'products', child: 'contributors' }),
  },
}
