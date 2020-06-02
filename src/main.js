
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDOwTsFBCivCPW4vX5ansCcqi_kLRsyW6k',
      authDomain: 'shweminthamee-1e281.firebaseapp.com',
      databaseURL: 'https://shweminthamee-1e281.firebaseio.com',
      projectId: 'shweminthamee-1e281',
      storageBucket: 'shweminthamee-1e281.appspot.com',
      messagingSenderId: '563061846922',
      appId: '1:563061846922:web:f0b6a36d9a43a8a4d70e73',
      measurementId: 'G-92GWFD5TCJ',
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  },
  render: h => h(App),
}).$mount('#app')
