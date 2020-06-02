import Data from '@/store/data'
import * as firebase from 'firebase'
import slugify from 'slugify'
// import moment from 'moment'

export const state = {
    Data,
    date: { date: 1507144994 },

    // clinicians: Object.values(Data.clinicians),
}

export const getters = {
    date: state => { return new Date(state.date).toUTCString() },
    patients: state => { return state.Data.person },
    visit_list: (state, getters) => {
        return Object.values(state.Data.visits).map((v) => {
            return ({
                id: v.id,
                patient_id: getters.patients[v.p_id].person_id,
                patient: getters.patients[v.p_id].person_name,
                age: getters.patients[v.p_id].age,
                sex: getters.patients[v.p_id].sex,
                date: v.date,
                reason: v.rs,
                })
        })
    },
}

export const actions = {
    createPatient ({ commit, getters }, { patient, visit }) {
        const slug = slugify(patient.id.replace(/\//g, '-'), {
            replacement: '-',
            remove: /[$*_+~.()'"!:@]/g,
          })
        const pt = {
            id: patient.id,
            slug: slug,
            name: patient.name,
            age: patient.age,
            sex: patient.sex,
            user_id: getters.user.id,
            first_visit: visit.id,
        }
        const v = {
          id: slug & 1,
          p_id: slug,
          date: visit.date,
          rs: visit.rs,
          user_id: getters.user.id,
        }
        console.log(slug)
        console.log(v)
        console.log(pt, firebase)
        // firebase.database().ref('patients').child(slug).set(pt)
        .then(
            // firebase.database().ref('visits').push(v),
            commit('setLoading', false),
        )
          .catch((error) => {
            console.log(error)
            commit('setLoading', true)
          })
        // Reach out to firebase and store it
      },
}

export const mutations = {
    setLoadedPatients (state, payload) {
        state.loadedPatients = payload
      },
      createPatient (state, payload) {
        state.loadedPatients.push(payload)
      },
      updatePatient (state, payload) {
        const patient = state.loadedPatients.find(patient => {
          return patient.id === payload.id
        })
        if (payload.title) {
          patient.title = payload.title
        }
        if (payload.description) {
          patient.description = payload.description
        }
        if (payload.date) {
          patient.date = payload.date
        }
      },
}
