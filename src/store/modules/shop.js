import Data from '@/store/data'
// import * as firebase from 'firebase'
// import slugify from 'slugify'
// import moment from 'moment'

export const state = {
    Data,
    date: { date: 1507144994 },
}
export const getters = {
    item_list: (state) => {
        return Object.values(state.Data.items).map((i) => {
            return ({
                id: i.id,
                name: i.name,
                brand: i.brand,
                })
        })
    },
}
