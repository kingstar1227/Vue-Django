<template>
  <div>
    <div v-if="userconfig">
      <h2 class="mb-4">Your Configuration</h2>
      <UserConfigForm :initialData="userconfig" @submit="handleSubmit"></UserConfigForm>
    </div>
    <div v-else>
      <div v-if="error">
        <h4><center>Failed to get your configuration</center></h4>
      </div>
      <div v-else>
        <h4><center>Getting your configuration...</center></h4>
      </div>
    </div>
    <b-modal hide-header ok-only v-model="updateError">
      Failed to update your configuration
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserConfigForm from '@/components/UserConfigForm'
import * as constants from '@/store/constants'

export default {
  name: 'UserConfig',
  components: {
    UserConfigForm,
  },
  data() {
    return {
      error: false,
      updateError: false,
    }
  },
  computed: {
    ...mapGetters([
      'userconfig',
    ])
  },
  beforeMount() {
    // this.get()
    // .catch(() => {
    //   this.error = true
    // })
  },
  methods: {
    ...mapActions({
      get: constants.ACTION_GET_USER_CONFIG,
      update: constants.ACTION_UPDATE_USER_CONFIG,
    }),
    handleSubmit(data) {
      this.update(data)
      .then(() => {
        this.$router.push({
          name: 'record-list'
        })
      })
      .catch(() => {
        this.updateError = true
      })
    },
  }
}
</script>