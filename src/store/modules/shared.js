
export default {
    namespaced: true,

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
}
