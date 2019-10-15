<template>
  <div>
    <div class="clearfix mb-4">
      <h2 class="float-left">Records</h2>
      <b-button class="float-right" :to="{ name: 'record-add' }">Add New Record</b-button>
    </div>
    <template v-if="records.length > 0">
      <div class="my-4">
        <span class="mr-3">{{ filterText }}</span>
        <b-button size="sm" variant="secondary" @click="handleClickChangeFilters">Change Filters</b-button>
      </div>
      <b-table striped :items="formattedRecords" :fields="fields">
        <template slot="actions" scope="row">
          <b-button size="sm" :to="{ name: 'record-view', params: { id: row.item.id.toString() } }">Edit</b-button>
          <b-button size="sm" variant="danger" @click.stop="handleClickDelete(row.item)">Delete</b-button>
        </template>
      </b-table>
      <b-pagination class="mt-5" align="center" size="md" :total-rows="recordsTotal" :per-page="5"
        :value="recordsPage" @change="handleChangePage"
      ></b-pagination>
      <b-modal hide-header v-model="showFilter" @ok="handleChangeFilter">
        <RecordFilterForm ref="recordFilterForm" :currentFilters="filters"
          @submit="handleSubmitFilterForm"
        ></RecordFilterForm>
      </b-modal>
      <b-modal hide-header v-model="deleteConfirm" @ok="handleDelete"
        ok-title="Yes" cancel-title="No" ok-variant="danger"
      >
        Are you sure to delete this record?
      </b-modal>
      <b-modal hide-header ok-only v-model="deleteError">
        Failed to delete record
      </b-modal>
    </template>
    <b-card v-else>No records found</b-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import RecordFilterForm from '@/components/RecordFilterForm'
import * as constants from '@/store/constants'

export default {
  name: 'RecordList',
  components: {
    RecordFilterForm
  },
  data() {
    return {
      showFilter: false,
      deleteConfirm: false,
      idToDelete: 0,
      deleteError: false
    }
  },
  computed: {
    ...mapGetters([
      'records',
      'recordsPage',
      'recordsTotal',
      'filters',
    ]),
    fields() {
      const fields = ['text', 'calories', 'date', 'time']
      if (this.records && this.records.length && this.records[0].user) {
        fields.push('user')
      }
      fields.push('actions')
      return fields
    },
    filterText() {
      let texts = []
      if (this.filters.date.from || this.filters.date.to) {
        const df = this.filters.date.from ? moment(this.filters.date.from).format('YYYY-MM-DD') : ''
        const dt = this.filters.date.to ? moment(this.filters.date.to).format('YYYY-MM-DD') : ''
        texts.push(`Date: ${df} - ${dt}`)
      }
      if (this.filters.time.from || this.filters.time.to) {
        const tf = this.filters.time.from ? this.filters.time.from : ''
        const tt = this.filters.time.to ? this.filters.time.to : ''
        texts.push(`Time: ${tf} - ${tt}`)
      }
      return texts.length ? texts.join(', ') : 'No filters'
    },
    formattedRecords() {
      if (!this.records) {
        return []
      }
      return this.records.map(record => ({
        ...record,
        _rowVariant: record.exceeds_day_calories ? 'danger' : 'success',
      }))
    },
  },
  beforeMount() {
    this.load(1)
  },
  methods: {
    ...mapActions({
      load: constants.ACTION_GET_RECORDS,
      delete: constants.ACTION_DELETE_RECORD,
      applyFilters: constants.ACTION_APPLY_RECORDS_FILTERS,
    }),
    handleChangePage(page) {
      this.load(page)
    },
    handleClickChangeFilters() {
      this.showFilter = true
    },
    handleClickDelete(record) {
      this.deleteConfirm = true
      this.idToDelete = record.id
    },
    handleDelete() {
      if (!this.idToDelete) {
        return
      }
      let pageToShow = this.records.length > 1 ? this.recordsPage : (this.recordsPage - 1)
      pageToShow = pageToShow > 0 ? pageToShow : 1
      this.delete(this.idToDelete)
      .then(() => {
        this.load(pageToShow)
      })
      .catch(() => {
        this.deleteError = true
      })
    },
    handleChangeFilter() {
      this.$refs.recordFilterForm.submit()
    },
    handleSubmitFilterForm(data) {
      this.applyFilters(data)
    },
  }
}
</script>
