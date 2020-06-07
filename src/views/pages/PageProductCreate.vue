<template>
  <div
    v-if="asyncDataStatus_ready"
    class="col-full push-top"
  >
    <h1>Create new product </h1>
    <v-card>
      <v-card-text>
        <v-form
          ref="form"
          class="px-3"
        >
          <v-select
            v-model="brandId"
            item-text="name"
            item-value=".key"
            :items="brands"
            label="Brand"
            prepend-icon="mdi-trophy-award"
            :rules="inputRule"
            chips
          />
          <v-select
            v-model="categoryId"
            item-text="name"
            item-value=".key"
            :items="categories"
            label="Category"
            prepend-icon="mdi-chart-bubble"
            :rules="inputRule"
            chips
          />

          <v-text-field
            v-model="name"
            label="Name"
            prepend-icon="mdi-rename-box"
            :rules="inputRule"
          />
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn
                raised
                class="primary"
                @click="onPickFile"
              >
                <v-icon>mdi-image</v-icon>
              </v-btn>
              <input
                ref="fileInput"
                label="Image"
                type="file"
                style="display: none"
                accept="image/*"
                :rules="inputRule"
                @change="onFilePicked"
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <img
                :src="imageUrl"
                height="150"
              >
            </v-col>
          </v-row>
          <v-textarea
            v-model="text"
            label="Description"
            prepend-icon="mdi-format-list-bulleted"
            :rules="inputRule"
          />
          <v-text-field
            v-model="retailPrice"
            type="number"
            label="Price"
            prepend-icon="mdi-currency-usd"
            :rules="inputRule"
          />
          <!-- select -->
          <!-- <v-row>
            <v-col>
              <span>Visit Detail</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="ရက်စွဲ"
                    prepend-icon="mdi-clock"
                    readonly
                    :rules="inputRule"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  :rules="inputRule"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="rs"
                :items="reason_select"
                label="Reason"
                :rules="inputRule"
                chips
              />
            </v-col>
          </v-row> -->
          <v-spacer />
          <v-btn
            :loading="loading"
            class="success px-0 mb-5"
            @click="save"
          >
            Save
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {

    mixins: [asyncDataStatus],

    data () {
      return {
        name: '',
        text: '',
        categoryId: '',
        brandId: '',
        retailPrice: '',
        imageUrl: '',
        image: null,
        saved: false,
        loading: false,
        inputRule: [
          v => !!v || 'Required',
        ],
      }
    },

    computed: {
      brands () {
        return Object.values(this.$store.state.brands.items)
      },
      categories () {
        return Object.values(this.$store.state.categories.items)
      },

      // hasUnsavedChanges () {
      //   return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved
      // },
    },
    created () {
      this.fetchAllBrands()
      this.fetchAllCategories()
        .then(() => { this.asyncDataStatus_fetched() })
    },

    methods: {
      ...mapActions('products', ['createProduct']),
      ...mapActions('brands', ['fetchAllBrands']),
      ...mapActions('categories', ['fetchAllCategories']),

      save () {
        if (!this.image) {
          return
        }
        if (this.$refs.form.validate()) {
          this.loading = true
          this.createProduct({
            brandId: this.brandId,
            categoryId: this.categoryId,
            title: this.title,
            text: this.text,
            image: this.image,
          }).then(product => {
            this.loading = false
            this.saved = true
            this.$router.push({ name: 'ProductShow', params: { id: product['.key'] } })
          })
        }
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        const filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        console.log(this.imageUrl)
      },

      cancel () {
        this.$router.push({ name: 'Brand', params: { id: this.brand['.key'] } })
      },
    },

    beforeRouteLeave (to, from, next) {
      if (this.hasUnsavedChanges) {
        const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
        if (confirmed) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
  }
</script>

<style scoped>

</style>
