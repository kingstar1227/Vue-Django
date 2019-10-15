<template>
  <b-form @submit.prevent="handleSubmit">
    <!-- Field -->
    <b-form-group
      label="Expected Calories Per Day:"
      :feedback="errors.first('expected_calories_per_day')"
      :state="errors.has('expected_calories_per_day') ? 'invalid' : 'valid'"
    >
      <b-form-input type="number" v-model="form.expected_calories_per_day" placeholder="Enter value"
        name="expected_calories_per_day" v-validate="'required|numeric'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Your User Role:"
      description="User role cannot be changed"
    >
      <b-form-input type="text" :value="userRole" readonly></b-form-input>
    </b-form-group>
    <!-- Submit button -->
    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary">Update</b-button>
    </div>
  </b-form>
</template>

<script>
import FormBase from '@/mixins/FormBase'

export default {
  name: 'UserConfigForm',
  mixins: [
    FormBase,
  ],
  data() {
    const data = {
      form: {
        expected_calories_per_day: '',
      },
      user_role: 0,
    }
    if (this.initialData) {
      data.form.expected_calories_per_day = this.initialData.expected_calories_per_day
      data.user_role = this.initialData.user_role
    }
    return data
  },
  computed: {
    userRole() {
      const roles = ['Normal User', 'User Manager', 'Admin']
      return roles[this.user_role]
    }
  }
}
</script>