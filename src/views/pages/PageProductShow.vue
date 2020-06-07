<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-large push-top"
  >
    <h1>
      {{ thread.title }}

      <router-link
        :to="{name: 'ProductEdit', id: this.id}"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Product
      </router-link>
    </h1>
    <p>
      By <a
        href="#"
        class="link-unstyled"
      >{{ user.name }}</a>, <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ repliesCount }} replies by {{ contributorsCount }} contributors</span>
    </p>
    <price-list :prices="prices" />
    <price-editor
      v-if="authUser"
      :thread-id="id"
    />
    <div
      v-else
      class="text-center"
      style="margin-bottom: 50px;"
    >
      <router-link :to="{name: 'SignIn', query: {redirectTo: $route.path}}">
        Sign in
      </router-link> or
      <router-link :to="{name: 'Register', query: {redirectTo: $route.path}}">
        Register
      </router-link> to price a reply.
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import PriceList from '@/components/PriceList'
  import PriceEditor from '@/components/PriceEditor'
  import { countObjectProperties } from '@/utils'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      PriceList,
      PriceEditor,
    },

    mixins: [asyncDataStatus],

    props: {
      id: {
        required: true,
        type: String,
      },
    },

    computed: {
      ...mapGetters({
        authUser: 'auth/authUser',
      }),

      thread () {
        return this.$store.state.products.items[this.id]
      },

      repliesCount () {
        return this.$store.getters['products/threadRepliesCount'](this.thread['.key'])
      },

      user () {
        return this.$store.state.users.items[this.thread.userId]
      },

      contributorsCount () {
        return countObjectProperties(this.thread.contributors)
      },

      prices () {
        const priceIds = Object.values(this.thread.prices)
        return Object.values(this.$store.state.prices.items)
          .filter(price => priceIds.includes(price['.key']))
      },
    },

    methods: {
      ...mapActions('products', ['fetchProduct']),
      ...mapActions('users', ['fetchUser']),
      ...mapActions('prices', ['fetchPrices']),
    },

    created () {
      // fetch thread
      this.fetchProduct({ id: this.id })
        .then(thread => {
          // fetch user
          this.fetchUser({ id: thread.userId })
          return this.fetchPrices({ ids: Object.keys(thread.prices) })
        })
        .then(prices => {
          return Promise.all(prices.map(price => {
            this.fetchUser({ id: price.userId })
          }))
        })
        .then(() => { this.asyncDataStatus_fetched() })
    },
  }
</script>
