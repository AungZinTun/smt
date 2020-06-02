<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:item.calories="{ item }">
        <v-chip
          small
          :color="getColor(item.calories)"
          link
        >
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/building.png"
      />

      <v-card-title>ပစ်တိုင်းထောင်ဆေးခန်း</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          />

          <div class="grey--text ml-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 subtitle-1">
          တောင်ကြီး
        </div>

        <div>အရှေ့မြို့ပတ်လမ်း</div>
        <div>091234556</div>
        <div>098734656</div>
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-title>ဆေးခန်းဖွင့်ချိန်</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          light
          active-class="light"
          column
        >
          <v-chip>6:00 AM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="reserve"
        >
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'ဆရာဝန်ကြီးများ',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'အထူးပြုမှု', value: 'calories' },
          { text: 'အချိန်', value: 'fat' },
        ],
        desserts: [
          { name: 'Dr. One', calories: 'OG', fat: '6:00 AM to 8:PM' },
          { name: 'Dr. Two', calories: 'Surgery', fat: '6:00 AM to 8:PM' },
          {
            name: 'Dr. Three',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
          {
            name: 'Dr. Four',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
          {
            name: 'Dr. One',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
          {
            name: 'Dr. One',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
          {
            name: 'Dr. One',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
          {
            name: 'Dr. One',
            calories: 'Other Specialities',
            fat: '6:00 AM to 8:PM',
          },
        ],
      }
    },
    methods: {
      getColor (calories) {
        if (calories > '') return 'light blue accent-100'
        else if (calories > 200) return 'orange'
        else return 'blue'
      },
    },
  }
</script>
