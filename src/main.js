
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
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import AppDate from '@/components/AppDate'

Vue.config.productionTip = false
Vue.component('AppDate', AppDate)

const config = {
  apiKey: 'AIzaSyC1KYNdVNPMO2AAyi-b_5_DX_BfcJezPlo',
  authDomain: 'shweminthamee-mm.firebaseapp.com',
  databaseURL: 'https://shweminthamee-mm.firebaseio.com',
  projectId: 'shweminthamee-mm',
  storageBucket: 'shweminthamee-mm.appspot.com',
  messagingSenderId: '322087884448',
  appId: '1:322087884448:web:ec8d55fa78b9979e9d1bc5',
  measurementId: 'G-W46NS2VKGP',
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  components: { App },
  render: h => h(App),
}).$mount('#app')
