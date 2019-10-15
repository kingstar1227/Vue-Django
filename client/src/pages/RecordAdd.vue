<template>
  <div>
    <h2 class="mb-4">Add New Record</h2>
    <RecordForm @submit="handleSubmit"></RecordForm>
    <b-modal hide-header ok-only v-model="error">
      Failed to update record
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RecordForm from '@/components/RecordForm'
import * as constants from '@/store/constants'

export default {
  name: 'AddRecord',
  components: {
    RecordForm,
  },
  data() {
    return {
      error: false,
    }
  },
  methods: {
    ...mapActions({
      create: constants.ACTION_ADD_RECORD,
    }),
    handleSubmit(data) {
      this.create(data)
      .then(() => {
        this.$router.push({
          name: 'record-list'
        })
      })
      .catch(() => {
        this.error = true
      })
    },
  }
}
</script>