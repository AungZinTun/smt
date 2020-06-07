<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        id="thread_title"
        v-model="form.title"
        type="text"
        class="form-input"
        name="title"
        @blur="$v.form.title.$touch()"
      >
      <template v-if="$v.form.title.$error">
        <span
          v-if="!$v.form.title.required"
          class="form-error"
        >Thread must have a title</span>
        <span
          v-if="!$v.form.title.minLength"
          class="form-error"
        >The title must be least 10 characters long</span>
      </template>
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        v-model="form.text"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
        @blur="$v.form.text.$touch()"
      />
      <template v-if="$v.form.text.$error">
        <span
          v-if="!$v.form.text.required"
          class="form-error"
        >Thread must have some content</span>
        <span
          v-if="!$v.form.text.minLength"
          class="form-error"
        >The text of the thread must be least 40 characters long. Type at least {{ 40 - form.text.length }} more</span>
      </template>
    </div>

    <div class="btn-group">
      <button
        class="btn btn-ghost"
        @click.prevent="cancel"
      >
        Cancel
      </button>
      <button
        class="btn btn-blue"
        type="submit"
        name="Publish"
      >
        {{ isUpdate ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
    },

    data () {
      return {
        form: {
          title: this.title,
          text: this.text,
        },
      }
    },

    validations: {
      form: {
        title: {
          required,
          minLength: minLength(10),
        },
        text: {
          required,
          minLength: minLength(40),
        },
      },
    },

    computed: {
      isUpdate () {
        return !!this.title
      },
    },

    methods: {
      save () {
        this.$v.form.$touch()
        if (!this.$v.form.$invalid) {
          this.$emit('save', { title: this.form.title, text: this.form.text })
        }
      },

      cancel () {
        this.$emit('cancel')
      },
    },
  }
</script>

<style scoped>
</style>
