<template>
  <div class="team">
    <v-container class="my-5">
      <h1 class="subheading grey--text">
        ဆရာဝန်များ
      </h1>

      <v-row>
        <v-col
          v-for="person in clinician_select"
          :key="person.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            text
            class="text-center ma-3"
          >
            <v-responsive class="pt-4">
              <v-avatar
                size="100"
                class="grey lighten-2"
              >
                <img src="/avatar-3.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">
                {{ person.userId }}
              </div>
              <div class="grey--text">
                {{ person.speciality }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-chip
                v-for="(t, index) in person.available_time"
                :key="index"
                small

                class="info"
              >
                <v-avatar left>
                  <v-icon x-small>mdi-clock</v-icon>
                </v-avatar>
                {{ t }}
              </v-chip>
               <v-spacer />
              <v-chip
                v-for="(t, index) in person.type"
                :key="index"
                small

                class="info"
              >
               <v-avatar left>
                  <v-icon small> mdi-stethoscope </v-icon>
                </v-avatar>
                {{ t }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        team: [
          { name: 'Dr.One', Degree: 'MMed', avatar: '' },
          { name: 'Dr.Two', Degree: 'MSc', avatar: '/avatar-2.png' },
          { name: 'Dr.Three', Degree: 'DMedSc', avatar: '/avatar-3.png' },
          { name: 'Dr.Four', Degree: 'MSc', avatar: '/avatar-3.png' },
          { name: 'Dr.Five', Degree: 'MSc', avatar: '/avatar-2.png' },
        ],
      }
    },
    computed: {
      ...mapGetters(['clinician_select']),
    },
  }
</script>
