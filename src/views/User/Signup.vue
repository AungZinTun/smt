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
                <!-- <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      :rules="[comparePasswords]"
                    />
                  </v-col>
                </v-row> -->
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
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
    },
  }
</script>
