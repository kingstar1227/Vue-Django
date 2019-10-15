import moment from 'moment'
import { RecordService } from '@/services'
import * as constants from '@/store/constants'

// initial state
const state = {
  records: [],
  recordsPage: 1,
  recordsTotal: 0,
  record: null,
  filters: {
    date: { from: null, to: null },
    time: { from: null, to: null },
  },
}

// getters
const getters = {
  records: state => state.records,
  recordsPage: state => state.recordsPage,
  recordsTotal: state => state.recordsTotal,
  record: state => state.record,
  filters: state => state.filters,
}

// actions
const actions = {
  [constants.ACTION_GET_RECORDS] ({ commit }, recordsPage) {
    commit(constants.CLEAR_RECORDS)
    commit(constants.SET_RECORDS_PAGE, recordsPage)
    return RecordService.list(state.recordsPage, state.filters)
    .then(({ data }) => {
      commit(constants.SET_RECORDS, data.results)
      commit(constants.SET_RECORDS_TOTAL, data.count)
      return data
    })
  },
  [constants.ACTION_GET_RECORD] ({ commit }, id) {
    commit(constants.SET_RECORD, null)
    return RecordService.get(id)
    .then(({ data }) => {
      commit(constants.SET_RECORD, data)
      return data
    })
  },
  [constants.ACTION_ADD_RECORD] ({ commit }, data) {
    const _data = Object.assign({}, data)
    _data.date = moment(_data.date).format('YYYY-MM-DD')
    return RecordService.create(_data)
    .then(({ data }) => data)
  },
  [constants.ACTION_UPDATE_RECORD] ({ commit }, { id, data }) {
    const _data = Object.assign({}, data)
    _data.date = moment(_data.date).format('YYYY-MM-DD')
    return RecordService.update(id, _data)
    .then(({ data }) => {
      commit(constants.SET_RECORD, data)
      return data
    })
  },
  [constants.ACTION_DELETE_RECORD] ({ commit }, id) {
    return RecordService.delete(id)
    .then(({ data }) => data)
  },
  [constants.ACTION_APPLY_RECORDS_FILTERS] ({ commit, dispatch }, filters) {
    commit(constants.SET_RECORD_FILTERS, filters)
    return dispatch(constants.ACTION_GET_RECORDS, state.recordsPage)
  },
}

// mutations
const mutations = {
  [constants.CLEAR_RECORDS] (state) {
    state.records = []
    state.recordsPage = 1
    state.recordsTotal = 0
  },
  [constants.SET_RECORDS] (state, records) {
    state.records = records
  },
  [constants.SET_RECORDS_PAGE] (state, recordsPage) {
    state.recordsPage = recordsPage
  },
  [constants.SET_RECORDS_TOTAL] (state, recordsTotal) {
    state.recordsTotal = recordsTotal
  },
  [constants.SET_RECORD] (state, record) {
    state.record = record
  },
  [constants.SET_RECORD_FILTERS] (state, filters) {
    state.filters = filters
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
