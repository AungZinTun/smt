import Vue from 'vue'

export default {
  setItem (state, { item, id, resource }) {
    console.log(`setted ${item} with ${id} to ${resource}`)
    item['.key'] = id
    Vue.set(state[resource].items, id, item)
    console.log('complete')
  },
}
