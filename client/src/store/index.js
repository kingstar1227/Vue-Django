import Vuex from 'vuex'
import records from './modules/records.js'
import users from './modules/users.js'
import userconfig from './modules/userconfig.js'

const debug = process.env.NODE_ENV !== 'production'

export default function createStore() {
  return new Vuex.Store({
    modules: {
      records,
      users,
      userconfig,
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
  })
}
