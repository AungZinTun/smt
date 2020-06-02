<template>
  <v-row>
    <!-- table -->
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <v-card class="mx-auto transparent">
        <v-card-title>
          <create />
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-card-text class="transparent">
          <v-data-table
            :headers="headers"
            :items="visit_list"
            :search="search"
            :mobile-breakpoint="300"
            class="transparent"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                small
                :color="getColor(item.status)"
                link
              >
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

  import { mapGetters } from 'vuex'
  export default {
    name: 'BookingIndex',
    components: {
      Create: () => import('@/views/admin/pages/bookings/create'),
    },

    data () {
      return {
        search: '',
        headers: [
          {
            sortable: true,
            text: '#',
            value: 'patient_id',
          },
          {
            sortable: true,
            text: 'Name',
            value: 'patient',
          },
          {
            align: 'start',
            sortable: true,
            text: 'Age',
            value: 'age',
          },
          {
            sortable: true,
            text: 'Sex',
            value: 'sex',
          },
          {
            sortable: true,
            text: 'Date',
            value: 'date',
          },
          {
            sortable: true,
            text: 'Reason',
            value: 'reason',
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['visit_list']),
    },
    methods: {
      getColor (status) {
        if (status === 'completed') return 'green'
        else if (status === 'pending') return 'orange'
        else return 'red'
      },
    },
  }
</script>
