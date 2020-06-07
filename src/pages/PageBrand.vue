<template>
  <div
    v-if="asyncDataStatus_ready"
    class="brand-wrapper"
  >
    <div class="col-full push-top">
      <div class="brand-header">
        <div class="brand-details">
          <h1>{{ brand.name }}</h1>
          <p class="text-lead">
            {{ brand.description }}
          </p>
        </div>
        <router-link
          :to="{name: 'ProductCreate', params: {brandId: this.brand['.key']}}"
          class="btn-green btn-small"
        >
          Start a thread
        </router-link>
      </div>
    </div>

    <div class="col-full push-top">
      <product-list :products="products" />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ProductList from '@/components/ProductList'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      ProductList,
    },

    mixins: [asyncDataStatus],

    props: {
      id: {
        required: true,
        type: String,
      },
    },

    computed: {
      brand () {
        return this.$store.state.brands.items[this.id]
      },

      products () {
        return Object.values(this.$store.state.products.items)
          .filter(thread => thread.brandId === this.id)
      },
    },

    methods: {
      ...mapActions('brands', ['fetchBrand']),
      ...mapActions('products', ['fetchProducts']),
      ...mapActions('users', ['fetchUser']),
    },

    created () {
      this.fetchBrand({ id: this.id })
        .then(brand => this.fetchProducts({ ids: brand.products }))
        .then(products => Promise.all(products.map(thread => this.fetchUser({ id: thread.userId }))))
        .then(() => { this.asyncDataStatus_fetched() })
    },
  }
</script>

<style scoped>
  .brand-wrapper {
    width: 100%;
  }
</style>
