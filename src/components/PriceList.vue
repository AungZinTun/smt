<template>
  <div class="post-list">
    <price-list-item
      v-for="post in posts"
      :key="post['.key']"
      :post="post"
    />
  </div>
</template>

<script>
  import PriceListItem from './PriceListItem'
  export default {
    components: {
      PriceListItem,
    },

    props: {
      posts: {
        required: true,
        type: Array,
      },
    },
  }
</script>

<style scoped>

</style>
