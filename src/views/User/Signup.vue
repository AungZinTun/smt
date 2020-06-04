<template>
  <v-container>
    <v-row v-if="error">
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <app-alert
          :text="error.message"
          @dismissed="onDismissed"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="username"
                      v-model="form.username"
                      name="username"
                      label="Username"
                      type="name"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="email"
                      v-model="form.email"
                      name="email"
                      label="Mail"
                      type="email"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="password"
                      v-model="form.password"
                      name="password"
                      label="Password"
                      type="password"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                    >
                      Sign up
                      <span
                        slot="loader"
                        class="custom-loader"
                      >
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
              <div>
                +95<v-text-field
                  v-model="phNo"
                  type="number"
                  label="Phone Number"
                />
                <v-btn
                  @click="sendOtp"
                >
                  Get OTP
                </v-btn>
                <div id="recaptcha-container" /><br>
                <v-text-field
                  v-model="otp"
                  type="number"
                  label="OTP"
                />
                <v-btn @click="verifyOtp">
                  Verify
                </v-btn>
                <v-btn @click="sendOtp()">
                  Resend OTP
                </v-btn>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import { uniqueEmail, uniqueUsername } from '@/utils/validators'
  export default {
    data () {
      return {
        form: {
          username: '',
          email: '',
          password: '',

        },
        phNo: '',
        appVerifier: '',
        otp: '',
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      },
    },
    // watch: {
    //   user (value) {
    //     if (value !== null && value !== undefined) {
    //       this.$router.push('/')
    //     }
    //   },
    // },
    validations: {
      form: {
        username: {
          required,
          unique: uniqueUsername,
        },
        email: {
          required,
          email,
          unique: uniqueEmail,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    },

    created () {
      this.$emit('ready')
      this.initReCaptcha()
    },
    methods: {
      onSignup () {
        this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
          .then(() => this.successRedirect())
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      successRedirect () {
        const redirectTo = this.$route.query.redirectTo || { name: 'Home' }
        console.log(redirectTo, this.$route.query)
        this.$router.push(redirectTo)
      },
      sendOtp () {
        if (this.phNo.length !== 10) {
          alert('Invalid Phone Number Format !')
        } else {
          //
          const countryCode = '+95' // mm
          const phoneNumber = countryCode + this.phNo
          //
          const appVerifier = this.appVerifier
          //
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult
              //
              alert('SMS sent')
            }).catch(error => {
              // Error; SMS not sent
              alert(error)
            })
        }
      },
      //
      verifyOtp () {
        if (this.phNo.length !== 10 || this.otp.length !== 6) {
          alert('Invalid Phone Number/OTP Format !')
        } else {
          //
          const vm = this
          const code = this.otp
          //
          window.confirmationResult.confirm(code).then(result => {
            // User signed in successfully.
            const user = result.user
            console.log(user)
            // ...
            // route to set password !
            vm.$router.push({ path: '/setPassword' })
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      initReCaptcha () {
        setTimeout(() => {
          // const vm = this
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: function (response) {
              console.log('reCAPTCHA solved, allow signInWithPhoneNumber')
              // .
              // ...
            },
            'expired-callback': function () {
              console.log('Response expired.')
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          })
          //
          this.appVerifier = window.recaptchaVerifier
        }, 1000)
      },
    },
  }
</script>
