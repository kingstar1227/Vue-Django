<template>
  <div>
    <div v-if="user">
      <h2 class="mb-4">User with ID {{ user.id }}</h2>
      <UserForm :initialData="user" :userRole="userconfig.user_role" @submit="handleSubmit"></UserForm>
    </div>
    <div v-else>
      <div v-if="error">
        <h4><center>User not found</center></h4>
      </div>
      <div v-else>
        <h4><center>Getting user...</center></h4>
      </div>
    </div>
    <b-modal hide-header ok-only v-model="updateError">
      Failed to update user
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserForm from '@/components/UserForm'
import * as constants from '@/store/constants'

export default {
  name: 'AddUser',
  components: {
    UserForm,
  },
  props: {
    'id': {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      error: false,
      updateError: false,
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userconfig'
    ])
  },
  beforeMount() {
    this.get(this.id)
    .catch(() => {
      this.error = true
    })
  },
  methods: {
    ...mapActions({
      get: constants.ACTION_GET_USER,
      update: constants.ACTION_UPDATE_USER,
    }),
    handleSubmit(data) {
      this.update({ id: this.id, data })
      .then(() => {
        this.$router.push({
          name: 'user-list'
        })
      })
      .catch(() => {
        this.updateError = true
      })
    },
  }
}
</script>