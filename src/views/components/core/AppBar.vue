<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="40"
    fixed
  >
    <v-btn
      class="mr-3 transparent"
      text
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>
      <v-icon v-else>
        mdi-menu
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          smallå
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>-->
    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-badge
        color="red"
        overlap
      >
        <template v-slot:badge>
          <span>5</span>
        </template>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <!-- <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>-->
    <v-menu
      v-if="user"
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <div>
          <app-bar-item>
            <v-btn
              class="ml-2"
              min-width="0"
              text
              to="/user"
            >
              <v-icon>mdi-account</v-icon>
              <span>Profile</span>
            </v-btn>
          </app-bar-item>
        </div>
        <div>
          <app-bar-item>
            <v-btn
              class="ml-2"
              min-width="0"
              text
              @click="Logout"
            >
              <v-icon>mdi-power</v-icon>
              <span>Logout</span>
            </v-btn>
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
    <v-btn
      v-else
      class="ml-2"
      min-width="0"
      text
      to="/login"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/product/create"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      top
      color="success"
      transition="dialog-bottom-transition"
    >
      <span>Patient Added Successfully</span>
      <v-btn
        color="white"
        text
        @click="setSnackbar(false)"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app-bar>
</template>

<script>
// Components
// import { VHover, VListItem } from 'vuetify/lib'

// Utilities
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
    // AppBarItem: {
    //   render (h) {
    //     return h(VHover, {
    //       scopedSlots: {
    //         default: ({ hover }) => {
    //           return h(VListItem, {
    //             attrs: this.$attrs,
    //             class: {
    //               'black--text': !hover,
    //               'white--text secondary elevation-12': hover,
    //             },
    //             props: {
    //               activeClass: '',
    //               dark: hover,
    //               link: true,
    //               ...this.$attrs,
    //             },
    //           }, this.$slots.default)
    //         },
    //       },
    //     })
    //   },
    // },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: ['New pending Clinicians ', 'New Bookings'],
    }),

    computed: {
      ...mapState('shared', ['drawer', 'snackbar']),
      ...mapGetters({
        user: 'auth/authUser',
      }),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'shared/SET_DRAWER',
        setSnackbar: 'shared/SET_SNACKBAR',
      }),
      Logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
    },
  }
</script>
