<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand href="#">Calorie Manager</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar>
        <b-nav-item :to="{ name: 'record-list' }">Records</b-nav-item>
        <b-nav-item :to="{ name: 'user-list' }" v-if="userconfig && userconfig.user_role >= 1">Users</b-nav-item>
        <b-nav-item :to="{ name: 'user-config' }">Config</b-nav-item>
      </b-nav>
      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item :to="{ name: 'user-config' }">Profile</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'logout' }">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  props: {
    'username': {
      type: String,
      required: true,
    }
  },
  computed: {
    ...mapGetters([
      'userconfig'
    ])
  }
}
</script>
