<template>
  <div class="team">
    <v-container class="my-5">
      <!-- <h1 class="subheading grey--text">
      </h1> -->

      <v-row>
        <v-col
          v-for="person in item_list"
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
                <img src="`${person.photo}`">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">
                {{ person.name }}
              </div>
              <div class="grey--text">
                {{ person.brand }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-chip

                class="transparent"
              >
                <v-avatar left>
                  <v-icon class="orange--text"> mdi-cart </v-icon>
                </v-avatar>
              </v-chip>
              <!-- <v-chip
                v-for="(t, index) in person.type"
                :key="index"
                small

                class="info"
              >
                <v-avatar left>
                  <v-icon small> mdi-stethoscope </v-icon>
                </v-avatar>
                {{ t }}
              </v-chip> -->
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

      }
    },
    computed: {
      ...mapGetters(['item_list']),
    },
  }
</script>
