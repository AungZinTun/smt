<template>
  <div>
    <h2>Set Password</h2>
    <input
      v-model="password"
      placeholder="Enter Password"
    ><br>
    <input
      v-model="password_2"
      placeholder="Re-enter Password"
    ><br>
    <button @click="setPassword">
      Set Password
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        password: '',
        password_2: '',
      }
    },
    methods: {
      setPassword () {
        if (this.password !== this.password_2) {
          alert('Password did not match !')
        } else {
          const vm = this
          var user = firebase.auth().currentUser
          //
          const newEmail = firebase.auth().currentUser.phoneNumber + '@ph.com'
          const newPassword = this.password
          //
          user.updateEmail(newEmail).then(() => {
            user.updatePassword(newPassword).then(() => {
              this.$store.dispatch('auth/signInWithEmailAndPassword', {
                email: this.newEmail,
                password: this.newPassword,
              })
                .then(() => this.successRedirect())
                .catch(error => alert('🤷‍️' + error.message))
            })
              .catch(function (error) {
                alert('Error :' + error.message)
              })
          }).catch(function (error) {
            // Logout if session expires !
            if (error.code === 'auth/requires-recent-login') {
              alert('Your Session has been Expired to Set Password ! Please try again !')
              //
              vm.signout()
            }
          })
        }
      },
      signout () {
        firebase.auth().signOut()
        this.$router.push({ path: '/' })
        window.location.reload() // reload on signout !
      },
    },
  }
</script>
