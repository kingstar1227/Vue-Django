<template>
  <div>
    <b-row class="my-3">
      <b-col>
        Start date:
        <DatePicker bootstrapStyling v-model="date.from" format="yyyy-MM-dd"
          clear-button clear-button-icon="fa fa-times"
        ></DatePicker>
      </b-col>
      <b-col>
        End date:
        <DatePicker bootstrapStyling v-model="date.to" format="yyyy-MM-dd"
          clear-button clear-button-icon="fa fa-times"
        ></DatePicker>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col>
        Start time:
        <b-form-input type="time" v-model="time.from"></b-form-input>
      </b-col>
      <b-col>
        End time:
        <b-form-input type="time" v-model="time.to"></b-form-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'

export default {
  name: 'RecordFilterForm',
  components: {
    DatePicker,
  },
  props: {
    'currentFilters': {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      date: {
        from: null,
        to: null,
      },
      time: {
        from: null,
        to: null,
      }
    }
  },
  beforeMount() {
    if (this.currentFilters) {
      this.date = Object.assign({}, this.currentFilters.date)
      this.time = Object.assign({}, this.currentFilters.time)
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        date: this.date,
        time: this.time,
      })
    }
  }
}
</script>