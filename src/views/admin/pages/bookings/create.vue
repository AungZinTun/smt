<template>
  <v-row
    justify="center"
    class="transparent"
  >
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="green"
          dark
          fab
          small
          v-on="on"
        >
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          text
        >
          <v-spacer />
          <v-toolbar-title small>
            <span>New Patient</span>
          </v-toolbar-title>
          <v-spacer />
          <v-spacer />
          <v-btn
            text
            small
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            class="px-3"
          >
            <v-text-field
              v-model="p_id"
              label="Patient ID"
              prepend-icon="mdi-"
              :rules="inputRule"
            />
            <v-text-field
              v-model="name"
              label="Name"
              prepend-icon="mdi-rename-box"
              :rules="inputRule"
            />
            <v-text-field
              v-model="age"
              type="number"
              label="age"
              prepend-icon="mdi-account-settings"
              :rules="imputRuleAge"
            />
            <v-radio-group
              v-model="sex"
              prepend-icon="mdi-human-male-female"
              row
              :rules="inputRule"
            >
              <v-radio
                label="Male"
                value="m"
              />
              <v-radio
                label="Female"
                value="f"
              />
            </v-radio-group>
            <!-- select -->
            <v-row>
              <v-col>
                <span>Visit Detail</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="ရက်စွဲ"
                      prepend-icon="mdi-clock"
                      readonly
                      :rules="inputRule"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    :rules="inputRule"
                    @input="menu2 = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="rs"
                  :items="reason_select"
                  label="Reason"
                  :rules="inputRule"
                  chips
                />
              </v-col>
            </v-row>
            <v-spacer />
            <v-btn
              :loading="loading"
              class="success px-0 mb-5"
              @click="submit"
            >
              Save
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        reason_select: ['HTS', 'STD', 'Skin', 'ART En', 'ART Fu'],

        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        menu2: false,
        name: '',
        age: '',
        sex: '',
        p_id: '',
        loading: false,

        date: '',
        reason: '',
        inputRule: [
          v => !!v || 'Required',
        ],
        imputRuleAge: [
          v => !!v || 'Required',
          v => (v && v.length <= 2) || 'Enter Valid Number',
        ],
      }
    },
    computed: {
      ...mapGetters(['clinician_select']),
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.loading = true
          const patient = {
            id: this.p_id,
            name: this.name,
            age: this.age,
            sex: this.sex,
          }
          const visit = {
            date: this.date,
            rs: this.rs,
          }
          this.$store.dispatch('createPatient', { patient, visit })
        }
      },

    },
  }
</script>
