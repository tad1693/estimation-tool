import firebaseConfig from '../firebaseConfig'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default {
  signInFirebase (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      console.error(error.message)
    })
    return this.getUser()
  },
  getUser () {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(function (user) {
        resolve(user)
      })
    })
  },
  getCurrentUser () {
    return firebase.auth().currentUser
  }
}
