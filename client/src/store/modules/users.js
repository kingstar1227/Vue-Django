import moment from 'moment'
import { UserService } from '@/services'
import * as constants from '@/store/constants'

// initial state
const state = {
  users: [],
  usersPage: 1,
  usersTotal: 0,
  user: null,
}

// getters
const getters = {
  users: state => state.users,
  usersPage: state => state.usersPage,
  usersTotal: state => state.usersTotal,
  user: state => state.user,
}

// actions
const actions = {
  [constants.ACTION_GET_USERS] ({ commit }, usersPage) {
    commit(constants.CLEAR_USERS)
    commit(constants.SET_USERS_PAGE, usersPage)
    return UserService.list(state.usersPage)
    .then(({ data }) => {
      commit(constants.SET_USERS, data.results)
      commit(constants.SET_USERS_TOTAL, data.count)
      return data
    })
  },
  [constants.ACTION_GET_USER] ({ commit }, id) {
    commit(constants.SET_USER, null)
    return UserService.get(id)
    .then(({ data }) => {
      commit(constants.SET_USER, data)
      return data
    })
  },
  [constants.ACTION_ADD_USER] ({ commit }, data) {
    const _data = Object.assign({}, data)
    _data.date = moment(_data.date).format('YYYY-MM-DD')
    return UserService.create(_data)
    .then(({ data }) => data)
  },
  [constants.ACTION_UPDATE_USER] ({ commit }, { id, data }) {
    const _data = Object.assign({}, data)
    _data.date = moment(_data.date).format('YYYY-MM-DD')
    return UserService.update(id, _data)
    .then(({ data }) => {
      commit(constants.SET_USER, data)
      return data
    })
  },
  [constants.ACTION_DELETE_USER] ({ commit }, id) {
    return UserService.delete(id)
    .then(({ data }) => data)
  },
}

// mutations
const mutations = {
  [constants.CLEAR_USERS] (state) {
    state.users = []
    state.usersPage = 1
    state.usersTotal = 0
  },
  [constants.SET_USERS] (state, users) {
    state.users = users
  },
  [constants.SET_USERS_PAGE] (state, usersPage) {
    state.usersPage = usersPage
  },
  [constants.SET_USERS_TOTAL] (state, usersTotal) {
    state.usersTotal = usersTotal
  },
  [constants.SET_USER] (state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
