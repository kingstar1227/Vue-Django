<template>
  <div>
    <div v-if="record">
      <h2 class="mb-4">Record with ID {{ record.id }}</h2>
      <RecordForm :initialData="record" @submit="handleSubmit"></RecordForm>
    </div>
    <div v-else>
      <div v-if="error">
        <h4><center>Record not found</center></h4>
      </div>
      <div v-else>
        <h4><center>Getting record...</center></h4>
      </div>
    </div>
    <b-modal hide-header ok-only v-model="updateError">
      Failed to update record
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecordForm from '@/components/RecordForm'
import * as constants from '@/store/constants'

export default {
  name: 'AddRecord',
  components: {
    RecordForm,
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
      'record',
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
      get: constants.ACTION_GET_RECORD,
      update: constants.ACTION_UPDATE_RECORD,
    }),
    handleSubmit(data) {
      this.update({ id: this.id, data })
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