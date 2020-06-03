<template>
  <div class="team">
    <v-container class="my-5">
      <!-- <h1 class="subheading grey--text">
      </h1> -->

      <v-row>
        <v-col
          v-for="item in item_list"
          :key="item.id"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            text
            class="text-center ma-3"
          >
            <v-responsive class="pt-4">
              <v-img
                v-img
                :src="`${item.photo}`"
                :lazy-src="`${item.photo}`"
                aspect-ratio="1"
                class="grey lighten-2"
              />
            </v-responsive>
            <v-card-text>
              <div
                small
                class="display-1"
              >
                {{ item.name }}
              </div>
              <div
                small
                class="small grey--text"
              >
                <span> {{ item.brand }}</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-chip

                class="transparent"
              >
                <div
                  class="small subheading"
                  v-text="`${ Number(item.price).toLocaleString() } MMK`"
                />
              </v-chip>
              <v-spacer />
              <v-chip

                class="transparent"
              >
                <v-avatar right>
                  <v-icon class="orange--text">
                    mdi-cart
                  </v-icon>
                </v-avatar>
              </v-chip>
              <!-- <v-chip
                v-for="(t, index) in item.type"
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
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters(['item_list']),
    },
    created () {
      this.fetchAllCategories()
        .then(categories => Promise.all(categories.map(category => this.fetchForums({ ids: Object.keys(category.forums) }))))
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    },
    methods: {
      ...mapActions('categories', ['fetchAllCategories']),
      ...mapActions('forums', ['fetchForums']),
    },
  }
</script>
