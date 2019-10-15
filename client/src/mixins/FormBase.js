import DatePicker from 'vuejs-datepicker'

export default {
  components: {
    DatePicker,
  },
  props: {
    'initialData': {
      type: Object,
      required: false,
      default: null
    },
  },
  methods: {
    getInitialData(_data) {
      const data = Object.assign({}, _data)
      for (const key in this.initialData) {
        if (key in data.form) {
          data.form[key] = this.initialData[key]
        }
      }
      return data
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('submit', this.form)
        }
      })
    }
  }
}
