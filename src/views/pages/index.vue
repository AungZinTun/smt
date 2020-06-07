<template>
  <div class="team">
    <v-container class="my-5">
      <!-- <h1 class="subheading grey--text">
      </h1> -->
      <v-row>
        <v-col>
          <div
            v-if="asyncDataStatus_ready"
            class="col-full push-top"
          >
            <h1>Welcome to the Brand</h1>
            <category-list :categories="categories" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="item in item_list"
          :key="item.id"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <!-- <v-card
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
            </v-card-actions>
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  // import CategoryList from '@/components/CategoryList'
  import asyncDataStatus from '@/mixins/asyncDataStatus'
  export default {
    components: {
      // CategoryList,
    },
    mixins: [asyncDataStatus],
    data () {
      return {
        item_list: [],
      }
    },
    computed: {
      // ...mapGetters(['']),
    },
    created () {
      this.fetchAllCategories()
      this.fetchAllProducts()
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    },
    methods: {
      ...mapActions('categories', ['fetchAllCategories']),
      ...mapActions('products', ['fetchAllProducts']),
    },
  }
</script>
