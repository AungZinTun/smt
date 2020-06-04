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
    productRepliesCount: state => id => countObjectProperties(state.items[id].posts) - 1,
  },

  actions: {
    createProduct ({ state, commit, dispatch, rootState }, { text, title, forumId }) {
      return new Promise((resolve, reject) => {
        const productId = firebase.database().ref('products').push().key
        const postId = firebase.database().ref('posts').push().key
        const userId = rootState.auth.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const product = { title, forumId, publishedAt, userId, firstPostId: postId, posts: {} }
        product.posts[postId] = postId
        const post = { text, publishedAt, productId, userId }

        const updates = {}
        updates[`products/${productId}`] = product
        updates[`forums/${forumId}/products/${productId}`] = productId
        updates[`users/${userId}/products/${productId}`] = productId

        updates[`posts/${postId}`] = post
        updates[`users/${userId}/posts/${postId}`] = postId
        firebase.database().ref().update(updates)
          .then(() => {
            // update product
            commit('setItem', { resource: 'products', id: productId, item: product }, { root: true })
            commit('forums/appendProductToForum', { parentId: forumId, childId: productId }, { root: true })
            commit('users/appendProductToUser', { parentId: userId, childId: productId }, { root: true })
            // update post
            commit('setItem', { resource: 'posts', item: post, id: postId }, { root: true })
            commit('appendPostToProduct', { parentId: post.productId, childId: postId })
            commit('users/appendPostToUser', { parentId: post.userId, childId: postId }, { root: true })

            resolve(state.items[productId])
          })
      })
    },

    updateProduct ({ state, commit, dispatch, rootState }, { title, text, id }) {
      return new Promise((resolve, reject) => {
        const product = state.items[id]
        const post = rootState.posts.items[product.firstPostId]

        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId,
        }

        const updates = {}
        updates[`posts/${product.firstPostId}/text`] = text
        updates[`posts/${product.firstPostId}/edited`] = edited
        updates[`products/${id}/title`] = title

        firebase.database().ref().update(updates)
          .then(() => {
            commit('setProduct', { product: { ...product, title }, productId: id })
            commit('posts/setPost', { postId: product.firstPostId, post: { ...post, text, edited } }, { root: true })
            resolve(post)
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

    appendPostToProduct: makeAppendChildToParentMutation({ parent: 'products', child: 'posts' }),
    appendContributorToProduct: makeAppendChildToParentMutation({ parent: 'products', child: 'contributors' }),
  },
}
