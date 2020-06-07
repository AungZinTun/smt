<template>
  <div class="flex-grid">
    <user-profile-card
      v-if="!edit"
      :user="user"
    />
    <user-profile-card-editor
      v-else
      :user="user"
    />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {{ user.username }}'s recent activity
        </span>
        <a href="#">See only started products?</a>
      </div>

      <hr>
      <price-list :prices="userPrices" />
    </div>
  </div>
</template>

<script>
  import PriceList from '@/components/PriceList'
  import UserProfileCard from '@/components/UserProfileCard'
  import UserProfileCardEditor from '@/components/UserProfileCardEditor'
  import { mapGetters } from 'vuex'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      PriceList,
      UserProfileCard,
      UserProfileCardEditor,
    },

    mixins: [asyncDataStatus],

    props: {
      edit: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      ...mapGetters({
        user: 'auth/authUser',
      }),

      userPrices () {
        return this.$store.getters['users/userPrices'](this.user['.key'])
      },
    },
    created () {
      this.$store.dispatch('prices/fetchPrices', { ids: this.user.prices })
        .then(() => this.asyncDataStatus_fetched())
    },
  }
</script>

<style scoped>

</style>
