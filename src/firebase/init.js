import firebase from 'firebase'
// import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDATH4dP01J5FDKS-8S7WM6Y1j63aPA3nU',
  authDomain: 'nap-tgi.firebaseapp.com',
  databaseURL: 'https://nap-tgi.firebaseio.com',
  projectId: 'nap-tgi',
  storageBucket: 'nap-tgi.appspot.com',
  messagingSenderId: '873833476465',
  appId: '1:873833476465:web:0d6875917b47de2beac6d0',
  measurementId: 'G-L4NN9PXTHT',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = firebase.currentUser
const userCollection = db.collection('users')
const patientCollection = db.collection('patients')
const visitCollection = db.collection('visits')
// export our database
export {
  db,
  auth,
  currentUser,
  userCollection,
  patientCollection,
  visitCollection,
}
