import { countObjectProperties, removeEmptyProperties } from '@/utils'
import firebase from 'firebase'
import Vue from 'vue'
import { makeAppendChildToParentMutation } from '@/store/assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  getters: {
    userPrices: (state, getters, rootState) => id => {
      const user = state.items[id]
      if (user.prices) {
        return Object.values(rootState.prices.items)
          .filter(price => price.userId === id)
      }
      return []
    },

    userProductsCount: state => id => countObjectProperties(state.items[id].products),
    userPricesCount: state => id => countObjectProperties(state.items[id].prices),
  },

  actions: {
    createUser ({ state, commit }, { id, email, username }) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = { email, username, usernameLower, registeredAt }
        firebase.database().ref('users').child(id).set(user)
          .then(() => {
            console.log('user created on firebase')
            commit('setItem', { resource: 'users', id: id, item: user }, { root: true })
            resolve(state.items[id])
          })
      })
    },

    updateUser ({ commit }, user) {
      const updates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location,
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(user['.key']).update(removeEmptyProperties(updates))
          .then(() => {
            commit('setUser', { userId: user['.key'], user })
            resolve(user)
          })
      })
    },

    fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id, emoji: '🙋' }, { root: true }),
    fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids, emoji: '🙋' }, { root: true }),
  },

  mutations: {
    setUser (state, { user, userId }) {
      Vue.set(state.items, userId, user)
    },

    appendPriceToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'prices' }),
    appendProductToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'products' }),
  },
}
