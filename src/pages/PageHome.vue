<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-full push-top"
  >
    <h1>Welcome to the Brand</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CategoryList from '@/components/CategoryList'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      CategoryList,
    },

    mixins: [asyncDataStatus],

    computed: {
      categories () {
        return Object.values(this.$store.state.categories.items)
      },
    },

    methods: {
      ...mapActions('categories', ['fetchAllCategories']),
      ...mapActions('brands', ['fetchBrands']),
    },

    created () {
      this.fetchAllCategories()
        .then(categories => Promise.all(categories.map(category => this.fetchBrands({ ids: Object.keys(category.brands) }))))
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    },
  }
</script>
