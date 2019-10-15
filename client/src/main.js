// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from '@/App'
import router from '@/router'
import createStore from '@/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VeeValidate, {
  fieldsBagName: 'inputs'
})
Vue.use(Vuex)

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('calorie-token')
  if (token) {
    config.headers.Authorization = `JWT ${token}`
  }
  return config
})

axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  if (401 === error.response.status) {
    localStorage.removeItem('calorie-token')
    localStorage.removeItem('calorie-username')
    router.push({
      name: 'login'
    })
  } else {
    throw error
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: createStore(),
  template: '<App/>',
  components: { App }
})
