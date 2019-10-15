<template>
  <b-form @submit.prevent="handleSubmit">
    <!-- Field -->
    <b-form-group
      label="Username:"
      :feedback="errors.first('username')"
      :state="errors.has('username') ? 'invalid' : 'valid'"
    >
      <b-form-input type="text" v-model="form.username" placeholder="Enter username"
        name="username" v-validate="'required'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Password:"
      :feedback="errors.first('password')"
      :state="errors.has('password') ? 'invalid' : 'valid'"
    >
      <b-form-input type="password" v-model="form.password" placeholder="Enter password"
        name="password" v-validate="'required'"
      ></b-form-input>
    </b-form-group>
    <!-- Submit button -->
    <div class="mt-4">
      <b-button type="submit" variant="primary" block>Login</b-button>
    </div>
  </b-form>
</template>

<script>
import FormBase from '@/mixins/FormBase'

export default {
  name: 'LoginForm',
  mixins: [
    FormBase,
  ],
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
}
</script>