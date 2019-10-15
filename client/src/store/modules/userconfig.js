import { UserConfigService } from '@/services'
import * as constants from '@/store/constants'

// initial state
const state = {
  userconfig: null,
}

// getters
const getters = {
  userconfig: state => state.userconfig,
}

// actions
const actions = {
  [constants.ACTION_GET_USER_CONFIG] ({ commit }) {
    return UserConfigService.get()
      .then(({ data }) => {
        commit(constants.SET_USER_CONFIG, data)
        return data
      })
  },
  [constants.ACTION_UPDATE_USER_CONFIG] ({ commit, dispatch }, data) {
    return UserConfigService.update(data)
      .then(({ data }) => {
        commit(constants.SET_USER_CONFIG, null)
        dispatch(constants.ACTION_GET_USER_CONFIG)
        return data
      })
  },
}

// mutations
const mutations = {
  [constants.SET_USER_CONFIG] (state, userconfig) {
    state.userconfig = userconfig
    if (userconfig) {
      localStorage.setItem('user-role', userconfig.user_role)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
