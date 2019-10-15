<template>
  <div>
    <h2 class="mb-4">Add New User</h2>
    <UserForm @submit="handleSubmit"></UserForm>
    <b-modal hide-header ok-only v-model="error">
      Failed to update user
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserForm from '@/components/UserForm'
import * as constants from '@/store/constants'

export default {
  name: 'AddUser',
  components: {
    UserForm,
  },
  data() {
    return {
      error: false,
    }
  },
  methods: {
    ...mapActions({
      create: constants.ACTION_ADD_USER,
    }),
    handleSubmit(data) {
      this.create(data)
      .then(() => {
        this.$router.push({
          name: 'user-list'
        })
      })
      .catch(() => {
        this.error = true
      })
    },
  }
}
</script>