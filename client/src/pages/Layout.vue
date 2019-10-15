<template>
  <div id="app">
    <AppHeader :username="username"></AppHeader>
    <b-container class="py-4">
      <router-view v-if="userconfig"></router-view>
      <div v-else>
        Loading user profile...
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppHeader from '@/components/AppHeader'
import * as constants from '@/store/constants'

export default {
  name: 'Layout',
  components: {
    AppHeader,
  },
  data() {
    return {
      username: localStorage.getItem('calorie-username')
    }
  },
  computed: {
    ...mapGetters([
      'userconfig',
    ])
  },
  beforeMount() {
    this.loadUserConfig()
  },
  methods: {
    ...mapActions({
      loadUserConfig: constants.ACTION_GET_USER_CONFIG
    })
  }
}
</script>
