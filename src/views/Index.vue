<template>
  <v-app class="transparent">
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <!-- <dashboard-core-settings /> -->
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('@/views/components/core/AppBar'),
      DashboardCoreDrawer: () => import('@/views/components/core/Drawer'),
      // DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('@/views/components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
