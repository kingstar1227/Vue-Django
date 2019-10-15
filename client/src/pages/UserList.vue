<template>
  <div>
    <div class="clearfix mb-4">
      <h2 class="float-left">Users</h2>
      <b-button class="float-right" :to="{ name: 'user-add' }">Add New User</b-button>
    </div>
    <template v-if="users.length > 0">
      <b-table striped :items="users" :fields="fields">
        <template slot="user_role" scope="row">
          {{ roles[row.item.user_role] }}
        </template>
        <template slot="actions" scope="row">
          <b-button size="sm" :to="{ name: 'user-view', params: { id: row.item.id.toString() } }">Edit</b-button>
          <b-button size="sm" variant="danger" @click.stop="handleClickDelete(row.item)"
            v-if="row.item.username != username"
          >Delete</b-button>
        </template>
      </b-table>
      <b-pagination class="mt-5" align="center" size="md" :total-rows="usersTotal" :per-page="5"
        :value="usersPage" @change="handleChangePage"
      ></b-pagination>
      <b-modal hide-header v-model="deleteConfirm" @ok="handleDelete"
        ok-title="Yes" cancel-title="No" ok-variant="danger"
      >
        Are you sure to delete this user?
      </b-modal>
      <b-modal hide-header ok-only v-model="deleteError">
        Failed to delete user
      </b-modal>
    </template>
    <b-card v-else>No users found</b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'UserList',
  data() {
    return {
      roles: ['Normal User', 'User Manager', 'Admin'],
      fields: ['username', 'email', 'user_role', 'actions'],
      username: localStorage.getItem('calorie-username'),
      deleteConfirm: false,
      idToDelete: 0,
      deleteError: false
    }
  },
  computed: {
    ...mapGetters([
      'users',
      'usersPage',
      'usersTotal',
    ]),
  },
  beforeMount() {
    this.load(1)
  },
  methods: {
    ...mapActions({
      load: constants.ACTION_GET_USERS,
      delete: constants.ACTION_DELETE_USER,
    }),
    handleChangePage(page) {
      this.load(page)
    },
    handleClickDelete(user) {
      this.deleteConfirm = true
      this.idToDelete = user.id
    },
    handleDelete() {
      if (!this.idToDelete) {
        return
      }
      let pageToShow = this.users.length > 1 ? this.usersPage : (this.usersPage - 1)
      pageToShow = pageToShow > 0 ? pageToShow : 1
      this.delete(this.idToDelete)
      .then(() => {
        this.load(pageToShow)
      })
      .catch(() => {
        this.deleteError = true
      })
    },
  }
}
</script>
