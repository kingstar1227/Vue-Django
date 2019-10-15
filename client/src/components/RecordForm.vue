<template>
  <b-form @submit.prevent="handleSubmit">
    <!-- Field -->
    <b-form-group
      label="Calories:"
      :feedback="errors.first('calories')"
      :state="errors.has('calories') ? 'invalid' : 'valid'"
    >
      <b-form-input type="number" v-model="form.calories" placeholder="Enter calories"
        name="calories" v-validate="'required|numeric'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Text:"
      :feedback="errors.first('text')"
      :state="errors.has('text') ? 'invalid' : 'valid'"
    >
      <b-form-input type="text" v-model="form.text" placeholder="Enter text"
        name="text" v-validate="'required'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Date:"
      :feedback="errors.first('date')"
      :state="errors.has('date') ? 'invalid' : 'valid'"
    >
      <DatePicker bootstrapStyling v-model="form.date" format="yyyy-MM-dd"
        name="date" v-validate="'required'"></DatePicker>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Time:"
      :feedback="errors.first('time')"
      :state="errors.has('time') ? 'invalid' : 'valid'"
    >
      <b-form-input type="time" v-model="form.time" placeholder="Enter time"
        name="time" v-validate="'required'""
      ></b-form-input>
    </b-form-group>
    <!-- Submit button -->
    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary">{{ submitButtonLabel }}</b-button>
      <b-button variant="secondary" :to="{ name: 'record-list' }">Back</b-button>
    </div>
  </b-form>
</template>

<script>
import FormBase from '@/mixins/FormBase'

export default {
  name: 'RecordForm',
  mixins: [
    FormBase,
  ],
  data() {
    const data = {
      form: {
        calories: 0,
        text: '',
        date: '',
        time: '',
      }
    }
    return this.getInitialData(data)
  },
  computed: {
    submitButtonLabel() {
      return this.initialData ? 'Update' : 'Create'
    },
  },
}
</script>